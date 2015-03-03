import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement  : function(){
    //
    this._super();
    var self=this;
    var router ;
    var $=Ember.$;
    $('#lightbox').removeClass("modal fade in software-modal highlight");
    $('.modal-dialog').hide();
    $("div.bhoechie-tab-menu>button").click(function(e) {
      e.preventDefault();
      $(this).siblings('button.highlight').removeClass("highlight");
      $(this).addClass("highlight");
      var index = $(this).index();
      $("div.bhoechie-tab-content").removeClass("highlight");
      $("div.bhoechie-tab-content").eq(index).addClass("highlight");
    });
    $(".units-table tr:odd").addClass("odd");

    $('.custom_column_trigger').click(function() {
      $('#add_custom_column_dropdown').toggleClass( "highlight" );
    });

    $('.software-btn').click(function() {
      $('.software-backdrop').toggleClass( "highlight" );
      $('#lightbox').addClass("modal fade in software-modal highlight");
      $('.modal-dialog').show();
    });

    $('#lightbox .close').click(function() {
      $('.software-backdrop').toggleClass( "highlight" );
      $('#lightbox').removeClass("modal fade in software-modal highlight");
      $('.modal-dialog').hide();
    });

    //

    router = self.get('controller.target.router');
    Ember.$( ".table" ).on( "click", "[id*=team_]", function() {
      var id = Ember.$(this).prop('id').split("_")[1];
      router.transitionTo('edit-property',id);
    });



  $('.container').addClass('pure-form');
  $('.import-button').click(function()
  {
    $('.import-file').slideToggle();
    $('.add-units').hide();
    $('.addunit-btn').removeClass('remove-slide');
    $(this).toggleClass('remove-slide');
  });
  $('.addunit-btn').click(function()
  {
    $('.import-file').hide();
    $('.add-units').slideToggle();
    $(this).toggleClass('remove-slide');
    $('.import-button').removeClass('remove-slide');
  });

  $('input[type=file]').simpleFileInput({
    placeholder : 'Select your file',
    buttonText : 'Select'
  });


  }

});
