import Ember from 'ember'  ;

export default Ember.Mixin.create({
  beforeModel: function(transition) {
    var currentApplicant = this.session.get('currentApplicant');
    if (!currentApplicant){
      var loginController= this.controllerFor("login");
      var error_message= "You are not authorized to access this page!" ;
      loginController.set('auth_error_message',error_message);
      loginController.set('attemptedTransition',transition);
      this.transitionTo('login');
    }
  }
});

