var imagePath = '';
var reader = new FileReader();
var file = {};
var fileName = '';
var uploaded = false;


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
Template.item.helpers({
  owner: function(){
    return (Meteor.userId()==this.s.owner)
  }
})
Template.item.events({
  'click .close': function(elt, instance){
    console.dir(instance);
    Meteor.call('thought.remove', instance.data.s._id)
  }

})
Template.entershare.events({
    "change .file-upload-input": function(event, template){
       console.dir(event.currentTarget);
       file = event.currentTarget.files[0];
       console.log(file.name);
       user = Meteor.userId()
       fileName = user+file.name;
       console.log(fileName)
      reader.onload = function(fileLoadEvent) {
        $("#ownRecipeImage").attr("src", fileLoadEvent.currentTarget.result);
      };
       reader.readAsDataURL(file);
       imagePath = 'images/'+fileName;
       uploaded = true;
       //template.$('.imageUpload > span').append("<img id='ownRecipeImage' src='/"+imagePath+"'>");
     },



  'click button'(elt,instance){
    const think = instance.$('#think').val();
    if(uploaded){
      console.log("in if")
        reader.onload = function(fileLoadEvent) {
          Meteor.call('file-upload', fileName, reader.result);
        };
              reader.readAsBinaryString(file);
    }

    var rate = '';
    if(document.querySelector("input[name=rate]:checked")){
      const number = document.querySelector("input[name=rate]:checked").value;
      rate = parseInt(number);
    }

    if(Content.findOne({id:Meteor.userId()})){
      name = Content.findOne({id:Meteor.userId()}).name;
    }
    else{
      alert("please log-in first, and have  your profile name set up~");
    }

    var thought = {
      think:think,
      rate:rate,
      id:Session.get('dict').id,
      username:Content.findOne({id:Meteor.userId()}).name,
      pic:Content.findOne({id:Meteor.userId()}).pic,
      time:new Date(),
      image: imagePath,
      owner: Meteor.userId()
    }
    Meteor.call('thought.insert',thought);
    instance.$('#think').val("");
    $("#popup2").css("visibility","hidden");
    $('#popup2').css("opacity",0);
    imagePath = '';
    $(".file-upload-input").val('');
    instance.$('#ownRecipeImage').remove();

  }
})
