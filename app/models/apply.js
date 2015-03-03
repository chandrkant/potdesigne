import DS from 'ember-data';

export default DS.Model.extend({
  propertyRentalgeekId:    DS.attr('string'),
  propertyAddress:         DS.attr('string'),
  bedroomCount:            DS.attr('string'),
  fullBathroomCount:       DS.attr('string'),
  squareFootageFloor:      DS.attr('string'),
  monthlyRentFloor:        DS.attr('string'),
  salesyDescription:       DS.attr('string'),
  image:                   DS.attr('string'),
  soldOut: 				         DS.attr('boolean'),
  customAgreement:         DS.attr('boolean'),
  agreementStatus:         DS.attr('string'),
  agreementGuid:           DS.attr('string'),
  agreementUrl:            DS.attr('string')
});
