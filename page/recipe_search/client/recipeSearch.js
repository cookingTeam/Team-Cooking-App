Template.recipeSearch.onCreated(
  function(){
    this.state = new ReactiveDict();
    this.state.setDefault({
        recipes: []
      });
    }
)

Template.recipeSearch.onRendered(function(){
  console.log(Router.current().params.query.keyword);
  if(Router.current().params.query.keyword){
    Template.instance().$('#input').val(Router.current().params.query.keyword);
    Template.instance().$('#search').click();
  }
})

Template.recipeSearch.events({
  "click #search": function(elt, instance){

      const search_param_dish = instance.$('#input').val();
      Meteor.apply("getRecipe",[search_param_dish],{returnStubValue: true},
        function(error,result){
          console.dir(['getRecipe',error,result]);
          if (error) {
            console.log("Error!!"+JSON.stringify(error)); return;
          }
          console.log(result);
          r = JSON.parse(result);
          //console.dir(r);
          return instance.state.set("recipes",r.results);
        });

      var query = 'keyword='+search_param_dish;
      Router.go("recipeSearch", {}, {query: query});
    },

  'keypress #input': function(elt, instance){
    if(event.which==13){
      instance.$('#search').click();
    }
  }
})

Template.res.events({
      "click .clickable-row": function(event,instance){
          console.log(this.r.id);
          var href = "/recipePage/"+this.r.id;
          console.log(href);
          if (href) {
              window.location.assign(href);//jump to recipe detail page
          }
      }
})




Template.recipeSearch.helpers({
  recipes: function(){
    const instance = Template.instance();
    return instance.state.get("recipes");
  }
})
