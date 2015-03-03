import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

Ember.Handlebars.helper('bedroomCountLegend', function(value) {
  if(value > 0) {
    value = 'bed';
  } else {
    value = 'dio';
  }
  return new Ember.Handlebars.SafeString(value);
});

Ember.Handlebars.helper('bedroomCountValue', function(value) {
 if(value > 0) {
     value = value;
  } else {
    value = 'stu';
  }
  return new Ember.Handlebars.SafeString(value);
});

Ember.Handlebars.helper('bathroomCountValue', function(full_bathroom, half_bathroom) {
    var value;
 if(half_bathroom === 0) {
    value = full_bathroom;
  } else {
    value = full_bathroom + ".5";
  }
  return new Ember.Handlebars.SafeString(value);
});

Ember.Handlebars.helper('monthlyRentLegend', function(monthly_rent_floor, monthly_rent_ceiling) {
    var value;
 if(monthly_rent_floor === monthly_rent_ceiling) {
    value = "rent";
  } else {
    value = "from";
  }
  return new Ember.Handlebars.SafeString(value);
});

Ember.Handlebars.helper('ternary', function(value) {
 if(value) {
    value = "Yes";
  } else {
    value = "No";
  }
  return new Ember.Handlebars.SafeString(value);
});

Ember.Handlebars.helper('formatDate', function(value) {
 var moment=Ember.get('moment');
 value = moment(value).format('YYYY-MM-DD');
  return new Ember.Handlebars.SafeString(value);
});

Ember.Handlebars.registerBoundHelper('increment', function(integer) {
    return integer + 1;
});

Ember.Handlebars.helper('debug', function(the_string){
  Ember.Logger.log(the_string);
  // or simply
  console.log(the_string);
});

Ember.Handlebars.helper('map_url', function(the_string){
  var value = the_string.replace(/ /g,"+");
  var url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAgAatMC6kw9fTLotb2-IiMvsvA66dIBSE&zoom=15&q="+value;
  return url;
});

Ember.Handlebars.helper('nearbyPlace', function(value){
  value = value.split(",");
  var data = "";
  if (value.length === 1 && value[0] === ""){
    return new Ember.Handlebars.SafeString(data);
  }
  for (var i = 0; i < value.length; i++) {
    data = data+'<li>'+value[i]+'</li>';
    //Do something
  }
  return new Ember.Handlebars.SafeString(data);
});

// Airbrake errors from http://stackoverflow.com/questions/21385752/setting-up-airbrake-on-an-ember-application?answertab=votes#tab-top
// Not sure if this is the best place for this? ~Mike
/*
if (config.environment !== "development"){
  var Airbrake = Ember.get('Airbrake');
  Airbrake.setProject(config.APP.AIRBRAKE_ID, config.APP.AIRBRAKE_KEY);
  Ember.onerror = function(err) { // any ember error
    Airbrake.push(err);
    //any other error handling
  };
  window.onerror = function(err){ // window general errors.
    Airbrake.push(err);
       //generic error handling that might not be Airbrake related.
  };
} // end Airbrake
*/

loadInitializers(App, config.modulePrefix);

export default App;

