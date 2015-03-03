import DS from 'ember-data';

export default DS.Model.extend({
  cardholderName: DS.attr('string'),
  cardType: DS.attr('string'),
  amount: DS.attr('string'),
  purchasedType: DS.attr('string'),
  createdAt: DS.attr('date') 
});