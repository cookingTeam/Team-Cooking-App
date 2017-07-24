
Template.recipePage.onCreated(
  function(){
    // dict = new ReactiveDict();
    // dict.setDefault({
    //     d: {}
    //   });
    this.saveR = new ReactiveVar();
    Session.set("dict", {})
    const saveR = this.saveR;
    // console.log(Session.get("dict"));
    // console.log(this)
    Meteor.apply("getInstruction",[this.data], {returnStubValue:true},
          function(error,result){
            // console.dir(['getInstruction',error,result]);
            if (error) {
              console.log("Error!!"+JSON.stringify(error)); return;
            }
            // console.log(result);
            r = JSON.parse(result);
            // console.log("r[0].steps[0].step: "+r[0].steps[0].step);
            //console.log(dict);
              // console.log("r  "+r[0]);
            Session.set("dict",r[0]);
            saveR.set(Like.find({owner:Meteor.userId(),recipe:Session.get('dict')}).fetch());
            console.log(Session.get('dict'));
            console.log(Like.find({owner:Meteor.userId(),recipe:Session.get('dict')}).fetch());
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
  },

  isliked(){
    return Template.instance().saveR.get();
  }
})

Template.recipePage.onRendered(
  function(){
    // $(document).ready(function(){
    //     $('[data-toggle="tooltip"]').tooltip();
    // });
  }
)



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
      console.log(Like.find().fetch());
  },

  "click #popup_button": function(){
    $("#popup1").css("visibility", "visible");
    $("#popup1").css("opacity", 1);
    console.log("loglog: "+Session.get("dict").analyzedInstructions[0].steps[0]);
    Session.set("step", Session.get("dict").analyzedInstructions[0].steps[0]);
  },
})

Template.recipePage.events({
  "click #popup_close":function(){
    $("#popup1").css("visibility","hidden");
    $('#popup1').css("opacity",0);
  }

})




//Any other function:
//vegan advanced search
//search according to profile
//possible modification

//special diet
//to let the app read out the steps
//go through steps
