import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement  : function(){
   	this._super();
   	var google=Ember.get('google');
  	var mapOptions = {
    	center: new google.maps.LatLng(39.197668, -96.585295),
    	zoom: 14,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map =  new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    //return map

    var data = this.get('controller.model.content');
    var content = '';
  	data.forEach(function(item){
  	  // debugger
	    var marker = new google.maps.Marker({

  	    position: new google.maps.LatLng(item._data.rentalComplexLatitude, item._data.rentalComplexLongitude),
  	    map: map,
  	    icon: "//maps.google.com/mapfiles/ms/icons/blue-dot.png",
  	    title: "Property " + item.id,
		  });
		  if(item){
      			 content = '<div class="info-window-content">'+
							'<div class="address">'+
								'<a href='+item._data.url+' target="_newtab">'+item._data.rentalComplexStreetName+'</a>'+
							'</div>'+

							'<div class="bedrooms-bathrooms">'+
								'<div class="rental-offering-attribute">'+item._data.bedroomCount+'</div>'+
							   	'<div class="rental-offering-attribute-name">'+"BED"+'</div>'+

							   	'<div class="rental-offering-attribute">'+item._data.fullBathroomCount+'</div>'+
							   	'<div class="rental-offering-attribute-name">bath</div>'+
							'</div>'+
						'</div>';
  		}
  		else{
			 content = '';
  		}
	   var infowindow = new google.maps.InfoWindow({
	      content:  content,
  	  });

  	  google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map,marker);
	  });
	});
}
});
