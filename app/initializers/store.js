import Ember from 'ember';
import DS from 'ember-data';
//This initializer should be the first one loaded
export default {
  name: 'store-reopen',
  initialize: function() {
    DS.Store.reopen({
      clear: function() {
        var store = this;
        for(var key in store.typeMaps) {
          try{
            store.unloadAll(store.typeMaps[key].type);
          }catch(err){
            Ember.Logger.warn('Error unloading type: ' + key );
            Ember.Logger.error('Error: ' + err.message );
          }
        }
      }
    });
  }
};
