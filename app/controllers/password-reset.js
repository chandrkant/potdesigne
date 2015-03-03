import Ember from 'ember';

export default Ember.ObjectController.extend({
  model: {},
  actions: {
    passwordreset: function() {
      var me = this;
      var adapter = this.container.lookup('adapter:application');
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var email = Ember.$("[type=email]").val();
      if(regex.test(email)){
        Ember.$.ajax({
          url: adapter.host+'/applicants/password',
          type: "POST",
          data: {"user[email]": email},

          success: function() {
            alert('Please check your email account to reset your password');
            me.transitionToRoute('application');
          },
          error: function(data) {
            Bootstrap.NM.push(data.responseJSON.join(), 'danger');
          }
        });
      }else{
        Bootstrap.NM.push('Please enter a valid email address', 'danger');
      }
    },
    cancel: function(){
      this.transitionToRoute("application");
    }
  }
});
