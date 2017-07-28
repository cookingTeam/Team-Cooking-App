Meteor.methods({
  'myrecipe.insert':function(dish){
    console.log('in Myrecipe');
    console.dir(dish);
    Myrecipe.insert(dish);
  },

  'myrecipe.remove':function(dish){
    console.log("userid="+this.userId);
    console.log('dish.owner='+dish.owner);
    console.dir(dish);
    if(this.userId==dish.owner)
      Myrecipe.remove(dish._id);
  },

  'info.insert':function(info){
    Content.remove({id:info.id});
    Content.insert(info);
  },

  'info.remove': function(info){
    Content.remove(info._id);
  },

  'save.insert': function(save){
    Like.remove({recipe:save.recipe});
    Like.insert(save);
  },

  'save.remove': function(save){
    Like.remove(save._id);
  },

  'thought.insert':function(thought){
    Share.insert(thought);
    Share.find({},{sort:{time:-1}}).fetch();
  },
  'thought.remove':function(_id){
    Share.remove(_id);
  },

  'icon.inser':function(icon){
    Icons.insert(icon);
  }

})
