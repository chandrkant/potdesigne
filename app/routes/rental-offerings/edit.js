import Ember from 'ember';
import Landlord from 'portola/mixins/landlord' ;

export default Ember.Route.extend( Landlord,{
  model: function (params) {
    return this.store.find("rental-offering", params.id);
  },
  setupController: function (controller, model) {
    controller.set("model", model);
    controller.store.adapterFor('application').reopen({
      namespace: 'v2/landlord'
    });
    controller.store.find('rental-complex').then(function (complex) {
      controller.set('complexes', complex.content);
    });
    controller.store.adapterFor('application').reopen({
      namespace: 'v2'
    });
    controller.store.find('property-photo',{rental_offering_id : model.id}).then(function(photos) {
      controller.set('photos', photos);
    });


  }
});
