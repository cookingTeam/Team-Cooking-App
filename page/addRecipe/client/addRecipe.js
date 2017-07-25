Meteor.subscribe('myrecipe');

var imagePath = '';
Template.askforrecipe.events({

  "change .file-upload-input": function(event, template){
     var func = this;
     console.dir(event.currentTarget);
     var file = event.currentTarget.files[0];
     console.log(file.name);
     fileName = file.name;
     var reader = new FileReader();
     reader.onload = function(fileLoadEvent) {

        Meteor.call('file-upload', fileName, reader.result);
     };
     reader.readAsBinaryString(file);
     imagePath = 'images/'+fileName;
    //  template.$('#testImage').attr("src", 'images/'+fileName);
    //  console.dir(template.$('#testImage').attr('src'));
  },


  'click #add'(elt,instance){
    var dishName = instance.$('#dishName').val();
    var recipeDescription = instance.$('#recipeDescription').val();
    var ingredients = new Array();
    for (i=1; i<=Session.get('textboxNum'); i++){
      console.dir(instance.$('#ing'+i).val());

         if(instance.$('#ing'+i).val()){
            ing = {
            originalString: instance.$('#ing'+i).val(),
            }
            ingredients.push(ing);
      }

    }
    var steps = new Array();
    for (i=1; i<=Session.get('textareaNum'); i++){
          var stepIng = new Array();
          var stepIngInput = $("#container"+i+" input");
          console.dir(stepIngInput);
          stepIngInput.each(function(index, elt){
            console.log($(elt).val());
            if($(elt).val()){
              stepIng.push({name: $(elt).val()});
            }
          })
          eachStep = {step: instance.$("#step"+i).val(), ingredients:stepIng, number: i}
          steps.push(eachStep);
    };

    var dish = {
      vegetarian: instance.$('#vegetarian')[0].checked,
      vegan: instance.$('#vegan')[0].checked,
      glutenFree: instance.$('#gluten')[0].checked,
      dairyFree: instance.$('#dairy')[0].checked,
      veryHealthy: instance.$('#healthy')[0].checked,
      cheap: instance.$('#cheap')[0].checked,
      ketogenic: instance.$('#keto')[0].checked,
      title:dishName,
      description: recipeDescription,
      extendedIngredients:ingredients,
      analyzedInstructions:[{'steps': steps}],
      image: imagePath,
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
      var del = document.createElement("span")
      var input = document.createElement("input");
      var br = document.createElement("br")

      del.setAttribute('class', 'glyphicon glyphicon-remove');
      del.setAttribute('id', "delIng"+Session.get('textboxNum'));

      input.type = "text";
      input.id= "ing"+Session.get('textboxNum');
      input.placeholder= "Ingredient ";

      br.setAttribute('id', "br"+Session.get('textboxNum'));

      console.dir(input);
      console.dir(container);
      container.insertBefore(input, document.getElementById(elt.currentTarget.id));
      container.insertBefore(del, input);
      container.insertBefore(br, document.getElementById(elt.currentTarget.id));

  },
  'click .glyphicon-remove': function(elt,instance){
      var id = elt.currentTarget.id;
      var num = id.substring(6);
      console.dir(elt.currentTarget.parentElement.id);
      var container = document.getElementById(elt.currentTarget.parentElement.id);
      container.removeChild(document.getElementById('ing'+num));
      container.removeChild(document.getElementById('delIng'+num));

      container.removeChild(document.getElementById('br'+num));

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
      instance.$('#addRecipeTable > tbody:last-child').append('<tr id="tableRow'+Session.get('textareaNum')+'"><td><textarea id='+stepId+' placeholder="Step '+Session.get('textareaNum')+'"></textarea></td><td><div id="container'+Session.get('textareaNum')+'""><span class="glyphicon glyphicon-remove" id="delIng'+Session.get('textboxNum')+'"></span><input type="text" placeholder="Ingredient" id="ing'+Session.get('textboxNum')+'"><br><button class="addIng btn btn-sm btn-info"  id="'+Session.get('textareaNum')+'"><span class="glyphicon glyphicon-plus plus-minus"></span> Ingredient</button></div></td></tr>');
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
  },
  'click td': function(elt, instance){
    ownRecipeId = this.recipe._id
    console.dir(this.recipe._id);
    Router.go('/ownRecipePage/'+ownRecipeId);
  }
})
