Template.slide.onCreated(function(){
  Session.set("step", {});
})

Template.slide.onCreated(function(){
  Session.set("step_number", {});
})


//.steps[0]
// "step", Session.get("dict").analyzedInstructions[0].steps[0]
Template.slide.helpers({
  page: function(){
    var big = Session.get("dict");
    // console.log("big "+big.analyzedInstructions);
    return big.analyzedInstructions[0].steps;
  },
  thisStep: function(){
    return Session.get("step");
  }
})

Template.slide.events({
  "click a": function(elt,instance){
    console.log(Session.get("dict").analyzedInstructions[0].steps[elt.currentTarget.innerText-1]);
    Session.set("step",Session.get("dict").analyzedInstructions[0].steps[elt.currentTarget.innerText-1]);
    Session.set("step_number",elt.currentTarget.innerText-1);
  }
})
