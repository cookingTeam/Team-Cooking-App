// Template.community.onCreated(
//   console.log('community Page'),
// )

Template.showRecipe.helpers({
  recipeData() {return Myrecipe.find()}
})

Template.showRecipe.onCreated(function(){
  Meteor.subscribe('myrecipe');
  Meteor.subscribe('content');
})

Template.recipeRow.helpers({
  isOwner() {console.dir(this);
    return this.recipe.owner == Meteor.userId()
  },
  owner(){
    console.dir(this.recipe.owner);
    var person = this.recipe.owner;
    console.dir(Content.findOne({id:person}))
    return Content.findOne({id:person});
  }
})

Template.recipeRow.events({
  'click span'(elt,instance){
    Meteor.call('myrecipe.remove', this.recipe);
  },
  'click td': function(elt, instance){
    ownRecipeId = this.recipe._id
    console.dir(this.recipe._id);
    Router.go('/ownRecipePage/'+ownRecipeId);
  }
})
