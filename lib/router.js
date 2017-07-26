Router.configure({layoutTemplate: 'layout',})
Router.route('/',{name:'home'});
Router.route('about',{name:'about'});
Router.route('community',{name:'community'});
// Router.route('recipeSearch',{name:'recipeSearch'});
Router.route('recipeSearch', {name: 'recipeSearch'})
Router.route('profile',{name:'profile', waitOn: function(){
  return Meteor.subscribe('like');
}
});
Router.route('recipePage/:id/share',
  {name: "share",
   	data: function(){
  		console.log("id:"+this.params.id);
  	   return this.params.id;
  	 }
   }
);
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
Router.route('ownRecipePage/:id',
  {name: 'ownRecipePage',
   data: function(){
     console.log(this.params.id);
     return this.params.id;
   },
  waitOn: function(){
    return Meteor.subscribe('myrecipe');
  }});
