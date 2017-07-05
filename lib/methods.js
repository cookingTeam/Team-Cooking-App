Meteor.methods({
  'dish.insert':function(dish){
    MyRecipe.remove({owner:dish.owner});
    MyRecipe.insert(dish);
  },

  'dish.remove':function(dish){
    console.log("userid="+this.userId);
    console.log('dish.owner='+dish.owner);
    console.dir(info);
    if(this.userId==dish.owner)
      MyRecipe.remove(dish._id);
  }
})
