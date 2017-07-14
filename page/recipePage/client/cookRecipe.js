Template.cookRecipe.events({
  'click #rec': function(){
        var interim_result, final_result, stop_word;
        stop_word="stop";
        var recognition_engine = new webkitSpeechRecognition();
        recognition_engine.continuous = true;
        recognition_engine.interimResults = true;
        recognition_engine.lang = 'en-US';
        recognition_engine.start();
        recognition_engine.onresult = function(e) {
            var result, i;
            interim_result = '';
            if (typeof e.results === 'undefined') {
              recognition_engine.stop();
              console.log('SPEECH RECOGNITION : stopping due to empty result.', e);
              return;
            }

            for (i = event.resultIndex; i < event.results.length; ++i) {
              result = event.results[i];
              if (result.isFinal) {
                final_result = result[0].transcript;
                // console.log(final_result);
                // console.log('SPEECH RECOGNITION : final transcript = ' + final_result+ "  type: "+(typeof interim_result) , e);
                // trigger a command matching the final utterance here
              } else {
                interim_result += result[0].transcript;
                if(result[0].transcript.includes('Alexa')){
                  console.log("Alexa is here");
                  // This is our accessToken to our group's account
                  var accessToken = "6a670d47c5ba447facf2684bd9a3c0ee";
                  var baseUrl = "https://api.api.ai/v1/";
                  //
                  // $("#rec").click(function(event) {
                  //       switchRecognition();
                  // });
                  switchRecognition();
                  //creating speech recognition functions
                  var recognition;
                  function startRecognition() {
                    recognition_engine.stop();
                    recognition = new webkitSpeechRecognition();
                    recognition.onstart = function(event) {
                      // updateRec();
                    };
                    recognition.onresult = function(event) {
                      var text = "";
                        for (var i = event.resultIndex; i < event.results.length; ++i) {
                          text += event.results[i][0].transcript;
                        }
                        setInput(text);
                      stopRecognition();
                    };
                    recognition.onend = function() {
                      stopRecognition();
                    };
                    recognition.lang = "en-US";
                    recognition.start();
                  }

                  function stopRecognition() {
                    if (recognition) {
                      recognition.stop();
                      recognition = null;
                      recognition_engine.start();
                    }
                    // updateRec();
                  }
                  function switchRecognition() {
                    if (recognition) {
                      stopRecognition();
                    } else {
                      startRecognition();
                    }
                  }
                  //this just prints the utterance in the textbar
                  function setInput(text) {
                    action(text);
                  }

                  function action(text) {
                    $.ajax({
                      type: "POST",
                      url: baseUrl + "query?v=20150910",
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      headers: {
                        "Authorization": "Bearer " + accessToken
                      },
                      data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
                      success: function(data) {
                        if (data.result.action=='next_step'){
                            console.log('success');
                            //i++, write function nextStep(recipe.steps[i]) and call it here
                        }
                        console.log(data);
                      },
                    });
                    switchRecognition();
                    
                  }
                }
                if(result[0].transcript.includes('stop')){
                  console.log("record stopped");
                  recognition_engine.stop();
                }
              }
            }
          };
        }
      })