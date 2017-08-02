
originalProfile = {};

Template.profile.onCreated(function(){
  Meteor.subscribe('content');
})


Template.profile.helpers({
    hasProfile: function(){
        return Content.findOne({id:Meteor.userId()});
    },
    icons: function(){
        return Icons.find();
    }
})


Template.askProfile.events({
    'click #submit'(elt,instance){
        const name = instance.$('#name_profile').val();
        const age = instance.$('#age_profile').val();
        const restriction = instance.$('#restriction_profile').val();
        const cuisine = instance.$('#cuisine_profile').val();
        const pic = instance.$('#icon').val();
        var info = {
            name:name,
            age:age,
            restriction:restriction,
            cuisine:cuisine,
            pic:pic,
            id:Meteor.userId()
        }
        Meteor.call('info.insert',info);
    },
    'click .icon'(elt,instance){
      console.log(elt.currentTarget.src)
      document.getElementById('icon').value = elt.currentTarget.src;
      console.dir(document.getElementsByClassName('icon'));
        var list= document.getElementsByClassName("icon");
        for (var i = 0; i < list.length; i++) {
            list[i].style.backgroundColor="white";
        }
      document.getElementById(elt.currentTarget.id).style.backgroundColor="lightblue";
    }
})

Template.askProfile.onRendered(
  function(){
    console.dir(originalProfile.name);
    console.dir(originalProfile.pic);
    console.dir($('#name_profile').val())
    $('#name_profile').val(originalProfile.name);
    $('#age_profile').val(originalProfile.age);
    $('#restriction_profile').val(originalProfile.restriction);
    $('#cuisine_profile').val(originalProfile.cuisine);
    $('#icon').val((originalProfile.pic));
    document.getElementById(originalProfile.pic.substring(29)).style.backgroundColor="lightblue";
  }
)

Template.showProfile.helpers({
    content() {
      return Content.findOne({id:Meteor.userId()});
    }
})

Template.showProfile.events({
    'click #delete'(elt,instance){
        originalProfile = Content.findOne({id:Meteor.userId()});
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
  hasRecipe() {
    // console.log(Myrecipe.find({owner:Meteor.userId()}));
    return Myrecipe.find().fetch()
  },
  recipeData() {return Myrecipe.find()}
})
Template.personalShowRecipe.events({
  'click #add-new'(elt,instance){
    window.location.pathname = '/addRecipe';
  }
})
Template.personalShowRecipe.onCreated(function(){
  Meteor.subscribe('myrecipe');
})

Template.personalRecipeRow.helpers({
  isOwner() {
    console.dir(this);
    return this.recipe.owner == Meteor.userId();
  }
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
