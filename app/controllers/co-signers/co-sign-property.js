import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  transition: "",
  actions: {
    cosign : function(){
    	var self=this;
      self.set('errorMessage',null);
      var message = '';
    	self.set("transition",self.container.lookup("controller:login").get("attemptedTransition"));
      var currentApplicant = self.session.get('applicant');
      if(currentApplicant){
        if(self.get('model').applies._data.email!==currentApplicant.email){
          self.transitionToRoute('co-signers.new');
        }
        else{
          message="You can't co-sign your own applied property";
          self.set('errorMessage',message);
        }
      }
      else{
        self.transitionToRoute('sign-up');
      }
    }
  }
});
