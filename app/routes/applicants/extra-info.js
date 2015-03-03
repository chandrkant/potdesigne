import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    return this.store.find('applicant', params.id);
  },

  afterModel: function (applicant) {
    var _self = this;
    Ember.RSVP.hash({
      profile: applicant.get('profile')
    }).then(function(profile){
      if (!profile.profile){
        applicant.set('profile', _self.store.createRecord('profile'));
      }
    });
  },

  // setupController: function (controller, model) {
  //   controller.set('model', model);
  // }

});
