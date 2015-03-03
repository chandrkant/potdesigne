import Ember from 'ember';

var EasyFormDatepicker = Ember.EasyForm.TextField.extend({

  didInsertElement: function(){
    var currentYear = (new Date()).getFullYear();
    var formElement = this.$()[0];
    new Pikaday({
      field: formElement,
      yearRange: [1900,currentYear+2]
    });
  }
});

export default {
  name: 'configureEmberEasyForm',
  initialize: function(){

    // Add a Twitter Bootstrap 3.x CSS class to input fields
    Ember.EasyForm.Config.registerTemplate('easyForm/inputControls',
      Ember.Handlebars.compile('{{input-field propertyBinding="view.property" inputOptionsBinding="view.inputOptionsValues" ' +
        'class="form-control"}}{{#if view.showError}}{{error-field propertyBinding="view.property"}}{{/if}}{{#if view.hint}}' +
        '{{hint-field propertyBinding="view.property" textBinding="view.hint"}}{{/if}}'));

    // Customize css classes and templates
    Ember.EasyForm.Config.registerWrapper('default', {
      inputClass: "form-group",
      fieldErrorClass: 'has-error',
      errorClass: 'text-danger'
    });

    Ember.EasyForm.Config.registerInputType('date_input', EasyFormDatepicker);
  }
};
