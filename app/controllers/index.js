import Ember from 'ember';

export default Ember.Controller.extend({
 actions:{
      rental_offerings_list: function() {
       var $=Ember.$;
       var query=$("#city-dropdown").val();
         this.transitionToRoute('search-map',query);

    }
    }
});

