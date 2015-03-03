import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend(Ember.Validations.Mixin,{
	cosigningFor: 					      DS.attr('string'),
  relationship: 					      DS.attr('string'),
  signatureDate:                DS.attr('string'),
  apply:                        DS.belongsTo('apply', {async: true}),
  coSigner:                     DS.belongsTo('co-signer', {async: true}),

  validations: {
    cosigningFor: {
      presence: true
    },
    relationship: {
      presence: true
    },
    signatureDate: {
      presence: true
    },
  }
});
