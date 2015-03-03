import DS from 'ember-data';

export default DS.Model.extend({
  	applicantId: DS.attr('number'),
  	rentalOfferingId: DS.attr('number'),
  	propertyAddress:         DS.attr('string'),
  	bedroomCount:            DS.attr('string'),
  	fullBathroomCount:       DS.attr('string'),
  	squareFootageFloor:      DS.attr('string'),
 	monthlyRentFloor:        DS.attr('string'),
  	salesyDescription:       DS.attr('string'),
  	image:                   DS.attr('string'),
  	soldOut: 				 DS.attr('boolean'),
  	applicant:               DS.belongsTo('applicant', { async: true })
});