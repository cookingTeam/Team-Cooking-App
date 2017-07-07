Meteor.methods({
  'dish.insert':function(dish){
    MyRecipe.insert(dish);
  },

  'dish.remove':function(dish){
    console.log("userid="+this.userId);
    console.log('dish.owner='+dish.owner);
    console.dir(dish);
    if(this.userId==dish.owner)
      MyRecipe.remove(dish._id);
  }
})
