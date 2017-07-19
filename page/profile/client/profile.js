
Template.profile.onCreated(function(){
  Meteor.subscribe('content');
})


Template.profile.helpers({
    hasProfile: function(){
        return Content.findOne({id:Meteor.userId()});
    }
})


Template.askProfile.events({
    'click #submit'(elt,instance){
        const name = instance.$('#name').val();
        const age = instance.$('#age').val();
        const restriction = instance.$('#restriction').val();
        const cuisine = instance.$('#cuisine').val();
        var info = {
            name:name,
            age:age,
            restriction:restriction,
            cuisine:cuisine,
            id:Meteor.userId()
        }
        Meteor.call('info.insert',info);
        console.log(Content.findOne());
    }
})

Template.showProfile.helpers({
    content() {
      return Content.findOne({id:Meteor.userId()});
    }
})

Template.showProfile.events({
    'click #delete'(elt,instance){
        console.log(Content.findOne({id:Meteor.userId()}));
        Meteor.call('info.remove',Content.findOne({id:Meteor.userId()}));
    }
})

Template.savedrow.events({
    'click span'(elt,instance){
        Meteor.call('save.remove',this.saved)
    }
})

Template.showSave.helpers({
    savedRecipe(){
      console.log(Like.find({owner:Meteor.userId()}).fetch());
      return Like.find({owner:Meteor.userId()}).fetch();
    }
})

Template.savedrow.events({
      "click .clickable-row": function(event,instance){
          console.log(this.saved.id);
          var href = "/recipePage/"+this.saved.recipe.id;
          console.log(href);
          if (href) {
              window.location.assign(href);//jump to recipe detail page
          }
      }
})
