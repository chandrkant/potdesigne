import DS from 'ember-data';

export default DS.Model.extend({
  attachment: DS.attr('string'),
  name:       DS.attr('string'),
  propertyManager: DS.belongsTo('property-manager',{async: true})
});
