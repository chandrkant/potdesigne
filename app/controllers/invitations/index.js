import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions:{
		accept: function(params) {
			var $=Ember.$;
			var self=this;
			var message = "";
			self.set('errorMessage',null);
            self.set('successMessage',null);
            var adapter = this.container.lookup('adapter:application');
			$.ajax({
				url: adapter.host+'/v2/invitations/'+params+'/accept',
				type: "POST",

				success:function(data){
					if (data){
						message="Invitation Accepted Successfully.";
                		self.set('successMessage',message);
						self.set('model',data.invitations) ;
					}else{
						message=data.error;
						self.set('errorMessage',message);
					}
				}
			});

		},
		deny: function(params){
			var $=Ember.$;
			var self=this;
			var message = "";
			self.set('errorMessage',null);
            self.set('successMessage',null);
            var adapter = this.container.lookup('adapter:application');
			$.ajax({
				url: adapter.host+'/v2/invitations/'+params+'/deny',
				type: "POST",

				success:function(data){
					if (data){
						message="Rejected Successfully";
                		self.set('successMessage',message);
                		self.set('model',data.invitations) ;

					}else{
						message=data.error;
						self.set('errorMessage',message);
					}
				}
			});
		}
	}
});
