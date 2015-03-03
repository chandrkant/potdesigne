import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(){
      this._super();
      this.store.unloadAll('roommate-group');
   },
   model: function() {
   		return Ember.RSVP.hash({
         	groups: this.store.find('roommate-group'),
   		});
   },
   setupController: function(controller,model){
      var adapter = this.container.lookup('adapter:application');
   	controller.set('model',model);
   	 Ember.$.getJSON(adapter.host+'/v2/roommate_groups/member_groups').then(function(response){
   	 	controller.set('members',response.member_groups);
   	 });
   }
});
