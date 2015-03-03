import Ember from 'ember';
import SocialAccount from 'portola/controllers/mixins/social-account';


export default Ember.Controller.extend(SocialAccount,{
  needs: ['provider'],

  actions: {
    update: function (applicant) {
      applicant = applicant.applicant;
      applicant.save().then(function () {
        Bootstrap.NM.push("Account information updated successfully", 'success');
      }, function (response) {
        Bootstrap.NM.push(response, 'danger');
      });
    },
    deleteRecord: function (record) {
      var self= this;
      if (confirm("Are you sure?")) {
        record.destroyRecord().then(function() {
          self.session.invalidate();
          self.transitionToRoute('application');
          }, function(error) {
             // todo better error handler, show message to user...
             console.error(error);
          });
      }
    },
    disconnect: function (content) {
      var id = content;
      var self = this;
      var adapter = self.container.lookup('adapter:application');
      Ember.$.ajax({
        url: adapter.host+'/v2/providers/'+id,
        type: "PUT",
        success: function(data) {
          var session = self.container.lookup('simple-auth-session:main');
          session.setProperties({
            applicant:data.applicant
          });
          Ember.RSVP.hash({
            providers: self.store.find('provider'),
            applies: self.store.find('apply',{count:3}),
            starred_properties: self.store.find('starred_property',{count:3})
          });
        },
        error: function() {
          Bootstrap.NM.push( 'Something went wrong', 'danger');
        }
      });
    }
  }
});
