import Ember from 'ember';
import ModalController from './modal';
var ConfirmationPropertPhotoController;

ConfirmationPropertPhotoController = ModalController.extend({
  actions: {
    confirm: function() {
      alert('OK, it will be done!');
      return this.send('closeModal');
    },
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
        success:function(){
          $('.modal').modal('hide');
          self.set('success',"Save photos Successfully!");
        },
        error: function(data, errorThrown)
          {
              self.set('error',errorThrown);
          }
      });

    }

});
export default ConfirmationPropertPhotoController;
