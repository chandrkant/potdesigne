import DS from 'ember-data';
import Ember from 'ember';
export default DS.Model.extend(Ember.Validations.Mixin,{
  customerContactEmailAddress: DS.attr('string'),
  customerContactPhoneNumber:  DS.attr('number'),
  acceptsCash:                 DS.attr('boolean'),
  acceptsChecks:               DS.attr('boolean'),
  acceptsCreditCardsOffline:   DS.attr('boolean'),
  acceptsOnlinePayments:       DS.attr('boolean'),
  acceptsMoneyOrders:          DS.attr('boolean'),
  url:                         DS.attr('string'),
  name:                        DS.attr('string'),
  applicant:                   DS.belongsTo('applicant', {async: true}),
  rentalComplexes:             DS.hasMany('rental-complex', {async: true}),
  attachment:                  DS.hasMany('attachment', {async: true}),
  validations: {
    name:{
      presence: true
    },
    url:{
      presence: true,
      format: { with: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, allowBlank: false, message: 'Not a valid url'}
    },
    customerContactEmailAddress:{
      format: { with: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, allowBlank: true, message: 'Not a valid email'}
    },
    customerContactPhoneNumber:{
      format: { with: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, allowBlank: true, message: 'Not a valid phone number'}
    }
  }
});
