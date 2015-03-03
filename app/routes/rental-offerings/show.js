import Ember from 'ember';
import Landlord from 'portola/mixins/landlord' ;

export default Ember.Route.extend(Landlord,{
  model: function(params) {
    return this.store.find("rental-offering",params.id) ;
  },
  setupController: function (controller, model) {
    controller.set('model', model);

    controller.store.find('property-photo',{rental_offering_id : model.id}).then(function(photos) {
      controller.set('photos', photos);
    });
  }
});
