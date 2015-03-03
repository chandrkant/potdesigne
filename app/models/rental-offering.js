import DS from 'ember-data' ;
import Ember from 'ember';

var rentalOffering=  DS.Model.extend(Ember.Validations.Mixin,{
	bedroomCount: DS.attr('number'),
  appliesCount: DS.attr('number'),
	fullBathroomCount: DS.attr('number'),
	halfBathroomCount: DS.attr('number'),
	monthlyRentFloor: DS.attr('number'),
	monthlyRentCeiling: DS.attr('number'),
	url: DS.attr('string'),
  rentalOfferingType: DS.attr('string'),
  headline: DS.attr('string'),
  propertyPhotos: DS.hasMany('property-photo',{async:true}),
  rentalComplexStreetName: DS.attr('string'),
  rentalComplexCrossStreetName: DS.attr('string'),
  squareFootageFloor: DS.attr('number'),
  squareFootageCeiling: DS.attr('number'),
  earliestAvailableOn: DS.attr('string'),
  rentalComplexName: DS.attr('string'),
  propertyManagerName: DS.attr('string'),
  propertyManagerAcceptsCash: DS.attr('boolean'),
  propertyManagerAcceptsChecks: DS.attr('boolean'),
  propertyManagerAcceptsCreditCardsOffline: DS.attr('boolean'),
  propertyManagerAcceptsOnlinePayments: DS.attr('boolean'),
  propertyManagerAcceptsMoneyOrders: DS.attr('boolean'),
  customerContactEmailAddress: DS.attr('string'),
  customerContactPhoneNumber: DS.attr('number'),
  rentalComplexLatitude:DS.attr('string'),
  rentalComplexLongitude:DS.attr('string'),
  rentalComplexFullAddress:DS.attr('string'),
  rentalComplexNearbyPlaces:DS.attr('string'),
  salesyDescription:DS.attr('string'),
  buzzerIntercom:DS.attr('boolean'),
  gym:DS.attr('boolean'),
  centralAir:DS.attr('boolean'),
  deckPatio:DS.attr('boolean'),
  dishwater:DS.attr('boolean'),
  doorman:DS.attr('boolean'),
  elevator:DS.attr('boolean'),
  fireplace:DS.attr('boolean'),
  hardwoodFloor:DS.attr('boolean'),
  newAppliances:DS.attr('boolean'),
  parkingGarage:DS.attr('boolean'),
  parkingOutdoor:DS.attr('boolean'),
  pool:DS.attr('boolean'),
  storageSpace:DS.attr('boolean'),
  vaultedCeiling:DS.attr('boolean'),
  walkinCloset:DS.attr('boolean'),
  washerDryer:DS.attr('boolean'),
  yardPrivate:DS.attr('boolean'),
  yardShared:DS.attr('boolean'),
  rentalComplexWalkTime:DS.attr('string'),
  scrapeAmenities:DS.attr('string'),
  rentalComplex: DS.belongsTo('rental-complex', {async: true}),
  starred: DS.attr('boolean'),

  validations: {
    bedroomCount: {
      presence: true,
      numericality: { onlyInteger: true, lessThan: 100, greaterThan: 0}
    },
    fullBathroomCount: {
      presence: true,
      numericality: { onlyInteger: true, lessThan: 100, greaterThan: 0}
    },
    halfBathroomCount: {
      presence: true,
      numericality: { onlyInteger: true, lessThan: 100, greaterThan: 0}
    },
    monthlyRentFloor: {
      presence: true,
      numericality: { onlyInteger: true, lessThan: 15000, greaterThan: 50}
    },
    monthlyRentCeiling: {
      presence: true,
      numericality: { onlyInteger: true, lessThan: 15000, greaterThan: 50}
    },
    squareFootageFloor: {
      format: { with:  /^([0-9])+$/, allowBlank: true, message: 'is not a number'}
    },
    squareFootageCeiling: {
      format: { with:  /^([0-9])+$/, allowBlank: true, message: 'is not a number'}
    },
    url: {
      format: { with: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, allowBlank: true, message: 'Not a valid url'}
    },
    headline: {
      presence: true
    },
    rentalComplex: {
      presence: true
    },
  }
});
export default rentalOffering;
