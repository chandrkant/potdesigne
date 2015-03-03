import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function(){
		this._super();
		this.store.unloadAll('starred_property');
	},
  	model: function() {
    	return this.store.find('starred_property');
  	}
});
