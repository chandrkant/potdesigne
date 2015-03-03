import Ember from 'ember';

export default Ember.ObjectController.extend({
  property_type: ["Apartment", "Duplex", "House", "Townhouse"],
  cleanupAndContinue: function () {
    if (this.get("model")) {
      this.get("model").deleteRecord();
      this.store.dematerializeRecord(this.get("model")) ;
    }
    this.transitionToRoute("rental-offerings.index");
  },
  actions:{
    submit: function(rentalOffering) {
      var self = this;
      rentalOffering.save().then(function () {
        self.transitionToRoute("rental-offerings.index");
      });
    },
    uploadFile:function(){
      var $=Ember.$;
      var self=this;
      var data= new FormData($('#myForm')[0]);
      var adapter = this.container.lookup('adapter:application');

      $.ajax({
        url: adapter.host+'/v2/property_photos/uplode_property_photo',
        type: "POST",
        xhrFields:{withCredentials: true},
        processData: false,
        contentType: false,
        data: data,
        success:function(photos){
          $('#photo').val('');
          self.set('success',"Save photos Successfully!");
           self.set('photos', photos.property_photos);
        },
        error: function(data, errorThrown)
          {
              self.set('error',errorThrown);
          }
      });

    },
    removePhoto: function(id){
    var $=Ember.$;
      var self=this;
      var adapter = this.container.lookup('adapter:application');
      $.ajax({
        url: adapter.host+'/v2/property_photos/delete_property_photo',
        type: "POST",
        xhrFields:{withCredentials: true},
        data: {'id': id},
        success:function(photos){
          // Bootstrap.NM.push("Remove photos  Successfully!.", 'success');
          self.set('success',"Remove photos  Successfully!");
          self.set('photos', photos.property_photos);
        },
        error: function(data, errorThrown)
          {
              self.set('error',errorThrown);
          }
      });
    },
    cancel: function () {
      this.transitionToRoute('rental-offerings.index');
    }
  }
});
