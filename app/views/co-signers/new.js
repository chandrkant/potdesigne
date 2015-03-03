import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
  var $ =Ember.$;
    $('#step1').on('click', function () {
      $('#step1,.step1').removeClass('active');
      $('#step2,.step2').addClass('active');
      $('#back2,.back2').addClass('active');
    });
    $('#step2').on('click', function () {
      $('#step2,.step2').removeClass('active');
      $('#back2,.back2').removeClass('active');
      $('#step3,.step3').addClass('active');
      $('#back3,.back3').addClass('active');
    });
    $('#back2').on('click', function () {
      $('#step1,.step1').addClass('active');
      $('#step2,.step2').removeClass('active');
      $('#back2,.back2').removeClass('active');
    });
    $('#back3').on('click', function () {
      $('#step2,.step2').addClass('active');
      $('#back2,.back2').addClass('active');
      $('#step3,.step3').removeClass('active');
      $('#back3,.back3').removeClass('active');
    });
    var addFormGroup = function (event) {
      event.preventDefault();
      var $ =Ember.$;
      var $formGroup = $(this).closest('.form-group1');
      var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
      var $formGroupClone = $formGroup.clone();
      $(this)
      .toggleClass('btn-default btn-add btn-danger btn-remove')
      .html('–');
    //  $formGroupClone.find('input').val('');
      $formGroupClone.insertAfter($formGroup);
      var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
      if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
        $lastFormGroupLast.find('.btn-add').attr('disabled', true);
      }
    };
    var removeFormGroup = function (event) {
      event.preventDefault();
      var $formGroup = $(this).closest('.form-group1');
      var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
      var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
      if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
        $lastFormGroupLast.find('.btn-add').attr('disabled', false);
      }
      $formGroup.remove();
    };
    var countFormGroup = function ($form) {
      return $form.find('.form-group').length;
    };
    $(document).on('click', '.btn-add', addFormGroup);
    $(document).on('click', '.btn-remove', removeFormGroup);
  }
});
