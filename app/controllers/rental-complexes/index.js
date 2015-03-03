import Ember from 'ember';
import Paging from 'portola/controllers/mixins/paging';

export default Ember.ObjectController.extend(Paging,{
  actions:{
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
