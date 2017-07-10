Router.configure({layoutTemplate: 'layout',})
Router.route('/',{name:'main'});
Router.route('about',{name:'about'});
Router.route('recipeSearch',{name:'recipeSearch'});
Router.route('profile',{name:'profile'});
Router.route('addRecipe',{name:'addRecipe'});
Router.route('searchdata/:id',
  {name: "searchdata",
   	data: function(){
  		console.log("id:"+this.params.id);
  	   return this.params.id;
  	 }
   }
);
