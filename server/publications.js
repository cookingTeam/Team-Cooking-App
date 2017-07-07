Meteor.publish('myrecipe',function(){
  return MyRecipe.find();
})
