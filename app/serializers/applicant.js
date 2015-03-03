import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  serialize: function(record, options) {
    var json = this._super(record, options);

    var profile = record.get('profile');
    var attrs = ['applicant_id', 'born_on','ssn','drivers_license_number',
                'drivers_license_state','phone_number','bank_name','bank_city_and_state',
                'vehicles_description','was_ever_evicted','was_ever_evicted_explanation',
                'is_felon','is_felon_explanation','character_reference_name',
                'character_reference_contact_info','emergency_contact_name',
                'emergency_contact_phone_number','current_home_street_address',
                'current_home_moved_in_on','current_home_dissatisfaction_explanation',
                'current_home_owner','current_home_owner_contact_info',
                'previous_home_street_address','previous_home_moved_in_on','previous_home_moved_out',
                'previous_home_dissatisfaction_explanation','previous_home_owner',
                'previous_home_owner_contact_info','employment_status','current_employment_position',
                'current_employment_monthly_income',
                'current_employment_supervisor','current_employment_employer','current_employment_employer_phone_number',
                'current_employment_employer_email_address','current_employment_started_on','previous_employment_position',
                'previous_employment_monthly_income','previous_employment_supervisor','previous_employment_employer',
                'previous_employment_employer_phone_number','previous_employment_employer_email_address','previous_employment_started_on',
                'previous_employment_ended_on','other_income_monthly_amount','other_income_sources','cosigner_name','cosigner_email_address',
                'desires_to_move_in_on','roommates_description',
                'pets_description'];
    var property_manager = record.get('propertyManager');
    var manager_attrs = ['applicant_id', 'customer_contact_phone_number','customer_contact_email_address','accepts_cash',
                'accepts_checks', 'accepts_credit_cards_offline', 'accepts_online_payments',
                'accepts_money_orders', 'url', 'name'];

    if (profile) {
      json.profile_attributes = {};
    }

    attrs.forEach( function (key) {
      if (profile && !profile.get('id')){
        json.profile_attributes[key] = profile.get(key.camelize());
      }
    });
    if (profile && profile.get('id')){
        var hash = record._data.profile._attributes;
        var new_hash = {};
        var new_key = null;
        Object.keys(hash).forEach(function (key) { 
            
            new_key = key.replace(/[A-Z]/g, function (letter) {
                return "_" + letter.toLowerCase();
                }); 
            new_hash[new_key] = hash[key];
        });
        json.profile_attributes = new_hash;
    }

    if (property_manager) {
      json.property_manager_attributes = {};
    }

    manager_attrs.forEach( function (key) {
      if (property_manager && !property_manager.get('id')){
        json.property_manager_attributes[key] = property_manager.get(key.camelize());
      }
    });
    if (property_manager && property_manager.get('id')){
        var landlord_hash = record._data.propertyManager._attributes;
        var landlord_new_hash = {};
        var landlord_new_key = null;
        Object.keys(landlord_hash).forEach(function (key) {

            landlord_new_key = key.replace(/[A-Z]/g, function (letter) {
                return "_" + letter.toLowerCase();
                });
            landlord_new_hash[landlord_new_key] = landlord_hash[key];
        });
        json.property_manager_attributes = landlord_new_hash;
    }

    return json;
  }
});
