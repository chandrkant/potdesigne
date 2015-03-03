import Ember from "ember";
import Landlord from 'portola/mixins/landlord' ;
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';


export default Ember.Route.extend(Landlord, RouteMixin,{
  beforeModel: function(){
  	Ember.$('.navbar-toggle').click();
    this._super();
    this.store.unloadAll('rental-complex');
  },
    model: function(params) {
      return this.findPaged('rental-complex',params);
    }
});
