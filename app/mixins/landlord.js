import Ember from 'ember'  ;

export default Ember.Mixin.create({
  beforeModel: function() {
    this.store.adapterFor('application').reopen({
      namespace: 'v2/landlord'
    });
  },
  afterModel: function () {
    this.store.adapterFor('application').reopen({
      namespace: 'v2'
    });
  }
});
