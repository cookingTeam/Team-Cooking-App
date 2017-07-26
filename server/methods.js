import { Meteor } from 'meteor/meteor';

var fs = require('fs');
var path = Npm.require('path');
var basePath = path.resolve('.').split('.meteor')[0];


Meteor.startup(() => {
  // code to run on server at startup
  fs.readFile('C:/Users/Yuan He/Desktop/train.json', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    // console.log(data);
    for (let i = 0; i < 1; i++) {
       var d = data[i];
       console.log(d.ingredients);
       console.log(d.ingredients[0]);
    }
  });


});

Meteor.methods({
   'file-upload': function (file, fileData) {
      console.dir(file );
      var newPath = basePath+'public/images/'+file;
      console.log(newPath);
      fs.writeFile(newPath, fileData, 'binary', function(err) {
      if(err) {
          return console.log(err);
      }
      });
   }
});
