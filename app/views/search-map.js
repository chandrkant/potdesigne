import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement  : function(){

    var jQuery = Ember.$;
	  jQuery('.header-nav').addClass('map-header');
      jQuery(".ember-view").addClass("search-map-page");
      jQuery('.filter-title').click(function() {
        jQuery('.search-filter').toggleClass('highlight-form');
      });
      jQuery('.bedroom-options button').click(function() {
        jQuery(this).toggleClass('highlight');
      });
      jQuery('.pet-options button').click(function() {
        jQuery(this).toggleClass('highlight');
      });
      jQuery('#bmap,#lmap,#gmap').click(function() {
        jQuery('#map').show();
        jQuery('#list').hide();
        jQuery('#grid').hide();
		jQuery('.header-nav').addClass('map-header');
      });
      jQuery('#blist,#llist,#glist').click(function() {
        jQuery('#list').show();
        jQuery('#map').hide();
        jQuery('#grid').hide();
		jQuery('.header-nav').removeClass('map-header');
      });
      jQuery('#bgrid,#lgrid,#ggrid').click(function() {
        jQuery('#grid').show();
        jQuery('#map').hide();
        jQuery('#list').hide();
		jQuery('.header-nav').removeClass('map-header');
      });
      jQuery('#msearch,#search').click(function(){
          var bedroom="";
        var one = jQuery("#1").hasClass("button-xlarge pure-button highlight");
      var two = jQuery("#2").hasClass("button-xlarge pure-button highlight");
      var three = jQuery("#3").hasClass("button-xlarge pure-button highlight");
      var four = jQuery("#4").hasClass("button-xlarge pure-button highlight");
      if(one){
        bedroom += '1';
      }
      if(two){
        bedroom += ' 2';
      }
      if(three){
        bedroom += ' 3';
      }
      if(four){
        bedroom += ' 4';
      }
      jQuery('#bed').val(bedroom);
      });
      jQuery('#sort').change(function(){
        var val = jQuery(this).val();
        jQuery("#gsort option:selected").attr("selected",null);
        jQuery("#gsort option[value='"+val+"']").attr("selected",true);
      });
      jQuery('#gsort').change(function(){
        var val1 = jQuery(this).val();
        jQuery("#sort option:selected").attr("selected",null);
        jQuery("#sort option[value='"+val1+"']").attr("selected",true);
      });

      if(typeof this.controller.model.bedroom!=="undefined")
      {
        var bed = jQuery.trim(this.controller.model.bedroom);
        bed = bed.split(' ');
        jQuery.each( bed, function( i, val ) {
        jQuery( "#" + val ).toggleClass('highlight');
      });
      }
    this._super();
    var self = this;


    jQuery(document).ajaxStop(function(){
      var google=Ember.get('google');
      var latlng;
      if(jQuery('select').val()=== 'Lawrence, KS')
      {
        latlng = new google.maps.LatLng(38.9717, -95.2353);
      }
      else
      {
        latlng = new google.maps.LatLng(39.197668, -96.585295);
      }

      var mapOptions = {
        center: latlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      if (jQuery("#map-canvas").length > 0){
        var map =  new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      }
      var data = self.get('controller.model.rentalOffering.content');

      data.forEach(function(item){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(item._data.rentalComplexLatitude, item._data.rentalComplexLongitude),
          map: map,
          icon: "//maps.google.com/mapfiles/ms/icons/blue-dot.png",
          title: "complex " + item.id,
        });
        google.maps.event.addDomListener(marker, 'click', function() {
          self.openDetailsModal(item,item.applicants);
        });
      });
    });
  },
  willClearRender: function(){
    Ember.$(".ember-view").removeClass("search-map-page");
  },
  openDetailsModal: function(result, applicants) {
      var controller= this.container.lookup("controller:application");
      return controller.send('openModal', 'new', result, applicants);
    }
});
