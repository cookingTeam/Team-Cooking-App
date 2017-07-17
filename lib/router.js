Router.configure({layoutTemplate: 'layout',})
Router.route('/',{name:'recipeSearch'});
Router.route('about',{name:'about'});
// Router.route('recipeSearch',{name:'recipeSearch'});
Router.route('profile',{name:'profile', waitOn: function(){
  return Meteor.subscribe('like');
}
});
Router.route('addRecipe',{name:'addRecipe'});
Router.route('cookRecipe', {name:'cookRecipe'});
Router.route('recipePage/:id',
  {name: "recipePage",
   	data: function(){
  		console.log("id:"+this.params.id);
  	   return this.params.id;
  	 },
    waitOn: function(){
      return Meteor.subscribe('like');
    }
   }
);
