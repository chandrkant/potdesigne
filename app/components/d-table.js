import Ember from 'ember';
var DataTableView;
DataTableView= Ember.View.extend({
	classNames: ['d-table-container'],
	didInsertElement: function(){
		var self = this;
		var $=Ember.$;
		// var dt=Ember.get('dt');
		var data = self.get("data") ? self.get("data").getEach("_data") : {};
		 var dt=self.$(".table").dataTable({
			"bProcessing": true,
			"sPaginationType": 'full_numbers',
			"bJQueryUI": true,
			"aaData": data,
			"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
            
            
			"aoColumns": self.get("columns") 
		});
		$(".dt-filter-input").on("keyup", function () {

			dt.fnFilter(
				$(this).val(), null, true
				);
		}
		);
	}
});
export default DataTableView;
