import Ember from 'ember';

var fileupload = Ember.ObjectController.extend({
	actions: {
		uploadFile: function(){
	    var $=Ember.$;
			var data= new FormData($('#myForm')[0]);
			var adapter = this.container.lookup('adapter:application');
			$.ajax({
				url: adapter.host+'/application/file_upload',
				type: "POST",
				 processData: false,
				 contentType: false,
				 data: data,
				 success: function(){
				   
				}
			}); 
		}
	}
});

export default fileupload;