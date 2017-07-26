Meteor.publish('myrecipe',function(){
  return Myrecipe.find();
})

Meteor.publish('like', function(){
  return Like.find();
})

Meteor.publish('content', function(){
  return Content.find();
})

Meteor.publish('share',function(){
  return Share.find();
})

Meteor.publish('icons', function(){
  return Icons.find();
})
