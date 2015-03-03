import Ember from 'ember';

export default Ember.View.extend({
   didInsertElement  : function(){
   	Ember.$(document).ready(function() {
    	Ember.$('.name').editable({
    		mode:'popup',
    		ajaxOptions: {type: "PUT"},
    		type: 'text',
		    pk: 1,
		    title: 'Enter New Group Name'
    	});
	});
}
});
