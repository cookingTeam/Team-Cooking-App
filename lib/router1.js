// Router.configure({
// 	layoutTemplate: 'layout',
// 	//loadingTemplate: 'loading',
// 	//waitOn: function() {return true;}   // later we'll add more interesting things here ....
// });
//
// Router.route('/', {name: 'home'});
// Router.route('about');
// Router.route('links');
// Router.route('images');
// Router.route('reviews');
// Router.route('profile');
// Router.route('searchdata/:id', {name: "searchdata",
//  	data: function(){
// 		console.log("id:"+this.params.id);
// 	return this.params.id;
// 	 }
// }
// );
// // Router.route('searchdata/:id',
// // {name:"searchdata",
// // 	data: function(){
// // 		console.log("id:"+this.params.id);
// // 		Meteor.apply("getInstruction",[this.params.id],{returnStubValue: true},
// // 			function(error,result){
// // 				console.dir(['getInstruction',error,result]);
// // 				if (error) {
// // 					console.log("Error!!"+JSON.stringify(error)); return;
// // 				}
// // 				console.log(result);
// // 				r = JSON.parse(result);
// // 				console.dir(r);
// // 				return r;
// // 			}
// // 		)
// // 	}
// // });
