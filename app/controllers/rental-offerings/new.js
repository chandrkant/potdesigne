import Ember from 'ember';

export default Ember.ObjectController.extend({
  property_type: ["Apartment", "Duplex", "House", "Townhouse"],
  isControllerNew: true,
  cleanupAndContinue: function () {
    if (this.get("model")) {
      this.get("model").deleteRecord();
      this.store.dematerializeRecord(this.get("model")) ;
    }
    this.transitionToRoute("rental-offerings.index");
  },
  actions:{
    submit: function(rentalOffering) {
      var self = this;
      rentalOffering.validate().then(function () {
        rentalOffering.save().then(function (data) {
          self.send('openPhotoUpload', 'propertyphoto',data);
          self.transitionToRoute("rental-offerings.index");
        });
      }, function () {
        Ember.$('input').blur();
      });
    },
    cancel: function () {
      this.transitionToRoute('rental-offerings.index');
    }
  }
});
