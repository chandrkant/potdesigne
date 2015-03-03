import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend(Ember.Validations.Mixin,{
  firstName:                    DS.attr('string'),
  lastName:                     DS.attr('string'),
  ssn:                          DS.attr('number'),
  dob:                          DS.attr('string'),
  address:                      DS.attr('string'),
  city:                         DS.attr('string'),
  state:                        DS.attr('string'),
  zipCode:                      DS.attr('string'),
  phone:                        DS.attr('string'),
  email:                        DS.attr('string'),
  rentOwn:                      DS.attr('string'),
  rentMortage:                  DS.attr('number'),
  employerName:                 DS.attr('string'),
  empPosition:                  DS.attr('string'),
  mGrossIncome:                 DS.attr('number'),
  aSourceIncome:                DS.attr('string'),
  marritalStatus: 						  DS.attr('string'),
  landlordPhone:                DS.attr('number'),
	spouseName: 					        DS.attr('string'),
	spouseSsn: 						        DS.attr('string'),
	spouseDob: 						        DS.attr('string'),
	spouseEmployerName: 			    DS.attr('string'),
	spousePosition: 				      DS.attr('string'),
	spouseMonthlyGrossIncome: 		DS.attr('number'),
	spouseAdditionalSourceIncome: DS.attr('string'),
	savingAccountBankName: 		    DS.attr('string'),
  checkingAccountBankName:      DS.attr('string'),
	declaredBankruptcy: 			    DS.attr('boolean'),
	partyLawsuit: 					      DS.attr('boolean'),
	propertyForeclosed: 			    DS.attr('boolean'),
  oCourtJudgement:              DS.attr('boolean'),
  isFelony:                     DS.attr('boolean'),
  applicant:                    DS.belongsTo('applicant', {async: true}),

  validations: {
    firstName: {
      presence: true
    },
    lastName: {
      presence: true
    },
    ssn: {
      presence: true
    },
    dob: {
      presence: true
    },
    address: {
       presence: true
    },
    city: {
      presence: true
    },
    state: {
      presence: true
    },
    zipCode: {
      presence: true
    },
    phone: {
      presence: true
    },
    email: {
      presence: true
    },
    rentOwn: {
      presence: true
    },
    rentMortage: {
      presence: true
    },
    employerName: {
      presence: true
    },
    empPosition: {
      presence: true
    },
    mGrossIncome: {
      presence: true
    },
    aSourceIncome: {
      presence: true
    },
    marritalStatus: {
      presence: true
    },
    spouseName: {
      presence: true
    },
    spouseSsn: {
      presence: true
    },
    spouseDob: {
      presence: true
    },
    spouseEmployerName: {
      presence: true
    },
    spousePosition: {
      presence: true
    },
    spouseMonthlyGrossIncome: {
      presence: true
    },
    spouseAdditionalSourceIncome: {
      presence: true
    },
    savingAccountBankName: {
      presence: true
    },
    checkingAccountBankName: {
      presence: true
    },
    landlordPhone: {
      presence: true
    }
  }
});

