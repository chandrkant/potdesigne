/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var editableImages = pickFiles('bower_components/x-editable/dist/bootstrap3-editable/img', {
   srcDir: '/',
   files: ["clear.png","loading.gif"] ,
   destDir: '/img'
});
var editableFonts = pickFiles('bower_components/slick.js/slick/fonts', {
   srcDir: '/',
   files: ["slick.woff","slick.ttf"] ,
   destDir: 'assets/fonts'
});

var app = new EmberApp({
 // minify only need to specify these for non-dev envs
 /*
 minifyCSS: {
    enabled: true,
    options: {}
  },
  minifyJS: {
    enabled: true
  }
  */  
  fingerprint: {
    enabled: false
  }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
app.import('bower_components/js-base64/base64.js');
app.import('bower_components/lodash/dist/lodash.min.js');
app.import('bower_components/pikaday/css/pikaday.css');
app.import('bower_components/pure/pure-min.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map');
app.import('bower_components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css');
app.import('bower_components/slick.js/slick/slick.css');
app.import('bower_components/quill/dist/quill.snow.css');
app.import('bower_components/ember-widgets/dist/css/ember-widgets.css');
app.import('bower_components/quill/dist/quill.js');
app.import('bower_components/velocity/velocity.min.js');
app.import('bower_components/snap.svg/dist/snap.svg-min.js');
app.import('bower_components/DataTables/media/css/jquery.dataTables.min.css');
app.import('bower_components/DataTables/media/js/jquery.dataTables.min.js');
app.import('bower_components/jquery.fileDownload/src/Scripts/jquery.fileDownload.js');
app.import('bower_components/braintree-web/dist/braintree.js');
app.import('vendor/ui.js');
app.import('vendor/dataTables.jqueryui.min.js');
app.import('vendor/fileinput.js');
app.import('vendor/jquery.simplefileinput.min.js');

// Ember Simple Auth
app.import('bower_components/ember-simple-auth/simple-auth.amd.js');
app.import('bower_components/ember-simple-auth/simple-auth-devise.amd.js');

//ember validations
app.import('bower_components/ember-validations/index.js');
app.import('bower_components/ember-addons.bs_for_ember/dist/js/bs-core.min.js');
app.import('bower_components/ember-addons.bs_for_ember/dist/js/bs-notifications.min.js');
app.import('bower_components/jquery-cookie/jquery.cookie.js');
app.import('bower_components/moment/moment.js');
app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.js');
app.import('bower_components/slick.js/slick/slick.min.js');
//easyForms
app.import('bower_components/ember-easyForm/index.js');
// pikaday date picker
app.import('bower_components/pikaday/pikaday.js');
app.import('bower_components/ember-list-view/list-view.js');
app.import('bower_components/ember-widgets/dist/js/ember-widgets.js');

//Fix for prduction build issue
// http://stackoverflow.com/a/25916762
var handlebars_runtime_index = app.legacyFilesToAppend.indexOf('bower_components/handlebars/handlebars.runtime.js');
if(handlebars_runtime_index) {
app.legacyFilesToAppend[handlebars_runtime_index] = 'bower_components/handlebars/handlebars.js';
}

// module.exports = app.toTree();
//var mergeTrees = require('broccoli-merge-trees');
module.exports = mergeTrees([app.toTree(), editableImages, editableFonts]);

