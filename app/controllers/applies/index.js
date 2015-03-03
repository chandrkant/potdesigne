import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    invite: function () {
      var $=Ember.$;
      var data= $('.cosigner_emails').val();
      var obj='';
      var message = "";
      var self = this;
      self.set('errorMessage',null);
      self.set('successMessage',null);
      var regex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
      if(regex.test(data))
      {
        $("input:checkbox[name=type]:checked").each(function()
        {
            obj=obj+' '+$(this).attr('id');
        });
        if(data===''){
          alert("Please enter email address");
          $('.cosigner_emails').css("border-color","red").focus();
          return false;
        }
        else if($.trim(obj)===''){
          $('.cosigner_emails').css("border-color","#129fea");
          alert("Please select atleast on property");
          $('.checkbox:first').focus();
          return false;
        }
        else{
          var currentApplicant = self.session.get('applicant');
          if(currentApplicant.email!==data)
          {
            var adapter = self.container.lookup('adapter:application');
            $.ajax({
              url: adapter.host+'/v2/co_signers/invite_cosigner',
              type: "POST",
              data: {'co_signer[invitee]' : data,
                  'co_signer[apply]' : $.trim(obj),
                  },
              success:function(data){
                if (data.success){
                  $('.cosigner_emails').val("");
                  $('input:checkbox[name=type]:checked').each(function() {
                       $(this).prop("checked", false);
                  });
                  message="Your invitation has been successfully sent";
                  self.set('successMessage',message);
                }
              },
              error: function () {
                message="Your invitation has not been sent";
                self.set('errorMessage',message);
              }
            });
          }
          else{
            message="You can't invite yourself as a co-signer";
            self.set('errorMessage',message);
          }
        }
      }
      else{
        message="Invalid Email";
        self.set('errorMessage',message);
      }
    }
  }
});
