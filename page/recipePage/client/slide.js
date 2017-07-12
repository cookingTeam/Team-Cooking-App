Template.slide.onCreated(function(){
  Session.set("step", {});
})

Template.slide.helpers({
  page: function(){
    var big = Session.get("dict");
    console.log("big "+big.analyzedInstructions);
    return big.analyzedInstructions[0].steps;
  }
})
Template.slide.events({
  "click button": function(elt,instance){
    console.log(elt.currentTarget.innerText);
  }
})
