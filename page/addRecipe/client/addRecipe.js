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
    // var attributes = {
    //     vegetarian:document.getElementById('vegetarian').value(),
    //     vegan:document.getElementById('vegan').value(),
    //     glutenFree:document.getElementById('gluten').value(),
    //     dairyFree:document.getElementById('dairy').value(),
    //     veryHealthy:document.getElementById('healthy').value(),
    //     cheap:document.getElementById('cheap').value(),
    //     ketogenic:document.getElementById('keto').value()
    // };
    console.dir(instance.$('#vegetarian'))
    var attributes = {
      vegetarian: instance.$('#vegetarian')[0].checked,
      vegan: instance.$('#vegan')[0].checked,
      glutenFree: instance.$('#gluten')[0].checked,
      dairyFree: instance.$('#dairy')[0].checked,
      veryHealthy: instance.$('#healthy')[0].checked,
      cheap: instance.$('#cheap')[0].checked,
      ketogenic: instance.$('#keto')[0].checked
    }
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

  'click .addIng': function(elt, instance){
      console.dir(elt);
      var idOfButton = elt.currentTarget.id;
      console.dir(idOfButton);
      Session.set('textboxNum', Session.get('textboxNum')+1);
      var container = document.getElementById("container"+idOfButton);
      // var amt = document.createElement("input");
      // var unit = document.createElement("input");
      var input = document.createElement("input");

      input.type = "text";
      input.id= "ing"+Session.get('textboxNum');
      input.placeholder= "Ingredient "+Session.get('textboxNum');

      // del.setAttribute('class', 'glyphicon glyphicon-remove');
      // del.setAttribute('id', "removeIng"+Session.get('textboxNum'));

      // container.appendChild(amt);
      // container.appendChild(unit);
      console.dir(input);
      console.dir(container);
      container.appendChild(input);
      // container.appendChild(del);
      container.appendChild(document.createElement("br"));
  },
  'click #addStep': function(elt,instance){
    Session.set('textareaNum', Session.get('textareaNum')+1);
    console.dir(instance.$('#addRecipeTable'));
      var table = instance.$("#addRecipeTable");
      console.dir(instance.$('#addRecipeTable > tbody:last-child'));
      var input = document.createElement("textarea");
      var stepId = "step"+Session.get('textareaNum');
      Session.set('textboxNum', Session.get('textboxNum')+1);
      // input.type = "text";
      // input.id= "step"+Session.get('textareaNum');
      // input.placeholder= "Step "+Session.get('textareaNum');

      //container.appendChild(input);
      // container.appendChild(del);
      //container.appendChild(document.createElement("br"));
      instance.$('#addRecipeTable > tbody:last-child').append('<tr id="tableRow'+Session.get('textareaNum')+'"><td><textarea id='+stepId+' placeholder="Step '+Session.get('textareaNum')+'"></textarea></td><td><div id="container'+Session.get('textareaNum')+'""><input type="text" placeholder="Ingredient '+Session.get('textboxNum')+'" id="ing"'+Session.get('textboxNum')+'</div><br><button class="addIng btn btn-sm btn-info"  id="'+Session.get('textareaNum')+'"><span class="glyphicon glyphicon-plus plus-minus"></span> Ingredient</button></td></tr>');
  },

  'click #delStep': function(event, instance){
      var tableRowId = "tableRow"+Session.get('textareaNum');
      $('#tableRow'+Session.get('textareaNum')).remove();
      Session.set('textareaNum', Session.get('textareaNum')-1);


  }
})

Template.askforrecipe.helpers({
  stepId: "step"+Session.get('textareaNum')

})

Template.askforrecipe.onCreated(
  function(){
    Session.set('textboxNum', 3);
    Session.set('textareaNum', 1);
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
