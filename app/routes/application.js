import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
// import analyticsSendHandlers from '../utils/analyticsSendHandlers'; see below
import analyticsHandler from '../utils/analyticsHandler';
var ApplicationRoute;

ApplicationRoute = Ember.Route.extend(ApplicationRouteMixin,{
  actions: {
    model: function () {
      return {};
    },
    openModal: function(modal,result,applicants) {
      var starval = '';
      starval = Ember.$( "#star-yellow-"+result.id ).is(':visible');
      if(starval){
        result.set('starred',true);
      }
      else{
        result.set('starred',false);
      }

      this.controllerFor(modal).set('model', result);
      this.controllerFor(modal).set('applicant_data', applicants);
      var self = this;
      self.store.find('property-photo',{rental_offering_id : result.id}).then(function(photos) {
        self.controllerFor(modal).set('photos', photos);
        return self.render(modal, {
          into: 'application',
          outlet: 'modal'
        });
      });

    },
    openModalAttachment: function(modal) {
     var self=this;
     self.store.find('attachment').then(function(data){
      self.controllerFor(modal).set('model',data);
      return self.render(modal, {
          into: 'application',
          outlet: 'modal'
        });
     });

    },
    openPhotoUpload: function(modal,result){
      var self=this;
      self.controllerFor(modal).set('model',result);
      return self.render(modal, {
          into: 'application',
          outlet: 'modal'
        });
    },
    tenantpopupModal: function(modal,result,applicants) {
      this.controllerFor(modal).set('model', result);
      this.controllerFor(modal).set('applicant_data', applicants);
      return this.render(modal, {
        into: 'application',
        outlet: 'modal'
      });
    },
    openGroupModal: function(modal,result,applicants) {
      this.controllerFor(modal).set('model', result);
      this.controllerFor(modal).set('applicant_data', applicants);
      return this.render(modal, {
        into: 'application',
        outlet: 'modal'
      });
    },
    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },

    // implemented from:
    // - https://github.com/alexdiliberto/emberconf-2014-demo/
    // - http://alexdiliberto.com/talks/extending-ember-with-analytics/#/4/3
    /**
     This is needed as a global handler for any '_track' simple actions. Since a '_track' action is
     not route-based, we need a handler on the application route to which all other actions can bubble
     up to. This `_trackAppEvent` handler will fire our normal action handling sequence.
    */
    _trackAppEvent: function() {
      if (this.pageHasGa()) {
        analyticsHandler.apply(this, arguments);
      }
    },
    didTransition: function() {
      Ember.run.once(this, function() {
        var ga = Ember.get('ga');
        // analyticsSendHandlers.route(this.router.get('url')); wasn't sure what this was calling exactly (the router function in analyticsSendHandler?). *Mike's a noob*
        ga('send', 'pageview', this.router.get('url'));
      });
    },

    // 404 Redirect
    // via http://pixelhandler.com/posts/how-to-use-404-page-in-your-emberjs-application
    error: function (error) {
      Ember.Logger.error(error);
      this.transitionTo('/not-found');
    }

  } // actions: closing bracket
}); // ApplicationRoute / router.extend closing brackets

export default ApplicationRoute;
