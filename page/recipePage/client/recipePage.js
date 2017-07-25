
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
            // console.log(Like.find({owner:Meteor.userId(),recipe:Session.get('dict')}).fetch());
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

  "click #popup_button": function(){
    $("#popup1").css("visibility", "visible");
    $("#popup1").css("opacity", 1);
    // console.log("loglog: "+Session.get("dict").analyzedInstructions[0].steps[0]);
    Session.set("step", Session.get("dict").analyzedInstructions[0].steps[0]);
  },
})

Template.recipePage.events({
  "click #popup_close":function(){
    $("#popup1").css("visibility","hidden");
    $('#popup1').css("opacity",0);
  }
})
