import Ember from 'ember';
import ModalController from './modal';
var ConfirmationNewController;

ConfirmationNewController = ModalController.extend({
  applicant_data : null,
  actions: {
    confirm: function() {
      alert('OK, it will be done!');
      return this.send('closeModal');
    },
    openRoommateModal: function(id){
      var self = this;
      var $=Ember.$;
      if (self.session.isAuthenticated){
        if(self.session.get('applicant').profile_id && self.session.get('applicant').payment){
          var adapter = this.container.lookup('adapter:application');
          $('.close').click();
          $.ajax({
            type: 'get',
            url:adapter.host+'/v2/roommate_groups',
            data:{},
            success:function(result){
              return self.send('openGroupModal', 'roommate', result, id);
            },
            error: function () {
              self.set("error", "There is error on roommate group");
            }
          });
        }else{
          if(!self.session.get('applicant').profile_id){
            var x = window.confirm("You need to finish your Tenant form before applying");
            if (x){
              Ember.$('.close').click();
              self.transitionToRoute('applicants.extra_info', self.session.get('applicant').id);
            }
          }else{
            var y = window.confirm("You need to pay registration charge");
            if (y){
              Ember.$('.close').click();
              self.transitionToRoute('auth.payment');
            }
          }
        }
      }
      else{
        var z = window.confirm("You need to login first");
        if(z){
          Ember.$('.close').click();
          self.transitionToRoute('login');
        }
      }
    },
    apply:function(){
      var $=Ember.$;
      var self=this;
      if (self.session.isAuthenticated){
        var adapter = this.container.lookup('adapter:application');
        self.set("error",null);
        self.set("success",null);
        var applicant_id=$("#rentalgeek_applicant_id").val();
        var offering_id=$("#rentalgeek_rental_offering_id").val();
        this.store.find('applicant', applicant_id).then(function(data){
          if (data._data.profile && data._data.payment){
            $.ajax({
              type: 'post',
              url:adapter.host+'/v2/applies',
              data:{'apply[applicable_id]':applicant_id,'apply[rental_offering_id]':offering_id,
                    'apply[applicable_type]': 'Applicant'},
              success:function(){
               self.set("success", "You have successfully applied");
               Bootstrap.NM.push("You have successfully applied", 'success');
              },
              error: function () {
                self.set("error", "You are already applied");
              }
            });
          }else{
            if(!data._data.profile){
              var x = window.confirm("You need to finish your Tenant form before applying");
              if (x){
                Ember.$('.close').click();
                self.transitionToRoute('applicants.extra_info', data.id);
              }
            }else{
              var y = window.confirm("You need to pay registration charge");
              if (y){
                Ember.$('.close').click();
                self.transitionToRoute('auth.payment');
              }
            }
          }
        });
      }else{
        var x = window.confirm("You need to login first");
        if(x){
          Ember.$('.close').click();
          self.transitionToRoute('login');
        }
      }
    },
    createStarredProperties: function(){
      var $=Ember.$;
      var self=this;
      var adapter = this.container.lookup('adapter:application');
      self.set("error",null);
      var applicant_id=$("#rentalgeek_applicant_id").val();
      var offering_id= $("#rentalgeek_rental_offering_id").val();
      if (applicant_id) {
        $.ajax({
          type: 'post',
          url:adapter.host+'/v2/starred_properties',
          data:{'starred_property[applicant_id]':applicant_id,'starred_property[rental_offering_id]':offering_id},
          success:function(){
            $('#star-white-'+offering_id).hide();
            $('#star-yellow-'+offering_id).show();
            $('#star-white1-'+offering_id).hide();
            $('#star-yellow1-'+offering_id).show();
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
    deleteStarredProperties: function(){
      var $=Ember.$;
          var self=this;
        var adapter = this.container.lookup('adapter:application');
        self.set("error",null);
        var offering_id= $("#rentalgeek_rental_offering_id").val();
        $.ajax({
            type: 'post',
            url:adapter.host+'/v2/starred_properties/remove_star/',
            data:{'rental_offering_id': offering_id},
            success:function(){
              $('#star-white-'+offering_id).show();
              $('#star-yellow-'+offering_id).hide();
               $('#star-white1-'+offering_id).show();
              $('#star-yellow1-'+offering_id).hide();
            },
            error: function (response) {
              console.log(response.responseJSON.rentalgeek_applicant_id);
              self.set("error", "You have successfully un-starred");
            }

        });
    }
  }
});

export default ConfirmationNewController;
