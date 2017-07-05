Template.askforrecipe.events({
  'click button'(elt,instance){
    const dishName = instance.$('#dishName').val();
    const recipe = instance.$('#recipe').val();

    var dish = {
      dishName:dishName,
      recipe:recipe,
      owner:Meteor.userId()
    };
    Meteor.call('dish.insert',dish);

    instance.$('#dishName').val("");
    instance.$('#recipe').val("");
  }
})

Template.showRecipe.helpers({
  recipeData() {return MyRecipe.find()}
})

Template.recipeRow.helpers({
  isOwner() {console.dir(this);
    return this.recipe.owner == Meteor.userId()}
})

Template.recipeRow.events({
  'click span'(elt,instance){
    Meteor.call('dish.remove',this.recipe)
  }
})
