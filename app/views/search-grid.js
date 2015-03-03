import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement  : function(){
    var bval='';
    var pval='';
    var jQuery = Ember.$;

    Ember.$(".ember-view").removeClass("search-map-page");
    jQuery('.filter-title').click(function() {
        jQuery('.search-filter').toggleClass('highlight-form');
    });

    jQuery('.bedroom-options button').click(function() {
        jQuery(this).toggleClass('highlight');
        bval+=jQuery(this).val()+' ';
        jQuery('#bedroom').val(bval);
    });
    jQuery('.pet-options button').click(function() {
        jQuery(this).toggleClass('highlight');
        pval+=jQuery(this).val()+' ';
        jQuery('#pet').val(pval);
    });
  }
});
