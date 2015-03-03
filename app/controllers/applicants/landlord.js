import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias("controllers.application.currentUser"),
  actions: {
    update: function (applicant) {
      var self = this;
      var propertyManager = applicant.get("propertyManager");
      Ember.$("select,input").focusout();
      var validations = [];
      validations.push(
        propertyManager.content.validate().then(function() {
          return true;
        },
        function() {
          propertyManager.set("showErrors", true);
          return false;
        })
      );
      Ember.RSVP.allSettled(validations).then(function (array) {
        var anyRejected = Ember.$.grep(array, function (result) {
        return !result.value;
        }).length > 0;
        if (!anyRejected) {
          applicant.save().then(function (response) {
            response._data['property_manager_id']=response._data.propertyManager._data.id;
            console.log(response);
            var session = self.container.lookup('simple-auth-session:main');
            session.setProperties({
              applicant:response._data
            });
            self.transitionToRoute('applicants.edit', applicant.id);
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
