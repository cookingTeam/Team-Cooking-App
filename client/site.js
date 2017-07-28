Template.layout.events({
  'click #pageListen': function(){
            responsiveVoice.cancel();
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
                    document.getElementById('pageListen').style.backgroundColor="rgb(217, 83, 79)";
            }

            function stopRecognition() {
                    if (recognition) {
                      recognition.stop();
                      recognition = null;
                      document.getElementById('pageListen').style.backgroundColor="#9DA1A2";
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
                          if (data.result.action=='help'){
                              responsiveVoice.speak("I have a number of functions. I recommend you talk to me in a recipe page by saying, cookie, and then asking for next or previous steps, repeat, or list ingredients. You may use my voice button on the recipe page, but then you will have trouble activating me by saying my name. You can also ask me questions about a recipe, like if it is vegetarian or if it is healthy.",  "US English Female", {pitch:1.2});

                          }
                          if (data.result.action=='next_step'){
                            var current_step = Session.get("step");
                            current_step.number = current_step.number + 1;
                            Session.set("step", current_step);
                            $("span[name=number] a[name=number_" + Session.get("step").number + "]").click();
                            var current_step_instruction = Session.get("step").step;
                              console.log("current step: "+current_step.number);
                              console.log(current_step_instruction);
                              responsiveVoice.speak("step"+ current_step.number + current_step_instruction, "US English Female", {pitch:1.2});
                              //i++, write function nextStep(recipe.steps[i]) and call it here
                          }
                          if (data.result.action=='show_instruction'){
                            console.log("show_instruction");
                            $("#popup_button").click();
                            var current_step = Session.get("step");
                            var current_step_instruction = Session.get("step").step;
                            responsiveVoice.speak("step"+ current_step.number + current_step_instruction, "US English Female", {pitch:1.2});
                          }
                          if (data.result.action=='show_ingredients'){
                            console.log("show_ingredient");
                            var ingre = Session.get("ingredient_in_each_step");
                            console.log(ingred);
                            // responsiveVoice.speak("step"+ current_step.number + current_step_instruction, "US English Female", {pitch:1.2});
                          }
                          if (data.result.action=='repeat'){
                            console.log('repeat');
                            var current_step = Session.get("step");
                            var current_step_instruction = Session.get("step").step;
                            responsiveVoice.speak("step"+ current_step.number + current_step_instruction,  "US English Female", {pitch:1.2});
                          }
                          if (data.result.action=='prev_step'){
                            var current_step = Session.get("step");
                            if (current_step.number==1){
                              responsiveVoice.speak("There is no previous step. Would you like me to repeat the current step?",  "US English Female", {pitch:1.2});
                            } else {
                              current_step.number=current_step.number-1;
                              Session.set("step", current_step);
                              $("span[name=number] a[name=number_" + Session.get("step").number + "]").click();
                              var current_step_instruction = Session.get("step").step;
                                console.log("current step: "+current_step.number);
                                console.log(current_step_instruction);
                                responsiveVoice.speak("step"+ current_step.number + current_step_instruction, "US English Female", {pitch:1.2});
                                //i++, write function nextStep(recipe.steps[i]) and call it here
                            }
                          }
                          if (data.result.action=='get_info'){
                              var attribute = data.result.parameters.Attributes;
                              var recipe = Session.get("dict")
                              console.dir(Session.get('dict'));
                              if (attribute=='vegetarian'){
                                console.log(recipe.vegetarian);
                                if (recipe.vegetarian){
                                  responsiveVoice.speak("yes, it is" + attribute,  "US English Female", {pitch:1.2});
                                } else {
                                  responsiveVoice.speak("no, it is not" + attribute,  "US English Female", {pitch:1.2});
                                }
                              } else if (attribute=='vegan'){
                                console.log(recipe.vegan);
                                if (recipe.vegan){
                                  responsiveVoice.speak("yes, it is" + attribute,  "US English Female", {pitch:1.2});
                                } else {
                                  responsiveVoice.speak("no, it is not" + attribute,  "US English Female", {pitch:1.2});
                                }
                              } else if (attribute=='gluten'){
                                console.log(recipe.glutenFree);
                                if (recipe.glutenFree){
                                  responsiveVoice.speak("yes, it is gluten-free",  "US English Female", {pitch:1.2});
                                } else {
                                  responsiveVoice.speak("no, it is not gluten free",  "US English Female", {pitch:1.2});
                                }
                              } else if (attribute=='dairyFree'){
                                console.log(recipe.dairyFree);
                                if (recipe.dairyFree){
                                  responsiveVoice.speak("yes, it is dairy free",  "US English Female", {pitch:1.2});
                                } else {
                                  responsiveVoice.speak("no, it is not dairy free",  "US English Female", {pitch:1.2});
                                }
                              } else if (attribute=='veryHealthy'){
                                console.log(recipe.veryHealthy);
                                if (recipe.veryHealthy){
                                  responsiveVoice.speak("yes, it is healthy",  "US English Female", {pitch:1.2});
                                } else {
                                  responsiveVoice.speak("no, it is not very healthy",  "US English Female", {pitch:1.2});
                                }
                              } else if (attribute=='veryPopular'){
                                console.log(recipe.veryPopular);
                                if (recipe.veryPopular){
                                  responsiveVoice.speak("yes, it is popular",  "US English Female", {pitch:1.2});
                                } else {
                                  responsiveVoice.speak("no, it is not very popular",  "US English Female", {pitch:1.2});
                                }
                              } else if (attribute=='cheap'){
                                console.log(recipe.cheap);
                                if (recipe.cheap){
                                  responsiveVoice.speak("yes, it is" + attribute,  "US English Female", {pitch:1.2});
                                } else {
                                  responsiveVoice.speak("no, it is not" + attribute,  "US English Female", {pitch:1.2});
                                }
                              } else if (attribute=='sustainable'){
                                console.log(recipe.sustainable);
                                if (recipe.sustainable){
                                  responsiveVoice.speak("yes, it is" + attribute,  "US English Female", {pitch:1.2});
                                } else {
                                  responsiveVoice.speak("no, it is not" + attribute,  "US English Female", {pitch:1.2});
                                }
                              } else if (attribute=='ketogenic'){
                                console.log(recipe.ketogenic);
                                if (recipe.ketogenic){
                                  responsiveVoice.speak("yes, it is" + attribute,  "US English Female", {pitch:1.2});
                                } else {
                                  responsiveVoice.speak("no, it is not" + attribute,  "US English Female", {pitch:1.2});
                                }
                              } else {
                                responsiveVoice.speak("I cannot help you with that. Try reading the recipe",  "US English Female", {pitch:1.2});
                              }
                          }

                          console.log(data);
                        },
                      });
                      switchRecognition();
              }
          }
})
