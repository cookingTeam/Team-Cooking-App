Template.showshare.helpers({
  shareData(){
    return Share.find({id:Session.get('dict').id}).fetch();
  }

})

Template.showshare.onCreated(function(){
  Meteor.subscribe('share');
})

Template.entershare.events({

  'click button'(elt,instance){
    const think = instance.$('#think').val();
    var thought = {
      think:think,
      id:Session.get('dict').id
    }
    console.dir(thought);
    Meteor.call('thought.insert',thought);
    console.log(Share.find().fetch());
  }
})
