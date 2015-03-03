import DS from 'ember-data' ;

var invitation_model = DS.Model.extend({
	
	groupname: DS.attr('string'),
	inviter: DS.attr('string')
});

export default invitation_model ;