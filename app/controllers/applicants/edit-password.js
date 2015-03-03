import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    update: function () {
      var me;
      me = this;
      var pass = Ember.$("[name=password]").val();
      var pass_con = Ember.$("[name=passwordConfirmation]").val();
      var adapter = this.container.lookup('adapter:application');
      if (pass === "" ){
        Bootstrap.NM.push("Please enter your password", 'danger');
      }else if(pass.length < 8){
        Bootstrap.NM.push("Minimum 8 character required for password", 'danger');
      }else if(pass === pass_con){
        Ember.$.ajax({
          url: adapter.host+'/v2/applicants/update_password',
          type: "PUT",
          data: {
          "[id]": me.session.get('currentApplicant.id'),
          "applicant[password]": pass,
          "applicant[password_confirmation]": pass_con,
          },
          success: function() {
            me.transitionToRoute('application');
            alert("Congratulations! your password has been changed.");
          },
          error: function(data) {
            Bootstrap.NM.push( data.responseJSON.join(), 'danger');
          }
        });
      }else{
        Bootstrap.NM.push("Password doesn't match confirmation", 'danger');
      }
    }
  }
});
