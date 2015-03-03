/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'portola',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      GOOGL_CLIENT_ID: process.env.GOOGL_CLIENT_ID,
      FACEBOOK_APPID: process.env.FACEBOOK_APPID,
      LINKEDIN_API_KEY: process.env.LINKEDIN_API_KEY,
      GOOGL_CLIENT_SCOPE:'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read',
      COOKIEPOLICY: 'single_host_origin',
      GOOGLE_USER_USERINFO_URL: "https://www.googleapis.com/oauth2/v1/userinfo?access_token=",
      FACEBOOK_API_VERSION:'v2',

      NAMESPACE: 'v2',
      LOGIN_URI: 'applicants/sign_in',
      REGISTER_URI: '/applicants',
      HOST: '',
      environment: environment
    },
    'simple-auth': {
        authorizer: 'simple-auth-authorizer:devise'
    },
  };

    // CSP settings, see http://www.ember-cli.com/#content-security-policy
    // * wildcard in script-src is temporary for development
  ENV.contentSecurityPolicy = {
    'default-src': "'self' http://static.ak.facebook.com https://s-static.ak.facebook.com https://www.facebook.com https://accounts.google.com",
    'script-src': "'self' 'unsafe-inline' 'unsafe-eval' * http://cdn.jsdelivr.net https://js.braintreegateway.com https://connect.facebook.net http://maps.gstatic.com https://apis.google.com http://www.google-analytics.com http://maps.googleapis.com https://api.airbrake.io", // Allow scripts
    'font-src': "'self' http://fonts.gstatic.com https://fonts.gstatic.com http://fonts.googleapis.com http://netdna.bootstrapcdn.com", // Allow fonts to be loaded from http://fonts.gstatic.com
    'connect-src': "'self' http://0.0.0.0:4200 https://fonda.herokuapp.com", // Allow data (ajax/websocket) example: custom-api.local
    'img-src': "'self' http://0.0.0.0:4200 http://www.google-analytics.com https://rentalgeek.storage.googleapis.com https://7ac5404ad192a2f9f3d03e17b7b0386e8c99b853.googledrive.com https://mts0.googleapis.com https://mts1.googleapis.com https://maps.googleapis.com https://csi.gstatic.com https://maps.gstatic.com https://cache.addthiscdn.com http://maps.google.com",
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com http://netdna.bootstrapcdn.com https://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
    'media-src': "'self'",
    'report-uri': "/csp-report" // see "report-uri" on http://content-security-policy.com
  }

  if (environment === 'development') {
    ENV.APP.FACEBOOK_APPID = process.env.FACEBOOK_DEV_APPID;
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.HOST = '/';

    ENV.GOOGLE_MAPS_API_KEY_QUERY_PARAM = '&key=AIzaSyCfTbY75eMKiHJbcR7lGzNwGlhw6uhwPw0';
    ENV['simple-auth']['store'] = 'simple-auth-session-store:local-storage';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV['simple-auth']['store'] = 'simple-auth-session-store:ephemeral';

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    /*
    ENV.APP.GOOGL_CLIENT_ID = ENV['GOOGL_CLIENT_ID'];
    ENV.APP.FACEBOOK_APPID = ENV['FACEBOOK_APPID'];
    ENV.APP.LINKEDIN_API_KEY = ENV['LINKEDIN_API_KEY'];
    */
    ENV.APP.AIRBRAKE_ID = process.env.AIRBRAKE_ID;
    ENV.APP.AIRBRAKE_KEY = process.env.AIRBRAKE_KEY;

    ENV['simple-auth']['store'] = 'simple-auth-session-store:local-storage';

    ENV.GOOGLE_MAPS_API_KEY_QUERY_PARAM = '&key=AIzaSyCfTbY75eMKiHJbcR7lGzNwGlhw6uhwPw0';
  }

  ENV['simple-auth-devise'] = {
    resourceName: 'applicant',
    tokenAttributeName: 'token',
    identificationAttributeName: 'email',
    serverTokenEndpoint: 'http://0.0.0.0:8080/applicants/sign_in'
  };
  ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:devise',
    crossOriginWhitelist: ['http://0.0.0.0:8080/']
  };

  ENV.APP['REGISTER_ENDPOINT'] = 'http://0.0.0.0:8080/applicants';

  return ENV;
};
