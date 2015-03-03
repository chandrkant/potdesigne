import DS from 'ember-data';

export default DS.Model.extend({
  location: 	DS.attr('string'),
  minPrice: 	DS.attr('number'),
  maxPrice: 	DS.attr('number'),
  bedroom: 		DS.attr('string')

});