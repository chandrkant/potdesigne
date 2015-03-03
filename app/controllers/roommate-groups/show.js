import Ember from 'ember';
export default Ember.ObjectController.extend({
	actions:{
		invite: function(params) {
			var $=Ember.$;
			var self=this;
			var msg = $('#ql-editor-1').html();
			var data= $('.roommate_emails').val();
      var message = "";
      self.set('errorMessage',null);
      self.set('successMessage',null);
      var flag=0;
      var res = data.split(",");
      var regex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
      for(var i=0;i<res.length;i++)
      {
        if(regex.test($.trim(res[i])))
          {flag=1;}
        else
          {flag=0;break;}
      }
      if(flag===1)
      {
        var adapter = this.container.lookup('adapter:application');
        $.ajax({
          url: adapter.host+'/v2/roommate_groups/'+params+'/invite_roommates',
          type: "POST",
          data: {
            'roommate_group[invitee]' : data,
            'roommate_group[message]' : msg,
          },
          success:function(){
            $('.roommate_emails').val("");
            message = "Invitation sent successfully to "+ data;
            self.set('successMessage',message);
          },
          error:function(){
              message="Invitation not sent successfully";
              self.set('errorMessage',message);
          }
        });
      }
      else{
        message="Invalid Email Id";
        self.set('errorMessage',message);
      }
    },
    remove: function(params){
      var $=Ember.$;
      var self=this;
      var message = "";
      self.set('errorMessage',null);
      self.set('successMessage',null);
      var group = self.content._data.id;
      var adapter = this.container.lookup('adapter:application');
      $.ajax({
        url: adapter.host+'/v2/roommate_groups/'+group+'/remove_member',
        type: "POST",
        data: {'roommate_group[member]' : params},
        success:function(data){
          if (data){
            message="Member Removed from the Group Successfully.";
            self.set('successMessage',message);
            self.set('model',data.roommate_group.applicants) ;

          }
          else{
            message=data.error;
            self.set('errorMessage',message);
          }
        }
      });
    }
  }
});