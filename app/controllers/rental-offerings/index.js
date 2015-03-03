import Ember from 'ember';
import Paging from 'portola/controllers/mixins/paging';
  function downloadCsv(options,self){
   var adapter = self.container.lookup('adapter:application');
   var base_url=adapter.host+"/v2/rental_offerings/exportCsv?user_token="+options.user_token+"&user_email="+options.user_email+"";
   Ember.$.fileDownload(base_url);
  }
export default Ember.ObjectController.extend(Paging,{

  actions:{
    openDetailsModal: function() {
      return this.send('openModalAttachment', 'attachment');
    },
    addUnit:function(){
      var $=Ember.$;
      var self=this;
      var adapter = this.container.lookup('adapter:application');
      var data= new FormData($('#myForm')[0]);
      $.ajax({
          url: adapter.host+'/v2/rental_complexes/create_property',
          type: "POST",
          xhrFields:{withCredentials: true},
          processData: false,
          contentType: false,
          data: data,
          success:function(){
          self.set('errorMessage',null);
          self.set('successMessage','Unit add successfully');
          },error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.status);
          self.set('errorMessage',errorThrown);
          console.log(errorThrown);
          }
      });
    },
    uploadFile:function(){
      var $=Ember.$;
      var self=this;
      self.store.adapterFor('application').reopen({
          namespace: 'v2/landlord'
       });
      var data= new FormData($('#fileUpload')[0]);
      var adapter = this.container.lookup('adapter:application');
      $.ajax({
          url: adapter.host+'/v2/landlord/rental_offerings/upload_csv_file',
          type: "POST",
          xhrFields:{withCredentials: true},
          processData: false,
          contentType: false,
          data: data,
          success:function(data){
          $('#fileInput').val(null);
           self.store.find('rental-offering').then(function(model){
            self.set('model',model);
            self.set('successMessage',"File Import Successfully");
            self.store.adapterFor('application').reopen({
               namespace: 'v2'
             });
           });
          },error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR.status);
              self.set('errorMessage',errorThrown);
              console.log(errorThrown);
          }
      });
    },
    exportCsvXls:function(){
      var self=this;
      var user_email=Base64.encode(self.session.get('email'));
      var user_token=Base64.encode(self.session.get('token'));
      var options = {
        "user_token": user_token,
        "user_email": user_email
      };
      downloadCsv(options,self);
      return false;
    },
    deleteRecord: function (record) {
      if (confirm("Are you sure?")) {
        record.destroyRecord().then(function() {
          }, function(error) {
             // todo better error handler, show message to user...
             console.error(error);
          });
      }
    },
  }
});
