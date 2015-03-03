import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
  	Ember.$('input[type=file]').simpleFileInput({
		placeholder : 'Select',
		buttonText : 'Select'
	});
  }
});