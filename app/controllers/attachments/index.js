import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions:{
    uploadFile: function() {
      var $=Ember.$;
      var self=this;
      var message = "";
      self.set('errorMessage',null);
      self.set('successMessage',null);
      var adapter = this.container.lookup('adapter:application');
      var data= new FormData($('#fileUpload')[0]);
      $.ajax({
        url: adapter.host+'/v2/attachments/',
        type: "POST",
        data:data,
        processData: false,
        contentType: false,

        success:function(data){
          if (data){
            self.store.find('attachment').then(function(attachments){
              self.set('model',attachments);
            });
            message="Uploaded Successfully.";
            self.set('successMessage',message);
          }else{
            message=data.error;
            self.set('errorMessage',message);
          }
        }
      });

    }
  }
});
