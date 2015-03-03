import Ember from 'ember';
import Landlord from 'portola/mixins/landlord' ;

export default Ember.Route.extend(Landlord, {
  model: function (params) {
    return this.store.find("rental-complex", params.id);
  },
  setupController: function (controller, model) {
    controller.set("model", model);
  }
});
