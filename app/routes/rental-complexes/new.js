import Ember from 'ember';
import Landlord from 'portola/mixins/landlord' ;

export default Ember.Route.extend(Landlord, {
  model: function () {
    return this.store.createRecord("rental-complex");
  },
  setupController: function (controller, model) {
    controller.set("model", model);
    var user = this.session.get('applicant');
    this.store.find('property-manager', user.property_manager_id).then(
      function(manager){
        controller.set('model.propertyManager',manager);
      }
    );
  },
  deactivate: function () {
    var model = this.controller.content;
    if (model && model.get && (model.get('isNew') || model.get('isDirty')) && (!model.get('isSaving'))) {
      model.deleteRecord();
    }
  }
});
