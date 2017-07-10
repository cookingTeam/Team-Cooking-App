Meteor.methods(
  {'getRecipe': function(dish){
    // var new_dish = dish.split(' ').join('+');
    // console.log(new_dish);

    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?instructionsRequired=true&limitLicense=false&number=10&offset=0&query="+dish+"&type=main+course";
    console.log(url);
    const result = Meteor.http.call("get", url, {headers:{'X-Mashape-Key': "wwws95RenimshozMKudsHrQbarSCp1eWc80jsnt3Z3FnrU6XXb", 'Accept': "application/json"}});
    console.log("result:"+result);
    console.log("result.content:"+result.content);
    return result.content;}
  },

    {'getInstruction': function(id){
      console.log(id);
      const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id+"/analyzedInstructions?stepBreakdown=true";
      // const url ="https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/716461/analyzedInstructions?stepBreakdown=true";
      console.log(url);
      const result = Meteor.http.call("get", url, {headers:{'X-Mashape-Key': "wwws95RenimshozMKudsHrQbarSCp1eWc80jsnt3Z3FnrU6XXb", 'Accept': "application/json"}});
      console.log("result:"+result);
      console.log("result.content:"+result.content);
      return result.content;}
    }
  )
