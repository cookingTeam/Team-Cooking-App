
Template.ownRecipePage.helpers({
  recipe: function(){
  // console.log(this.toString());
  // console.dir(Myrecipe.find({_id:this.toString()}).fetch());
  console.log(Myrecipe.findOne(this.toString()).image);
    return Myrecipe.findOne(this.toString());
  }
})
