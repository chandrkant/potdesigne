import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({

   // host: 'https://fonda.herokuapp.com',
    host: 'http://0.0.0.0:8080',
    namespace: 'v2'
});
