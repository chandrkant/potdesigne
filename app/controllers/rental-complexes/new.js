import Ember from 'ember';

export default Ember.ObjectController.extend({
  cleanupAndContinue: function () {
    if (this.get("model")) {
      this.get("model").deleteRecord();
      this.store.dematerializeRecord(this.get("model")) ;
    }
    this.transitionToRoute("rental-complexes.index");
  },
  actions:{
    submit: function(rentalComplex) {
      var self = this;
      rentalComplex.validate().then(function () {
        rentalComplex.save().then(function () {
          self.transitionToRoute("rental-complexes.index");
        });
      }, function () {
        Ember.$('input').blur();
      });
    },
    cancel: function () {
      this.transitionToRoute('rental-complexes.index');
    }
  }
});
