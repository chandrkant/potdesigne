import Ember from 'ember';

export default Ember.Controller.extend({
  employment_status: ["student", "employed","military","retired","unemployed"],
  state_list: ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID",
              "IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE",
              "NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD",
              "TN","TX","UT","VT","VA","WA","WV","WI","WY"],
  actions: {
    update: function (applicant) {
      var self=this;
      applicant.save().then(function () {
        Bootstrap.NM.push("Account information updated successfully", 'success');
        self.transitionToRoute('applicants.edit', applicant.id);
      }, function (response) {
        Bootstrap.NM.push(response, 'danger');
      });
    }
  }
});
