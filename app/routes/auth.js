import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import initializeSession from 'portola/utils/utility-authentication';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  setupController: function (controller) {

    controller.set("currentApplicant", controller.session.get('currentApplicant'));
  },
  afterModel: function() {
    if (!(this.session.get('currentApplicant') instanceof DS.Model)){
      var content_clone = JSON.parse(JSON.stringify(this.session.content));
      initializeSession(this.container, this.session, content_clone);
    }
  }
});
