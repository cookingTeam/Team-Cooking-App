Template.recipeSearch.onCreated(
  function(){
    this.state = new ReactiveDict();
    this.state.setDefault({
        recipes: []
      });
    }
)

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
          console.dir(r);
          return instance.state.set("recipes",r.results);
        });
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
