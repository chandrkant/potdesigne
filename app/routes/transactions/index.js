import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function(){
		this._super();
		this.store.unloadAll('transaction');
	},
  	model: function() {
    	return this.store.find('transaction');
  	}
});
