
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
        const name = instance.$('#name_profile').val();
        const age = instance.$('#age_profile').val();
        const restriction = instance.$('#restriction_profile').val();
        const cuisine = instance.$('#cuisine_profile').val();
        var info = {
            name:name,
            age:age,
            restriction:restriction,
            cuisine:cuisine,
            id:Meteor.userId()
        }
        Meteor.call('info.insert',info);
    }
})

Template.showProfile.helpers({
    content() {
      return Content.findOne({id:Meteor.userId()});
    }
})

Template.showProfile.events({
    'click #delete'(elt,instance){
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

Template.personalShowRecipe.helpers({
  recipeData() {return Myrecipe.find()}
})
Template.personalShowRecipe.onCreated(function(){
  Meteor.subscribe('myrecipe');
})

Template.personalRecipeRow.helpers({
  isOwner() {
    console.dir(this);
    return this.recipe.owner == Meteor.userId()}
})

Template.personalRecipeRow.events({
  'click span'(elt,instance){
    Meteor.call('myrecipe.remove', this.recipe);
  },
  'click td': function(elt, instance){
    ownRecipeId = this.recipe._id
    console.dir(this.recipe._id);
    Router.go('/ownRecipePage/'+ownRecipeId);
  }
})
