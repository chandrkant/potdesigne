import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(){
		this._super();
		this.store.unloadAll('roommate-group');
	},
	model: function(params) {
		return this.store.find('roommate-group', params.id);

   }
});
