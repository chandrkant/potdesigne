import Ember from 'ember';
import Landlord from 'portola/mixins/landlord' ;

export default Ember.Route.extend(Landlord,{
  model: function () {
    return this.store.createRecord("rental-offering");
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
  },
  deactivate: function () {
    var model = this.controller.content;
    if (model && model.get && (model.get('isNew') || model.get('isDirty')) && (!model.get('isSaving'))) {
      model.deleteRecord();
    }
  }
});
