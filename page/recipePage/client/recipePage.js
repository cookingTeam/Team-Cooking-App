
Template.recipePage.onCreated(
  function(){

    this.saveR = new ReactiveVar();
    Session.set("dict", {})
    const saveR = this.saveR;
    //saveR means whether this user has stored this recipe..
    Meteor.apply("getInstruction",[this.data], {returnStubValue:true},
          function(error,result){
            // console.dir(['getInstruction',error,result]);
            if (error) {
              console.log("Error!!"+JSON.stringify(error)); return;
            }
            // console.log(result);
            r = JSON.parse(result);
            Session.set("dict",r[0]);
            saveR.set(Like.find({owner:Meteor.userId(),recipe:Session.get('dict')}).fetch());
            console.log(Session.get('dict'));
            console.log(Like.find({owner:Meteor.userId(),recipe:Session.get('dict')}).fetch());
            }
    );
  }
)

Template.recipePage.helpers({
  recipe: function(){
    // console.log("session:     " + Session.get("dict"));
    return Session.get("dict");
  },

  isliked(){
    return Template.instance().saveR.get();
  }
})


Template.recipePage.events({
  'click #like'(event,instance){
      instance.saveR.set(true);
      var detail = Session.get("dict");
      console.log(Session.get('dict'));
      var save = {
        recipe:detail,
        owner:Meteor.userId()
      }
      Meteor.call('save.insert',save);
      instance.saveR.set(Like.find({owner:Meteor.userId(),recipe:Session.get('dict')}));
      alert('You have saved this recipe and you can check it in your profile page');
  },
  'click #share':function(){
    $('#popup2').css('visibility','visible');
    $('#popup2').css('opacity',1);
  },

  "click #share_close":function(){
    $("#popup2").css("visibility","hidden");
    $('#popup2').css("opacity",0);
  },

  "click #popup_button": function(){
    $("#popup1").css("visibility", "visible");
    $("#popup1").css("opacity", 1);
    // console.log("loglog: "+Session.get("dict").analyzedInstructions[0].steps[0]);
    Session.set("step", Session.get("dict").analyzedInstructions[0].steps[0]);

                  var this_id=this.data;
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
                          console.log('SPEECH RECOGNITION : final transcript = ' + final_result, e);
                          // trigger a command matching the final utterance here
                        } else {
                          interim_result = result[0].transcript;
                          console.log(interim_result);
                        }
                        if(interim_result.includes('stop')){
                          console.log("record stopped");
                          recognition_engine.stop();
                        }
                        if(interim_result.includes('hey cookie')){
                          // recognition_engine.stop();
                          console.log("Alexa is here");
                          // This is our accessToken to our group's account
                          var accessToken = "6a670d47c5ba447facf2684bd9a3c0ee";
                          var baseUrl = "https://api.api.ai/v1/";
                          //
                          // $("#rec").click(function(event) {
                          //       switchRecognition();
                          // });
                          startRecognition();
                          //creating speech recognition functions
                          var recognition;
                          function startRecognition() {

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
                            recognition_engine.stop();
                            document.getElementById('pageListen').style.color="red";

                          }

                          function stopRecognition() {
                            if (recognition) {
                              recognition.stop();
                              recognition_engine.start();
                              recognition = null;
                              document.getElementById('pageListen').style.color="#9DA1A2";
                            }
                            // updateRec();
                          }
                          function switchRecognition() {
                            if (recognition) {
                              stopRecognition();
                            } else {
                              startRecognition();
                            }
          // <<<<<<< HEAD
                          }
                          //this just prints the utterance in the textbar
                          function setInput(text) {
                            action(text);
                          }
                          // function updateRec() {
                          //   $("#rec").text(recognition ? "Stop" : "Speak");
                          // }
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
                                  var current_step = Session.get("ownStep");
                                  current_step.number = current_step.number + 1;
                                  Session.set("ownStep", current_step);
                                  $("span[name=number] a[name=number_" + Session.get("ownStep").number + "]").click();
                                  var current_step_instruction = Session.get("ownStep").step;
                                    console.log("current step: "+current_step.number);
                                    console.log(current_step_instruction);
                                    responsiveVoice.speak("step"+ current_step.number + current_step_instruction, "US English Female", {pitch:1.2});
                                    //i++, write function nextStep(recipe.steps[i]) and call it here
                                }
                                if (data.result.action=='show_instruction'){
                                  console.log("show_instruction");
                                  $("#popup_button").click();
                                  var current_step = Session.get("ownStep");
                                  var current_step_instruction = Session.get("ownStep").step;
                                  responsiveVoice.speak("step"+ current_step.number + current_step_instruction, "US English Female", {pitch:1.2});
                                }
                                if (data.result.action=='repeat'){
                                  console.log('repeat');
                                  var current_step = Session.get("ownStep");
                                  var current_step_instruction = Session.get("ownStep").step;
                                  responsiveVoice.speak("step"+ current_step.number + current_step_instruction,  "US English Female", {pitch:1.2});
                                }
                                if (data.result.action=='prev_step'){
                                  var current_step = Session.get("ownStep");
                                  if (current_step.number==1){
                                    responsiveVoice.speak("There is no previous step. Would you like me to repeat the current step?",  "US English Female", {pitch:1.2});
                                  } else {
                                    current_step.number=current_step.number-1;
                                    Session.set("ownStep", current_step);
                                    $("span[name=number] a[name=number_" + Session.get("ownStep").number + "]").click();
                                    var current_step_instruction = Session.get("ownStep").step;
                                      console.log("current step: "+current_step.number);
                                      console.log(current_step_instruction);
                                      responsiveVoice.speak("step"+ current_step.number + current_step_instruction, "US English Female", {pitch:1.2});
                                      //i++, write function nextStep(recipe.steps[i]) and call it here
                                  }
                                }
                              },
                            });
                            switchRecognition();
                          }
                        }
                      }
                    };
                  
  },

  "click #popup_close":function(){
    $("#popup1").css("visibility","hidden");
    $('#popup1').css("opacity",0);
  },

  'click #ask': function(){
        // This is our accessToken to our group's account
        var accessToken = "6a670d47c5ba447facf2684bd9a3c0ee";
        var baseUrl = "https://api.api.ai/v1/";
        $("#ask").click(function(event) {
              switchRecognition();
        });

        //creating speech recognition functions
        var recognition;
        function startRecognition() {
          recognition = new webkitSpeechRecognition();
          recognition.onstart = function(event) {
            updateRec();
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
          document.getElementById('pageListen').style.color="red";
        }

        function stopRecognition() {
          if (recognition) {
            recognition.stop();
            document.getElementById('pageListen').style.color="#9DA1A2";
            recognition = null;
          }
          updateRec();
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
        function updateRec() {
          $("#ask").text(recognition ? "Stop" : "Speak");
        }

        function action(text) {
          // var text = $("#input").val();
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
              console.log(data.result.action)
              if (data.result.action=='get_info'){
                  var attribute = data.result.parameters.Attributes;
                  var recipe = Session.get("dict")
                  if (attribute=='vegetarian'){
                    console.log(recipe.vegetarian);
                    if (recipe.vegetarian){
                      responsiveVoice.speak("yes, it is" + attribute, "UK English Male");
                    } else {
                      responsiveVoice.speak("no, it is not" + attribute, "UK English Male");
                    }
                  } else if (attribute=='vegan'){
                    console.log(recipe.vegan);
                    if (recipe.vegan){
                      responsiveVoice.speak("yes, it is" + attribute, "UK English Male");
                    } else {
                      responsiveVoice.speak("no, it is not" + attribute, "UK English Male");
                    }
                  } else if (attribute=='gluten'){
                    console.log(recipe.glutenFree);
                    if (recipe.glutenFree){
                      responsiveVoice.speak("yes, it is gluten-free", "UK English Male");
                    } else {
                      responsiveVoice.speak("no, it is not gluten free", "UK English Male");
                    }
                  } else if (attribute=='dairyFree'){
                    console.log(recipe.dairyFree);
                    if (recipe.dairyFree){
                      responsiveVoice.speak("yes, it is dairy free", "UK English Male");
                    } else {
                      responsiveVoice.speak("no, it is not dairy free", "UK English Male");
                    }
                  } else if (attribute=='veryHealthy'){
                    console.log(recipe.veryHealthy);
                    if (recipe.veryHealthy){
                      responsiveVoice.speak("yes, it is healthy", "UK English Male");
                    } else {
                      responsiveVoice.speak("no, it is not very healthy", "UK English Male");
                    }
                  } else if (attribute=='veryPopular'){
                    console.log(recipe.veryPopular);
                    if (recipe.veryPopular){
                      responsiveVoice.speak("yes, it is popular", "UK English Male");
                    } else {
                      responsiveVoice.speak("no, it is not very popular", "UK English Male");
                    }
                  } else if (attribute=='cheap'){
                    console.log(recipe.cheap);
                    if (recipe.cheap){
                      responsiveVoice.speak("yes, it is" + attribute, "UK English Male");
                    } else {
                      responsiveVoice.speak("no, it is not" + attribute, "UK English Male");
                    }
                  } else if (attribute=='sustainable'){
                    console.log(recipe.sustainable);
                    if (recipe.sustainable){
                      responsiveVoice.speak("yes, it is" + attribute, "UK English Male");
                    } else {
                      responsiveVoice.speak("no, it is not" + attribute, "UK English Male");
                    }
                  } else if (attribute=='ketogenic'){
                    console.log(recipe.ketogenic);
                    if (recipe.ketogenic){
                      responsiveVoice.speak("yes, it is" + attribute, "UK English Male");
                    } else {
                      responsiveVoice.speak("no, it is not" + attribute, "UK English Male");
                    }
                  } else {
                    responsiveVoice.speak("I cannot help you with that. Try reading the recipe", "UK English Male");
                  }
              }
              else {
                responsiveVoice.speak("I certainly don't know", "UK English Male");
              }
              console.log(data);
            },
          });
        }
  }

})
