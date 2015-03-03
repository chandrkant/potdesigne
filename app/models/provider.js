import DS from 'ember-data';

export default DS.Model.extend({
  provider: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  connected: DS.attr('boolean'),
  applicant: DS.belongsTo('applicant', { async: true })
});
