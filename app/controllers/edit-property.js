import Ember from 'ember';

export default Ember.ObjectController.extend({
	updatSuccess:null,
	errorMessage:null,
	actions:{
		updateUnit:function(){
			var $=Ember.$;
			var self=this;
			var data= new FormData($('#myForm1')[0]);
			var adapter = this.container.lookup('adapter:application');
			$.ajax({
				url: adapter.host+'/application/update_rental',
				type: 'put',
				processData: false,
				contentType: false,
				data:data,
				success:function(){
					self.set('updatSuccess','Update successfully');	
				},error: function(jqXHR, textStatus, errorThrown) {
					self.set('errorMessage',errorThrown);
				}
			});

		},
		editPhoto:function(photo_id){
			var $=Ember.$;
			var self=this;
			
			var formID="photoEdit_"+photo_id;
			var data= new FormData($('#'+formID)[0]);
			
			var adapter = this.container.lookup('adapter:application');
			$.ajax({
				url: adapter.host+'/application/update_property_photo',
				type: 'post',
				data:data,
				processData: false,
				contentType: false,
				success:function(){
					self.set('updatSuccess', 'Update successfully');
				},error: function(jqXHR, textStatus, errorThrown) {
					self.set('errorMessage',errorThrown);
				}
			});
		},
		deletePhoto:function(photo_id){
			var $=Ember.$;
			var self=this;
			var adapter = this.container.lookup('adapter:application');
			$.ajax({
				url: adapter.host+'/application/delete_property_photo',
				type: 'delete',
				data:{'property_photo[id]':photo_id},
				success:function(){
					self.set('updatSuccess', 'Update successfully');
				},error: function(jqXHR, textStatus, errorThrown) {
					self.set('errorMessage',errorThrown);
				}
			});
		},
		addPhoto:function(){
			var $=Ember.$;
			var self=this;
			var adapter = this.container.lookup('adapter:application');
			var data= new FormData($('#myForm2')[0]);
			console.log(data);
			$.ajax({
				url:adapter.host+'/application/uplode_property_photo',
				type:'put',
				data:data,
				processData: false,
				contentType: false,
				
				success:function(){
					self.set('updatSuccess', 'Update successfully');
				},error: function(jqXHR, textStatus, errorThrown) {
					self.set('errorMessage',errorThrown);
				}
			});
		}
	}
});

