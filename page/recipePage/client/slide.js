Template.slide.onCreated(function(){
  Session.set("step", {});
})

Template.slide.onCreated(function(){
  Session.set("step_number", {});
})

Template.slide.onCreated(function(){
  Session.set("full_ingredient_list", Session.get("dict").extendedIngredients);
})

Template.slide.onCreated(function(){
  Session.set("ingredient_in_each_step", {});
})

Template.slide.onCreated(function(){
          speechReco();
})





//.steps[0]
// "step", Session.get("dict").analyzedInstructions[0].steps[0]
Template.slide.helpers({
  page: function(){
    var big = Session.get("dict");
    // console.log("big "+big.analyzedInstructions);
    if(big.analyzedInstructions){
      return big.analyzedInstructions[0].steps;
    } else {
      return;
    }
  },
  thisStep: function(){
    return Session.get("step");
  },
  firstStep: function(){
    return Session.get("step").number==1;
  },
  show_ingred: function(){
    var ingred_array=[];
    var length_in_step=Session.get("step").ingredients.length;
    var length_in_all=Session.get("dict").extendedIngredients.length;
    for (var i = 0; i<length_in_step; i++) {
      console.log(Session.get("step").ingredients[i].id);
      console.log(Session.get("step").ingredients[i].name);
      var id_in_step = Session.get("step").ingredients[i].id;//get id of ingredient in current step
      var name_in_step = Session.get("step").ingredients[i].name;
      for (var j = 0; j<length_in_all; j++) {//loop through extended json ingredient
        var id_in_all = Session.get("dict").extendedIngredients[j].id;
        var name_in_all = Session.get("dict").extendedIngredients[j].name;
        if(id_in_step==id_in_all){//find the corresponding string by id
          console.log(Session.get("dict").extendedIngredients[j].originalString);
          ingred_array.push(Session.get("dict").extendedIngredients[j].originalString);
        }else if(name_in_all.includes(name_in_step)){
          console.log(Session.get("dict").extendedIngredients[j].originalString);
          ingred_array.push(Session.get("dict").extendedIngredients[j].originalString);
        }
      //   console.log(Session.get("dict").extendedIngredients[i].id);
      //   console.log(Session.get("dict").extendedIngredients[i].name);
      }
    }
    Session.set("ingredient_in_each_step", ingred_array);
    return ingred_array;
  },

})

Template.slide.events({
  "click a": function(elt,instance){
    console.log(Session.get("dict").analyzedInstructions[0].steps[elt.currentTarget.innerText-1]);
    Session.set("step",Session.get("dict").analyzedInstructions[0].steps[elt.currentTarget.innerText-1]);
    Session.set("step_number",elt.currentTarget.innerText-1);
    speechReco();
    // console.log(Session.get("dict").extendedIngredients[0].id);
    // for (var i = 0, len=Session.get("dict").extendedIngredients.length; i<len; i++) {
    //   console.log(Session.get("dict").extendedIngredients[i].id);
    //   console.log(Session.get("dict").extendedIngredients[i].name);
    // }
    console.log("length = "+Session.get("step").ingredients.length);
  }
})
