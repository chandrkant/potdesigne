import Ember from 'ember';

export default Ember.ObjectController.extend({
  model: {},
  token:null,
  actions: {
    passwordchange: function() {
      var me;
      me = this;
      var pass = Ember.$("#password").val();
      var pass_con = Ember.$("#passwordConfirmation").val();
      var pass_token = me.token;
      var adapter = this.container.lookup('adapter:application');
      if (pass === "" ){
        Bootstrap.NM.push("Please enter your password", 'danger');
      }else if(pass.length < 8){
        Bootstrap.NM.push("Minimum 8 character required for password", 'danger');
      }else if(pass === pass_con){
        Ember.$.ajax({
          url: adapter.host+'/applicants/password',
          type: "PUT",
          data: {
          "user[password]": pass,
          "user[password_confirmation]": pass_con,
          "user[reset_password_token]": pass_token
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
    },
    cancel: function(){
      this.transitionToRoute("application");
    }
  }
});
