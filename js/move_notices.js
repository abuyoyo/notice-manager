/**
 * Move all notices "above the fold"
 * 
 * Used for plugins that print their notices after 'admin_notice'
 */

(function ($,document){
	$(document).ready(function(){
		//alert ('move_notices.js');
		//$( 'div.updated, div.error, div.notice' ).not( '.inline, .below-h2' ).insertAfter( $headerEnd );
		
		//alert('plugin move notices');
		$( 'div.updated, div.error, div.notice, div.update-nag' ).not( '.inline, .below-h2' ).insertBefore('.wrap:first'); //alert('plugin move notices');

		// $( 'div.updated, div.error, div.notice, div.update-nag' ).not( '.inline, .below-h2' ).each(function(){
			// $(this).insertBefore('.wrap'); //alert('plugin move notices');
		// });

	});
}(jQuery, document))

