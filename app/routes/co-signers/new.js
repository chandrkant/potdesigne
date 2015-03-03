import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
    var user = this.session.get('applicant');
    if(user.co_signer_id){
      return this.store.find("co-signer", user.co_signer_id);
    }else{
      return this.store.createRecord("co-signer");
    }
  },
  setupController: function (controller, model) {
    if(model.id){
      controller.set('successMessage',true);
    }
    controller.set("model", model);
  },
  afterModel: function (co_signer) {
    var _self = this;
    co_signer.set('coSign', _self.store.createRecord('co-sign'));
  },
  deactivate: function () {
    var model = this.controller.content;
    if (model && model.get && (model.get('isNew') || model.get('isDirty')) && (!model.get('isSaving'))) {
      model.deleteRecord();
    }
  }
});
