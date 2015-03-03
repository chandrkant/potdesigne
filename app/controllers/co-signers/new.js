import Ember from 'ember';

export default Ember.Controller.extend({
  marrital_status: ["Married","Seprated", "Unmarried"],
  loan_type: ["Personal","Home","Car", "Education"],
  actions: {
    create: function(co_signer){
      var self = this;
      var apply_id = this.get('apply');
      co_signer.coSign.set("applyId", apply_id);

      var coSign = co_signer.get("coSign");
      Ember.$("select,input").focusout();
      var validations = [];
      validations.push(
        coSign.validate().then(function() {
          return true;
        },
        function() {
          coSign.set("showErrors", true);
          return false;
        })
      );
      validations.push(
        co_signer.validate().then(function() {
        return true;
        },
        function() {
        return false;
        })
      );
      Ember.RSVP.allSettled(validations).then(function (array) {
        var anyRejected = Ember.$.grep(array, function (result) {
        return !result.value;
        }).length > 0;
        if (!anyRejected) {
          co_signer.save().then(function () {
            self.transitionToRoute("applicants.edit", self.session.get('currentApplicant.id'));
          }, function () {
            Ember.$('input').blur();
          });
        }else{
          console.log("Failed??");
        }
      });
    }
  }
});
