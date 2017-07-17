Template.askforrecipe.events({
  'click #add'(elt,instance){
    const dishName = instance.$('#dishName').val();
    const steps = instance.$('#steps').val();

    var dish = {
      dishName:dishName,
      steps:steps,
      owner:Meteor.userId()
    };
    Meteor.call('dish.insert',dish);

    instance.$('#dishName').val("");
    instance.$('#steps').val("");
  },

  'click #addIngredient': function(){
      Session.set('textboxNum', Session.get('textboxNum')+1);
      var container = document.getElementById("container");
      var amt = document.createElement("input");
      var unit = document.createElement("input");
      var input = document.createElement("input");
      
      amt.type="text";
      amt.id="amt"+ Session.get('textboxNum');
      amt.placeholder="amt";
      amt.size="3";

      unit.type="text";
      unit.id="unit"+Session.get('textboxNum');
      unit.placeholder="unit"
      unit.size="5"

      input.type = "text";
      input.id= "ingredient"+Session.get('textboxNum');
      input.placeholder= "Ingredient "+Session.get('textboxNum');

      container.appendChild(amt);
      container.appendChild(unit);
      container.appendChild(input);
      container.appendChild(document.createElement("br"));
  },

  'click #addStep': function(){
      Session.set('textareaNum', Session.get('textareaNum')+1);
      var container = document.getElementById("stepcontainer");
      // container.appendChild(document.createTextNode("Ingredient "+Session.get('textboxNum')));
      var input = document.createElement("textarea");
      input.type = "text";
      input.id= "step"+Session.get('textareaNum');
      input.placeholder= "Step "+Session.get('textareaNum');
      container.appendChild(input);
      container.appendChild(document.createElement("br"));
  }
})
Template.askforrecipe.onCreated(
  function(){
    Session.set('textboxNum', 3);
    Session.set('textareaNum', 3);
  }
)

Template.showRecipe.helpers({
  recipeData() {return MyRecipe.find()}
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
    Meteor.call('dish.remove',this.recipe);
  }
})
