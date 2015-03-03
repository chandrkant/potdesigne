import Ember from 'ember';
import Landlord from 'portola/mixins/landlord' ;

export default Ember.Route.extend(Landlord,{
	model: function() {
	 return  this.store.find('rental-offering');
  }
});
