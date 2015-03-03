import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  photo: DS.attr('string'),
  thumb: DS.attr('string'),
  rentalOffering: DS.belongsTo('rental-offering',{async: true})
});
