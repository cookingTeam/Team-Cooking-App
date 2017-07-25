Template.entershare.onCreated(function(){
  Meteor.subscribe('content');
})
Template.showshare.helpers({
  shareData(){
    return Share.find({id:Session.get('dict').id},{sort:{time:-1}}).fetch();
  }

})

Template.showshare.onCreated(function(){
  Meteor.subscribe('share');
})

Template.entershare.events({

  'click button'(elt,instance){
    const think = instance.$('#think').val();
    const number = document.querySelector("input[name=rate]:checked").value;
    const rate = parseInt(number);
    var thought = {
      think:think,
      rate:rate,
      id:Session.get('dict').id,
      username:Content.findOne({id:Meteor.userId()}).name,
      time:new Date()
    }
    console.dir(thought);
    Meteor.call('thought.insert',thought);
<<<<<<< HEAD
    instance.$('#think').val("");
    $("#popup2").css("visibility","hidden");
    $('#popup2').css("opacity",0);
=======
    console.log(Share.find().fetch());
>>>>>>> master
  }
})
