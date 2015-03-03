import Ember from 'ember';

export default Ember.ObjectController.extend({
  model:{},
  actions:{
    tenantModal: function(profile_id) {
      var profile = this.store.find('profile', profile_id);
      return this.send('tenantpopupModal', 'rental-offerings/tenant', profile);
    },
    approve: function (apply_id) {
      var adapter = this.container.lookup('adapter:application');
      Ember.$.ajax({
        url: adapter.host+'/v2/applies/'+apply_id+'/approve',
        type: "POST",
        success:function(){
          Ember.$('#approve_button_'+apply_id).removeClass('hide');
          Ember.$('#disapprove_button_'+apply_id).removeClass('hide');
          Ember.$('#approve_deny_'+apply_id).addClass('hide');
        }
      });
    },
      disapprove: function (apply_id) {
      var self=this;
      var adapter = self.container.lookup('adapter:application');
      Ember.$.ajax({
        url: adapter.host+'/v2/applies/'+apply_id+'/dis_approve',
        type: "POST",
        success:function(){
          Ember.$('#approve_button_'+apply_id).addClass('hide');
          Ember.$('#disapprove_button_'+apply_id).addClass('hide');
          Ember.$('#approve_deny_'+apply_id).removeClass('hide');
        }
      });
    },
    deny: function (apply_id) {
      var adapter = this.container.lookup('adapter:application');
      Ember.$.ajax({
        url: adapter.host+'/v2/applies/'+apply_id+'/deny',
        type: "POST",
        success:function(){
          Ember.$('#denied_button_'+apply_id).removeClass('hide');
          Ember.$('#approve_deny_'+apply_id).addClass('hide');
        }
      });
    },
    sendAgreement: function (id) {
      var data = Ember.$('select#'+id).val();
      var adapter = this.container.lookup('adapter:application');
      Ember.$.ajax({
        url: adapter.host+'/v2/applies/'+id+'/send_agreement',
        type: "POST",
        data: {"[attachment_id]": data},
        success:function(){
        }
      });
    },
    tenantScreening: function (id) {
      var self = this;
      var data = Ember.$('.hiddenId').val();
      var adapter = this.container.lookup('adapter:application');
      Ember.$.ajax({
        url: adapter.host+'/v2/applicants/'+id+'/background_screening',
        type: "POST",
        data: {"[rental_offering_id]": data},
        success:function(response){
          self.set('model.applies',response.applicants);
        },
        error: function(){
          
        }

      });
    }
  }
});
