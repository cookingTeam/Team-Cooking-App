var offset = 0;

Template.recipeSearch.onCreated(
  function(){
    this.state = new ReactiveDict();
    this.state.setDefault({
        recipes: [],
        pageNumber: 0
      });
    }
)

Template.recipeSearch.onRendered(function(){
  //console.dir("query:::::  "+Router.current().params.query);
  if(Router.current().params.query){
    //console.log(Router.current().params.query);
    var state = Template.instance().state;
    diet = Router.current().params.query.diet;
    cuisine = Router.current().params.query.cuisine;
    intolerances = Router.current().params.query.intolerances;
    recipe_name = Router.current().params.query.query;
    console.log(Router.current().params.query.offset);
    offset = Router.current().params.query.offset;
    offset = parseInt(offset,10);
    state.set("pageNumber", offset/10);
    Template.instance().$("#recipe_name").val(Router.current().params.query.query);
    var api_query = "instructionsRequired=true&limitLicense=false&number=10&"+"offset="+offset+"&query="+recipe_name;
    console.log("apiQ:: "+api_query);
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
    Meteor.apply("getRecipe",[api_query],{returnStubValue: true},
      function(error,result){
        console.dir(['getRecipe',error,result]);
        if (error) {
          console.log("Error!!"+JSON.stringify(error)); return;
        }
        console.log(result);
        r = JSON.parse(result);
        //console.dir(r);
        state.set("recipes",r.results);
      });


    console.log("clicked");
  }

})

Template.recipeSearch.events({
  "click .search_recipeSearch": function(elt, instance){
      offset = 0;
      console.dir("diet::: "+instance.$('#dietSelect').val());
      console.dir("cuisine::: "+instance.$("#cuisineSelect").val());
      console.dir("recipe_name::: "+instance.$('#recipe_name').val());
      const recipe_name = instance.$('#recipe_name').val();
      const diet = instance.$('#dietSelect').val();
      const cuisine = instance.$('#cuisineSelect').val();
      const intolerances = instance.$('#intolerances').val();
      var api_query = "instructionsRequired=true&limitLicense=false&number=10&offset=0&query="+recipe_name;
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
      Meteor.apply("getRecipe",[api_query],{returnStubValue: true},
        function(error,result){
          console.dir(['getRecipe',error,result]);
          if (error) {
            console.log("Error!!"+JSON.stringify(error)); return;
          }
          console.log(result);
          r = JSON.parse(result);
          //console.dir(r);
          instance.state.set("recipes",r.results);
        });
      //var query = 'keyword='+search_param_dish;
      Router.go("recipeSearch", {}, {query: api_query});
    },

  'keypress #recipe_name': function(elt, instance){
    if(event.which==13){
      instance.$('.search_recipeSearch').click();
    }
  },

  'click .advancedSearch_recipeSearch': function(elt, instance){
    instance.$("#popup2").css("visibility", "visible");
    instance.$("#popup2").css("opacity", 1);
  },

  'click #popup_close2, click #filterSearch': function(elt, instance){
    instance.$("#popup2").css("visibility","hidden");
    instance.$('#popup2').css("opacity",0);
  },

  'click #firstResultPage': function(elt,instance){
    instance.state.set("pageNumber", 0);
    console.log('firstresultpage clicked');
    offset = 0;
    getQuery(instance);

  },

  'click #backwards': function(elt, instance){
    offset = parseInt(offset,10);
    pageNumber = instance.state.get("pageNumber");
    instance.state.set("pageNumber", pageNumber-1);
    if(offset>=0){
      offset -= 10;
    }
    else{
      alert("You are at the begining!")
    }
    getQuery(instance);
  },

  'click #forwards': function(elt, instance){
    offset = parseInt(offset,10);
    pageNumber = instance.state.get("pageNumber");
    instance.state.set("pageNumber", pageNumber+1);
    offset+=10;
    getQuery(instance);

  }

})

function getQuery(instance){
  console.log(offset);
  diet = Router.current().params.query.diet;
  cuisine = Router.current().params.query.cuisine;
  intolerances = Router.current().params.query.intolerances;
  recipe_name = Router.current().params.query.query;
  var api_query = "instructionsRequired=true&limitLicense=false&number=10&"+"offset="+offset+"&query="+recipe_name;
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

  Meteor.apply("getRecipe",[api_query],{returnStubValue: true},
    function(error,result){
      console.dir(['getRecipe',error,result]);
      if (error) {
        console.log("Error!!"+JSON.stringify(error)); return;
      }
      console.log(result);
      r = JSON.parse(result);
      //console.dir(r);
      if(r.results){
        instance.state.set("recipes",r.results);
      }
      else{
        alert("Oops, that's all we've got so far..");
      }
    });

  //var query = 'keyword='+search_param_dish;
  console.log(api_query);
  Router.go("recipeSearch", {}, {query: api_query});
}


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
  },

  pageNumber: function(){
    const instance = Template.instance();
    pageNumber = parseInt(instance.state.get("pageNumber"),10);
    return pageNumber+1;
  }
})
