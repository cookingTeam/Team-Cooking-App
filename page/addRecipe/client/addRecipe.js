Meteor.subscribe('myrecipe');

Template.askforrecipe.events({
  'click #add'(elt,instance){
    var dishName = instance.$('#dishName').val();
    var ingredients = new Array();
    for (i=1; i<=Session.get('textboxNum'); i++){
      var ing = {
        amount:instance.$('#amt'+i).val(),
        unit:instance.$("#unit"+i).val(),
        name:instance.$("#ing"+i).val()
      }
      ingredients.push(ing);
    }
    var steps = new Array();
    for (i=1; i<=Session.get('textareaNum'); i++){
      steps.push(instance.$("#step"+i).val());
    };
    var attributes = {
        vegetarian:document.getElementById('vegetarian').value(),
        vegan:document.getElementById('vegan').value(),
        glutenFree:document.getElementById('gluten').value(),
        dairyFree:document.getElementById('dairy').value(),
        veryHealthy:document.getElementById('healthy').value(),
        cheap:document.getElementById('cheap').value(),
        ketogenic:document.getElementById('keto').value()
    };
    console.log()
    var dish = {
      dishName:dishName,
      ingredients:ingredients,
      steps:steps,
      attributes:attributes,
      owner:Meteor.userId()
    };
    console.dir(dish);
    Meteor.call('myrecipe.insert', dish, function(err,response){
      console.log(err);
      console.log(response);
    });


  },

  'click #addIngredient': function(){
      Session.set('textboxNum', Session.get('textboxNum')+1);
      var container = document.getElementById("container");
      var amt = document.createElement("input");
      var unit = document.createElement("input");
      var input = document.createElement("input");
      // var del = document.createElement("span");

      amt.type="text";
      amt.id="amt"+ Session.get('textboxNum');
      amt.placeholder="amt";
      amt.size="3";

      unit.type="text";
      unit.id="unit"+Session.get('textboxNum');
      unit.placeholder="unit"
      unit.size="5"

      input.type = "text";
      input.id= "ing"+Session.get('textboxNum');
      input.placeholder= "Ingredient "+Session.get('textboxNum');

      // del.setAttribute('class', 'glyphicon glyphicon-remove');
      // del.setAttribute('id', "removeIng"+Session.get('textboxNum'));

      container.appendChild(amt);
      container.appendChild(unit);
      container.appendChild(input);
      // container.appendChild(del);
      container.appendChild(document.createElement("br"));
  },

  'click #addStep': function(){
      Session.set('textareaNum', Session.get('textareaNum')+1);
      var container = document.getElementById("stepcontainer");
      // container.appendChild(document.createTextNode("Ingredient "+Session.get('textboxNum')));
      var input = document.createElement("textarea");
      // var del = document.createElement("span");
      input.type = "text";
      input.id= "step"+Session.get('textareaNum');
      input.placeholder= "Step "+Session.get('textareaNum');
      //
      // del.setAttribute('class', 'glyphicon glyphicon-remove');
      // del.setAttribute('id', "removeStep"+Session.get('textboxNum'));

      container.appendChild(input);
      // container.appendChild(del);
      container.appendChild(document.createElement("br"));

  },

  'click .glyphicon-remove': function(event, instance){
      console.dir(event.target);


  }
})

Template.askforrecipe.onCreated(
  function(){
    Session.set('textboxNum', 3);
    Session.set('textareaNum', 3);
  }
)

Template.showRecipe.helpers({
  recipeData() {return Myrecipe.find()}
})

Template.showRecipe.onCreated(function(){
  Meteor.subscribe('myrecipe');
})

Template.recipeRow.helpers({
  isOwner() {console.dir(this);
    return this.recipe.owner == Meteor.userId()}
})

Template.recipeRow.events({
  'click span'(elt,instance){
    Meteor.call('myrecipe.remove', this.recipe);
  }
})
