import DS from 'ember-data' ;
import Ember from 'ember';

var rentalcomplex_model = DS.Model.extend(Ember.Validations.Mixin,{
  name:                         DS.attr('string'),
  fullAddress:                  DS.attr('string'),
  url:                          DS.attr('string'),
  customerContactEmailAddress:  DS.attr('string'),
  customerContactPhoneNumber:   DS.attr('string'),
  salesyDescription:            DS.attr('string'),
  rentalOfferings:              DS.hasMany('rental-offering',{async:true}),
  propertyManager:              DS.belongsTo('property-manager',{async:true}),

  validations: {
    fullAddress: {
      presence: true
    },
    url: {
      format: { with: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, allowBlank: true, message: 'Not a valid url'}
    },
    customerContactEmailAddress:{
      format: { with: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, allowBlank: true, message: 'Not a valid email'}
    },
    customerContactPhoneNumber:{
      format: { with: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, allowBlank: true, message: 'Not a valid phone number'}
    }
  }
});

export default rentalcomplex_model ;
