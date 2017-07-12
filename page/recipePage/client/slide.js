Template.slide.onCreated(function(){
  Session.set("step", {});
})

//.steps[0]
// "step", Session.get("dict").analyzedInstructions[0].steps[0]
Template.slide.helpers({
  page: function(){
    var big = Session.get("dict");
    console.log("big "+big.analyzedInstructions);
    return big.analyzedInstructions[0].steps;
  },
  thisStep: function(){
    return Session.get("step");
  }
})

Template.slide.events({
  "click button": function(elt,instance){
     Session.set("step",(Session.get("dict").analyzedInstructions[0].steps[elt.currentTarget.innerText-1]));
     console.log((Session.get("step").ingredients));
     console.log(Session.get("dict").analyzedInstructions[0].steps[elt.currentTarget.innerText-1])
  }
})
