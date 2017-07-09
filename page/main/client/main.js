import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onCreated(function() {
  // counter starts at 0
  this.advance = new ReactiveVar(false);
});

Template.main.helpers({
  adSearch() {
    return Template.instance().advance.get();
  },
});

Template.main.events({
  'click #advanceSearch'(event, instance) {
    if(Template.instance().advance.get()==true){
      instance.advance.set(false);
    }else{
      instance.advance.set(true);
    }
  },
});
