Template.askforrecipe.events({
  'click button'(elt,instance){
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
