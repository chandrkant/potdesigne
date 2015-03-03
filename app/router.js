import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

	this.resource('result', {path: '/result/:city'});
	this.route('fileupload');
	this.route('login');
	this.route('sign-up' ,{path: "/sign_up"});
  this.route('application');
  
  this.route('protected');
  this.route('extra-info' ,{path: "/extra_info"});
	this.route('tenant-form' ,{path: "/tenant_form"});
	this.resource('search-map', {path: '/search_map/:city'});
	this.route('pricing');
  this.route('password_reset');
  this.route("password_change", {path: 'password_change/:reset_password_token'});
  this.resource('co-signers',function(){
    this.route('co_sign_property', {path: "/:id/co_sign_property/:app_id"});
  });
  this.resource('auth', { path: "/auth" }, function () {
    this.route('payment');
    this.resource('roommate-groups',function(){
  		this.route('index');
  		this.route('show', {path: "/:id/show"});
  	});
  	this.resource('invitations',function(){
  		this.route('index');
  	});
  	this.resource('transactions',function(){
  		this.route('index');
  	});
    this.resource('applicants',function(){
      this.route('edit', {path: "/:id/edit"});
      this.route('edit_password', {path: "/:id/edit_password"});
      this.route('extra_info', {path: "/:id/extra_info"});
      this.route('landlord', {path: "/:id/landlord"});
    });
    this.resource('applies',function(){
      this.route('index');
    });
    this.resource('starred-properties',function(){
      this.route('index');
    });
    this.resource('rental-offerings',function(){
      this.route('index');
      this.route('new');
      this.route('show', {path: "/:id/show"});
      this.route('edit', {path: "/:id/edit"});
      this.route('applicants', {path: "/:id/applicants"});
    });
    this.resource('rental-complexes',function(){
      this.route('index');
      this.route('new');
      this.route('show', {path: "/:id/show"});
      this.route('edit', {path: "/:id/edit"});
    });
    this.resource('co-signers',function(){
      this.route('new');
    });
    this.resource('attachments',function(){
      this.route('index');
    });
  });
  this.route('not-found', { path: '/*path' });
}); // router map end

export default Router;
