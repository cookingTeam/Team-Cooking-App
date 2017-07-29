Template.home.onCreated(
  function() {
    Session.set("autoFillResults", []);
  }
)

Template.home.helpers({
  autoFillList: function(){
    return Session.get("autoFillResults");
  }
})



Template.home.events({
  "click .search": function(elt, instance){
      console.dir("diet::: "+instance.$('#dietSelect').val());
      console.dir("cuisine::: "+instance.$("#cuisineSelect").val());
      console.dir(instance.$('#recipe_name').val());
      console.dir(elt.currentTarget);
      console.log(elt.currentTarget.id=="homeSearch");
      if(elt.currentTarget.id=="homeSearch"){
        recipe_name = instance.$('#home_input').val();
        console.log(recipe_name);
      }
      else{
        recipe_name = instance.$('#recipe_name').val();
      }
      const diet = instance.$('#dietSelect').val();
      const cuisine = instance.$('#cuisineSelect').val();
      const intolerances = instance.$('#intolerances').val();
      var api_query = "instructionsRequired=true&limitLicense=false&number=9&offset=0&query="+recipe_name;
      //+"&diet="+diet+"&cuisine"
      if(diet){
        api_query+="&diet="+diet;
      }
      if(cuisine){
        api_query+="&cuisine="+cuisine;
      }
      if(intolerances){
        api_query+="&intolerances="+intolerances;
      }

      Router.go("recipeSearch", {}, {query: api_query});
    },

  'keypress input': function(elt, instance){
    console.log(elt);
    console.log(elt.which==13 && elt.currentTarget.id=="home_input");
    if(elt.which==13 && elt.currentTarget.id=="home_input"){
      instance.$('#homeSearch').click();
    }
    else if(elt.which==13&&elt.currentTarget.id=="intolerances"){
      instance.$('#filterSearch').click();
    }

    else if(elt.currentTarget.id=="home_input"){
      autoFillQuery = instance.$('#home_input').val();
      Meteor.apply("getAutoFill",[autoFillQuery], {returnStubValue:true},
            function(error,result){
              // console.dir(['getInstruction',error,result]);
              if (error) {
                console.log("Error!!"+JSON.stringify(error)); return;
              }
              // console.log(result);
              r = JSON.parse(result);
              Session.set("autoFillResults",r);
              console.log(Session.get('autoFillResults'));
              // console.log(Like.find({owner:Meteor.userId(),recipe:Session.get('dict')}).fetch());
              }
      );

    }
    else if(elt.currentTarget.id=="filterSearch"){
      autoFillQuery = instance.$('#filterSearch').val();
      Meteor.apply("getAutoFill",[autoFillQuery], {returnStubValue:true},
            function(error,result){
              // console.dir(['getInstruction',error,result]);
              if (error) {
                console.log("Error!!"+JSON.stringify(error)); return;
              }
              // console.log(result);
              r = JSON.parse(result);
              Session.set("autoFillResults",r);
              console.log(Session.get('autoFillResults'));
              // console.log(Like.find({owner:Meteor.userId(),recipe:Session.get('dict')}).fetch());
              }
      );
    }
  },

  'click .advanceSearch': function(elt, instance){
    instance.$("#recipe_name").val(instance.$('#home_input').val());
    instance.$("#popup2").css("visibility", "visible");
    instance.$("#popup2").css("opacity", 1);
  },

  'click #popup_close2, click #filterSearch': function(elt, instance){
    instance.$("#popup2").css("visibility","hidden");
    instance.$('#popup2').css("opacity",0);
  },

})

Template.oneAutoFill.events({
  'click li': function(elt, instance){
    console.log("clicked");
    console.dir(elt)
    console.dir($('#home_input'));
    $("#home_input").val(this.result.title);
  }
})

Template.home.onCreated(function(){
  responsiveVoice.speak("Welcome. My name is Cookie, and I am here as your sous chef. When you open a recipe you can ask me for guidance by saying 'Cookie'", "US English Female", {pitch:1.2});

})
