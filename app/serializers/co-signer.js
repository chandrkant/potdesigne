import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  serialize: function(record, options) {
    var json = this._super(record, options);

    var coSign = record.get('coSign');
    var attrs = ['co_signer_id', 'apply_id', 'cosigning_for','relationship','signature_date'];

    if (coSign) {
      json.co_sign_attributes = {};
    }

    attrs.forEach( function (key) {
      if (coSign && !coSign.get('id')){
        json.co_sign_attributes[key] = coSign.get(key.camelize());
      }
    });
    if (coSign && coSign.get('id')){
        var hash = record._data.co_sign._attributes;
        var new_hash = {};
        var new_key = null;
        Object.keys(hash).forEach(function (key) {

            new_key = key.replace(/[A-Z]/g, function (letter) {
                return "_" + letter.toLowerCase();
                });
            new_hash[new_key] = hash[key];
        });
        json.co_sign_attributes = new_hash;
    }

    return json;
  }
});
