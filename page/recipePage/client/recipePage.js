Template.recipePage.onCreated(
  function(){
    // dict = new ReactiveDict();
    // dict.setDefault({
    //     d: {}
    //   });
    Session.set("dict", {})
    console.log(Session.get("dict"));
    console.log(this)
    Meteor.apply("getInstruction",[this.data], {returnStubValue:true},
          function(error,result){
            console.dir(['getInstruction',error,result]);
            if (error) {
              console.log("Error!!"+JSON.stringify(error)); return;
            }
            console.log(result);
            r = JSON.parse(result);
            // console.log("r[0].steps[0].step: "+r[0].steps[0].step);
            //console.log(dict);
              console.log("r  "+r[0].analyzedInstructions[0].steps[1].number + " " + r[0].analyzedInstructions[0].steps[1].step);
            return Session.set("dict",r[0]);
            //return r[0];
            }
          //.steps[0].step
    );
  }
)

Template.recipePage.helpers({
  recipe: function(){
    console.log("session:     " + Session.get("dict"));
    return Session.get("dict");
  }
})

Template.recipePage.events({
  "click #popup_button": function(){
    $("#popup1").css("visibility", "visible");
    $("#popup1").css("opacity", 1);
  }
})

Template.recipePage.events({
  "click #popup_close":function(){
    $("#popup1").css("visibility","hidden");
    $('#popup1').css("opacity",0);
  }
})
