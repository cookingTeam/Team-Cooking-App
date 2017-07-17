Template.askforrecipe.events({
  'click #add'(elt,instance){
    const dishName = instance.$('#dishName').val();
    const steps = instance.$('#steps').val();

    var dish = {
      dishName:dishName,
      steps:steps,
      owner:Meteor.userId()
    };
    Meteor.call('dish.insert',dish);

    instance.$('#dishName').val("");
    instance.$('#steps').val("");
  },

  'click #addIngredient': function(){
      var container = document.getElementById("container");
      container.appendChild(document.createTextNode("Ingredient "));
      var input = document.createElement("input");
      input.type = "text";
      container.appendChild(input);
      container.appendChild(document.createElement("br"));
  },

  'click #addStep': function(){
      var container = document.getElementById("stepscontainer");
      container.appendChild(document.createTextNode("Step "));
      var input = document.createElement("textarea");
      container.appendChild(input);
      container.appendChild(document.createElement("br"));
  }
})


Template.showRecipe.helpers({
  recipeData() {return MyRecipe.find()}
})

Template.showRecipe.onCreated(function(){
  Meteor.subscribe('myrecipe');
})

Template.recipeRow.helpers({
  isOwner() {console.dir(this);
    return this.recipe.owner == Meteor.userId()}
})

Template.recipeRow.events({
  'click span'(elt,instance){
    Meteor.call('dish.remove',this.recipe);
  }
})
