import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(){
    this.store.unloadAll('provider');
  },
  model: function (params) {
    return Ember.RSVP.hash({
          applicant: this.store.find('applicant', params.id),
          providers: this.store.find('provider'),
          applies: this.store.find('apply',{count:3}),
          starred_properties: this.store.find('starred_property',{count:3})
        });
  },

  setupController: function (controller, model) {
    controller.set('model', model);
  }

});
