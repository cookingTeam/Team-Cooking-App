Meteor.methods({
  'dish.insert':function(dish){
    // MyRecipe.remove({owner:dish.owner});
    MyRecipe.insert(dish);
  }
})
