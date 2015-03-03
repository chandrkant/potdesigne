import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    return this.store.find('applicant', params.id);
  },

  afterModel: function (applicant) {
    var _self = this;
    Ember.RSVP.hash({
      property_manager: applicant.get('propertyManager')
    }).then(function(profile){
      if (!profile.property_manager){
        applicant.set('propertyManager', _self.store.createRecord('property-manager'));
      }
    });
  },

  // setupController: function (controller, model) {
  //   controller.set('model', model);
  // }

});
