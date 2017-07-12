Template.recipePage.onCreated(
  function(){
    // dict = new ReactiveDict();
    // dict.setDefault({
    //     d: {}
    //   });
    Session.set("dict", {})
    // console.log(Session.get("dict"));
    // console.log(this)
    Meteor.apply("getInstruction",[this.data], {returnStubValue:true},
          function(error,result){
            // console.dir(['getInstruction',error,result]);
            if (error) {
              console.log("Error!!"+JSON.stringify(error)); return;
            }
            console.log(result);
            r = JSON.parse(result);
            // console.log("r[0].steps[0].step: "+r[0].steps[0].step);
            //console.log(dict);
              // console.log("r  "+r[0]);
            return Session.set("dict",r[0]);
            //return r[0];
            }
          //.steps[0].step
    );
  }
)

Template.recipePage.helpers({
  recipe: function(){
    // console.log("session:     " + Session.get("dict"));
    return Session.get("dict");
  }
})

Template.recipePage.events({
  "click #popup_button": function(){
    $("#popup1").css("visibility", "visible");
    $("#popup1").css("opacity", 1);
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
        }

        function stopRecognition() {
          if (recognition) {
            recognition.stop();
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
        // function send() {
        //   var text = $("#input").val();
        //   $.ajax({
        //     type: "POST",
        //     url: baseUrl + "query?v=20150910",
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     headers: {
        //       "Authorization": "Bearer " + accessToken
        //     },
        //     data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
        //     success: function(data) {
        //       console.log(data);
        //       setResponse(JSON.stringify(data, undefined, 2));
        //     },
        //     error: function() {
        //       setResponse("Internal Server Error");
        //     }
        //   });
        //   setResponse("Loading...");
        // }
        // function setResponse(val) {
        //   $("#response").text(val);
        // }

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
                  } else if (attribute=='vegan'){
                    console.log(recipe.vegan);
                  } else if (attribute=='glutenFree'){
                    console.log(recipe.glutenFree);
                  } else if (attribute=='dairyFree'){
                    console.log(recipe.dairyFree);
                  } else if (attribute=='veryHealthy'){
                    console.log(recipe.veryHealthy);
                  } else if (attribute=='veryPopular'){
                    console.log(recipe.veryPopular);
                  } else if (attribute=='cheap'){
                    console.log(recipe.cheap);
                  } else if (attribute=='sustainable'){
                    console.log(recipe.sustainable);
                  } else if (attribute=='ketogenic'){
                    console.log(recipe.ketogenic);
                  }
              }
              console.log(data);
            },
          });
        }
  }

})

Template.recipePage.events({
  "click #popup_close":function(){
    $("#popup1").css("visibility","hidden");
    $('#popup1').css("opacity",0);
  }
})
