import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    this.controllerFor('password-change').set('token', params.reset_password_token);
  }
});
