/**
 * Scripts for the category tag admin page
 */

(function($) {
	
	$(document).ready (function () {

		// remove parent row when an existing delete button is clicked 
		$('.delete').on('click', function (event) {
			jQuery(event.target).closest('tr').remove();
		});

		// add new row
		$('.add-push-tag').on('click', function () {

			// copy the template row without the 'repeatable-template' class
			let template = $('.repeatable-template').clone();

			template.removeClass('repeatable-template');
			
			// remove the parent row when the delete button in this new row is clicked
			template.find('.delete').on('click', function (event) {
				jQuery(event.target).closest('tr').remove();
			});

			// add the newly-copied row to the end of the list
			template.appendTo('.push-tag-list tbody');

			// add the row number to the field names (by replacing %row% in the repeatable-template)
			template.find('input').each(function( index ) {
				let new_row = $(this).closest('table').find('tbody tr:not(.repeatable-template)').length - 1;
				if ($(this).attr('name') && $(this).attr('name').length) {
					$( this ).attr('name', $(this).attr('name').replace('%row%', new_row));
				}
			});
		});

		
	});
	
})( jQuery );