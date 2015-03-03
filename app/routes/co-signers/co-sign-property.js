import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(transition){
		var loginController = this.controllerFor('login');
    	loginController.set('attemptedTransition', transition);
		this._super();
		this.store.unloadAll('rental-offering');
	},

	model: function(params) {

		this.controllerFor('co-signers/new').set('apply', params.app_id);
		if(this.session.get('currentApplicant.id')){
	 	  return Ember.RSVP.hash({
          	offering: this.store.find('rental-offering', params.id),
          	photos: this.store.find('property-photo',{rental_offering_id : params.id}),
          	applies: this.store.find('apply',params.app_id)
        	});
		}
		else{
			return Ember.RSVP.hash({
          	offering: this.store.find('rental-offering', params.id),
          	photos: this.store.find('property-photo',{rental_offering_id : params.id}),
        	});
        }
	},
  	setupController: function (controller, model) {
    	controller.set('model', model);
  	}
});
