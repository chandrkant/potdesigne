import Ember from 'ember';
import initializeSession from 'portola/utils/utility-authentication';

export default {
    name: 'authentication',
    after: 'simple-auth',
    initialize: function(container) {
        var applicationRoute = container.lookup('router:main');
        var session = container.lookup('simple-auth-session:main');
        // handle the session events
        session.on('sessionAuthenticationSucceeded', function() {
          var content_clone = JSON.parse(JSON.stringify(session.content));
          initializeSession(container, session, content_clone, 'application');
        });
        session.on('sessionAuthenticationFailed', function() {
          Ember.Logger.debug('Session authentication failed!');
          applicationRoute.transitionTo('login');
        });
        session.on('sessionInvalidationSucceeded', function() {
          Ember.Logger.debug('Session invalidate succeeded!');

          //Clear all ember data
          var store = container.lookup("store:main");
          store.clear();

          //Clear auth data
          session.clear();

          session.store.cookieExpirationTime = "Thu, 01-Jan-1970 00:00:01 GMT";

          applicationRoute.transitionTo('login');
        });
        session.on('sessionInvalidationFailed', function() {
          applicationRoute.transitionTo('login');
        });


    }
};
