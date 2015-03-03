import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
         return Ember.RSVP.hash({
         	groups: this.store.find('roommate-group'),
   	});

   }
});
