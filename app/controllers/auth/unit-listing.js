import Ember from 'ember';

export default Ember.ObjectController.extend({
	
	successMessage: null,
	errorMessage:null,
	importFile:null,
	columns: [

	{ "sTitle": "Address", "mRender":function ( data, type, full){ return "<strong>Address</strong>"+full.rentalComplexFullAddress+"" ;}},
	{ "sTitle": "Bedroom", "mRender":function ( data, type, full){ return "<strong>Bedroom</strong>"+full.bedroomCount+"" ;}},
	{ "sTitle": "Bathroom", "mRender":function ( data, type, full){ return "<strong>Bathroom</strong>"+full.fullBathroomCount+"" ;}},
	{ "sTitle": "Available On", "mRender":function ( data, type, full){ return "<strong>Available On</strong>"+full.earliestAvailableOn+"" ;}},
	{ "sTitle": "Monthly Rent Floor", "mRender":function ( data, type, full){ return "<strong>Monthly Rent Floor</strong>"+full.monthlyRentFloor+"" ;}},
	{ "sTitle": "Rent Ceiling", "mRender":function ( data, type, full){ return "<strong>Rent Ceiling</strong>"+full.monthlyRentCeiling+"" ;}},
	{ "sTitle": "Edit", "mRender":function ( data, type, full ){ return "<a style='cursor:pointer;' class='btn btn-info' id=team_"+full.id+">Edit</a>" ;}}
	],

	actions:{
		addUnit:function(){
			var $=Ember.$;
			var self=this;
			var adapter = this.container.lookup('adapter:application');
			var data= new FormData($('#myForm')[0]);
			$.ajax({
				url: adapter.host+'/v2/rental_complexes',
				type: "POST",
				xhrFields:{withCredentials: true},
				processData: false,
				
				contentType: false,
				data: data,
				success:function(){
					self.set('errorMessage',null);
					self.set('successMessage','Unit add successfully');
					self.set('model',self.store.find('rental-offering'));

				},error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.status);
					self.set('errorMessage',errorThrown);
					console.log(errorThrown);

				}
			});

		},
		exportCsvXls:function(){
			var $=Ember.$;
			var adapter = this.container.lookup('adapter:application');
			$.fileDownload(adapter.host+'/v2/rental_offerings/exportCsv');
			return false;
		},
		uploadFile:function(){
			var $=Ember.$;
			var self=this;
			var data= new FormData($('#fileUpload')[0]);
			var adapter = this.container.lookup('adapter:application');
			$.ajax({
				url: adapter.host+'/application/file_upload',
				type: "POST",
				xhrFields:{withCredentials: true},
				processData: false,
				contentType: false,
				data: data,
				success:function(){
					
					self.set('importFile',"File Import Successfully");
					// self.set('model',self.store.find('rental-offering'));
				}
			}); 

		}
	}
});

