Meteor.publish('myrecipe',function(){
  return MyRecipe.find();
})

Meteor.publish('like', function(){
  return Like.find();
})

Meteor.publish('content', function(){
  return Content.find();
})
