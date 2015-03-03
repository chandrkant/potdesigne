import Ember from 'ember';


export default Ember.ObjectController.extend({
	actions:{
		create: function() {

			var $=Ember.$;
			var self=this;
			var data= $('.r_g_name').val();
			var message = "";
			self.set('errorMessage',null);
      self.set('successMessage',null);
      var applicant_id = self.session.get('currentApplicant.id');
			var adapter = this.container.lookup('adapter:application');
			$.ajax({
				url: adapter.host+'/v2/roommate_groups',
				type: "POST",
				data: {'roommate_group[name]' : data,
					   'roommate_group[applicant_id]' : applicant_id
					  },
				success:function(){
					$('.r_g_name').val("");
					message="Roommate Group has been created successfully.";
          self.set('successMessage',message);
					return Ember.RSVP.hash({
						groups: self.store.find('roommate-group'),
					});
				},
        error:function(data){
          message=data.error;
          self.set('errorMessage',message);
        }
			});

		},
		left_group: function(params) {
			var $=Ember.$;
			var self=this;
			var message = "";
			self.set('errorMessage',null);
            self.set('successMessage',null);
            var data = params;
			var adapter = this.container.lookup('adapter:application');
			$.ajax({
				url: adapter.host+'/v2/roommate_groups/left_group',
				type: "POST",
				data: {'roommate_group_id' : data},
				success:function(data){
					if (data){
						message="You left the Group successfully.";
                		self.set('successMessage',message);
                		self.set('members',data.member_groups);

					}else{
						message=data.error;
						self.set('errorMessage',message);
					}
				}
			});

		}
	}
});
