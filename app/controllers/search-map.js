import Ember from 'ember';
import Paging from 'portola/controllers/mixins/paging';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.ObjectController.extend(Paging,RouteMixin,{
  mapView:true,
  gridView:false,
	needs: ['index','application'],
  locations: ['Manhattan, KS','Lawrence, KS'],
	actions:{
		search: function(){
			var self = this;
			var $=Ember.$;
			var location = self.get('location');
			var minPrice = self.get('minPrice');
			var maxPrice = self.get('maxPrice');
			var bedroom  = $("#bed").val();
			var search= {};
			search["location"]=location;
			search["minPrice"]=minPrice;
			search["maxPrice"]=maxPrice;
			search["bedroom"]=$.trim(bedroom);
			search["sort"]=$("#sort").val();
			self.store.unloadAll('rental-offering');
      self.store.find('rental-offering',{search:search}).then(function(data){
        data.set("location",location);
        data.set("minPrice",minPrice);
        data.set("maxPrice",maxPrice);
        data.set("bedroom",bedroom);
        self.set("model.rentalOffering",data);
      });
			self.findPaged('rental-offering',{search:search}).then(function(data){
        self.set("model.rentalOfferingPage",data);
			});
		},
    openDetailsModal: function(result, applicants) {
      return this.send('openModal', 'new', result, applicants);
    },
      createStarredProperties: function(params){
      var $=Ember.$;
          var self=this;
        var adapter = this.container.lookup('adapter:application');
        self.set("error",null);
        var applicant_id = self.session.get('applicant').id;
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
    },
		sort:function(params){
			var self =this;
			var $ = Ember.$;
			var location = $("#location").val();
			var minPrice = $("#minPrice").val();
			var maxPrice = $("#maxPrice").val();
			var bedroom  = self.get('bedroom');
			var search= {};
			search["location"] = location;
			search["minPrice"] = minPrice;
			search["maxPrice"] = maxPrice;
			search["bedroom"]  = $.trim(bedroom);
			if(params==="list"){
				search["sort"]=$("#sort").val();
			}
			else if(params==="grid"){
				search["sort"]=$("#gsort").val();
			}
			self.store.unloadAll('rental-offering');
			self.findPaged('rental-offering',{search:search}).then(function(data){
				data.set("location",location);
				data.set("minPrice",minPrice);
				data.set("maxPrice",maxPrice);
				data.set("bedroom",bedroom);
				self.set("model.rentalOfferingPage",data);
        self.set("model.rentalOffering",data);
			});
		},
    mapViewClick :function(){
     var self=this;
     self.set('mapView',true);
     self.set('gridView',false);
    },
    gridViewClick :function(){
     var self=this;
     // self.set('gridView',true);
     self.set('mapView',false);

    }
	}
});
