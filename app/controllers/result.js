import Ember from 'ember';
import Paging from 'portola/controllers/mixins/paging';

export default Ember.ObjectController.extend(Paging,{
	actions:{
		openDetailsModal: function(result, applicants) {

			return this.send('openModal', 'new', result, applicants);
		},
		createStarredProperties: function(params){

			var $=Ember.$;
	      	var self=this;
	     	var adapter = this.container.lookup('adapter:application');
	    	self.set("error",null);
	    	var applicant_id=$("#rentalgeek_applicant_id").val();
	      	var offering_id= params.id;
	      	if (applicant_id) {
	      		$.ajax({
	        		type: 'post',
	        		url:adapter.host+'/v2/starred_properties',
	       			data:{'starred_property[applicant_id]':applicant_id,'starred_property[rental_offering_id]':offering_id},
	        		success:function(response){
	        			$('#star-white-'+offering_id).hide();
	         			$('#star-yellow-'+offering_id).show();
	         			console.log(response);
	         			self.set("error", "You have successfully starred");
	         			Bootstrap.NM.push("You have successfully starred", 'success');
	       			},
	       			error: function (response) {
	        			console.log(response.responseJSON.rentalgeek_applicant_id);
	        			self.set("error", "You have already starred");
	      			}

	    		});
	      	}
	      	else{
	      		alert("You need to sign in to star this property");
	      		return false;
	      	}

		},
		deleteStarredProperties: function(params){
			var $=Ember.$;
	      	var self=this;
	     	var adapter = this.container.lookup('adapter:application');
	    	self.set("error",null);
	      var offering_id= params.id;
	     	$.ajax({
        		type: 'post',
        		url:adapter.host+'/v2/starred_properties/remove_star/',
       			data:{'rental_offering_id': offering_id},
        		success:function(response){
        			$('#star-white-'+offering_id).show();
         			$('#star-yellow-'+offering_id).hide();
         			console.log(response);
         			self.set("error", "You have successfully starred");
         			Bootstrap.NM.push("You have successfully starred", 'success');
       			},
       			error: function (response) {
        			console.log(response.responseJSON.rentalgeek_applicant_id);
        			self.set("error", "You have already starred");
      			}

    		});
		}
	}
});
