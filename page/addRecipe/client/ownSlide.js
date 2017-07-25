Template.ownSlide.onCreated(function(){
  Meteor.subscribe('myrecipe');
  Session.set("ownStep", {});

})

Template.ownSlide.onCreated(function(){
  Session.set("own_step_number", {});
})


//.steps[0]
Template.ownSlide.helpers({
  page: function(){
    var big = Myrecipe.findOne(Template.instance().data);
    console.log(Template.instance().data)
    console.dir(Myrecipe.findOne(Template.instance().data));
    if(big.analyzedInstructions){
      console.dir( big.analyzedInstructions[0].steps);
      return big.analyzedInstructions[0].steps;
    } else {
      return;
    }
  },
  thisStep: function(){
    console.log(Session.get("ownStep"));
    return Session.get("ownStep");
  },
  firstStep: function(){
    return Session.get("ownStep").number==1;
  },

})

Template.ownSlide.events({
  "click a": function(elt,instance){

    Session.set("ownStep",Myrecipe.findOne(instance.data).analyzedInstructions[0].steps[elt.currentTarget.innerText-1]);
    Session.set("own_step_number",elt.currentTarget.innerText-1);
    console.log(Myrecipe.findOne(instance.data).analyzedInstructions[0].steps[elt.currentTarget.innerText-1])
    console.log(Session.get("ownStep"));
  }
})
