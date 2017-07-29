import { Meteor } from 'meteor/meteor';

var fs = require('fs');
var path = Npm.require('path');
var basePath = path.resolve('.').split('.meteor')[0];


Meteor.startup(() => {
  // code to run on server at startup
  // var ingredSet = new Set();
  // fs.readFile('C:/Users/Yuan He/Desktop/train.json', (err, data) => {
  //   if (err) throw err;
  //   data = JSON.parse(data);
  //   console.log(data.length);
  //   for (let i = 0; i < data.length; i++) {
  //      var d = data[i];
  //     //  console.log(d.ingredients);
  //      for(let j = 0; j<d.ingredients.length;j++){
  //       //  console.log(d.ingredients[j]);
  //        if(!ingredSet.has(d.ingredients[j])){
  //          ingredSet.add(d.ingredients[j]);
  //        }
  //      }
  //   }
  //   var count = 0;
  //   for (let item of ingredSet) {
  //     // console.log(item);
  //     count++;
  //   }
  //    console.log("done, total num is "+count);
  //
  //    var file_string = "";
  //    var a = {};
  //    var setArray=Array.from(ingredSet);
  //    for(let i=0; i<setArray.length; i++){
  //      a.value = setArray[i];
  //      a.synonyms=new Array();
  //      a.synonyms[0]=setArray[i];
  //     // console.log(setArray[i]);
  //
  //     file_string+=JSON.stringify(a)+",";
  //    }
  //     fs.writeFileSync("C:/Users/Yuan He/Desktop/output.txt", file_string);
  //     console.log("done");
  //   //  .forEach(function(line){
  //   //    for(let i=0; i<ingredSet.size; i++){
  //   //      a["ingredient"] = line;
  //   //      i++;
  //   //    }
  //   //  fs.writeFileSync("C:/Users/Yuan He/Desktop/output.txt", JSON.stringify(a));
  //    })
   });

  //  var ws = fs.createWriteStream('C:/Users/Yuan He/Desktop/ingred_set.txt');
  //   ws.on('open', function(fd) {
  //       console.log(fs.existsSync('anypath'));
  //   });



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
