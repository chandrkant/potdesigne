import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin,{
	beforeModel: function(){
		this._super();
		this.store.unloadAll('rental-offering');
	},
	model: function(params) {

    return Ember.RSVP.hash({
      rentalOffering: this.store.find('rental-offering'),
      rentalOfferingPage: this.findPaged('rental-offering',params.perPage)
    });
  }

});
