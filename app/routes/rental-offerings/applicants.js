import Ember from 'ember';

export default Ember.Route.extend( {
  model: function (params) {
    var adapter = this.container.lookup('adapter:application');
    return Ember.$.getJSON(adapter.host+'/v2/rental_offerings/'+params.id+'/applicants');
  },
  setupController: function (controller, model) {
    controller.set("model", model);
    controller.store.find('attachment').then(function (attachment) {
      controller.set('attachments', attachment.content);
    });
  },
});
