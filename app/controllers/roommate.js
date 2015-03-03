import Ember from 'ember';
import ModalController from './modal';
var ConfirmationRoommateController;

ConfirmationRoommateController = ModalController.extend({
  applicant_data : null,
  actions: {
    confirm: function() {
      alert('OK, it will be done!');
      return this.send('closeModal');
    },
    share: function(){
      var $=Ember.$;
      $('.close').click();
      this.transitionToRoute("roommate-groups.index");
    },
    apply:function(){
      var $=Ember.$;
      var self=this;
      var params = self.get('roommate_group_list');
      var adapter = this.container.lookup('adapter:application');
      self.set("error",null);
      var applicant_id=$("#rentalgeek_applicant_id").val();
      var offering_id=$("#rentalgeek_rental_offering_id").val();
      this.store.find('applicant', applicant_id).then(function(data){
        if (data._data.profile && data._data.payment){
          $.ajax({
            type: 'post',
            url:adapter.host+'/v2/roommate_groups/apply_roommates',
            data:{'apply[roommate_groups]':params,'apply[rental_offering_id]':offering_id},
            success:function(){
              $('.alert-error').hide();
              $('.alert-success').show().html("You have successfully applied");
            },
            error: function () {
              $('.alert-success').hide();
              $('.alert-error').show().html("You are already applied");
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
    }
  }
});

export default ConfirmationRoommateController;
