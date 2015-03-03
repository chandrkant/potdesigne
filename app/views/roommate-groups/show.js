import Ember from 'ember';
var $= Ember.$;
export default Ember.View.extend({
	didInsertElement  : function(){
		var advancedEditor, _;

		_ = Quill.require('lodash');

		advancedEditor = new Quill('.advanced-wrapper .editor-container', {
			modules: {
				'authorship': {
					authorId: 'advanced',
					enabled: true
				},
				'toolbar': {
					container: '.advanced-wrapper .toolbar-container'
				},
				'link-tooltip': true,
				'image-tooltip': true,
				'multi-cursor': true
			},
			styles: false,
			theme: 'snow'
		});

   $('#edit_cont').click(function(){
    $('#edit_cont').animate({height:'400px'},500);
  });
 }
});
