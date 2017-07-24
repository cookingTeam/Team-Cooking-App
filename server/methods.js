import { Meteor } from 'meteor/meteor';

var fs = require('fs');
var path = Npm.require('path');
var basePath = path.resolve('.').split('.meteor')[0];

Meteor.startup(() => {
  // code to run on server at startup
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
