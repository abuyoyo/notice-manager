(function($,document){
	var button = $( '#meta-link-notices' ),
		panel = $( '#meta-link-notices-wrap' ),
		haveClosed = false,
		haveDismissed = false;

	//auto-open notice-panel for quick dismiss
	$(document).ready(function(){
		if (button.length){
			panel.toggle();
			button.addClass( 'screen-meta-active' );

			screenMeta.open(panel,button);
		}
	});
	
	var dismiss = $( '#meta-link-notices-wrap button' );
	dismiss.on('click',function(){
		screenMeta.close(panel,button);
		$( 'div.updated, div.error, div.notice, div.update-nag' ).not( '.inline, .below-h2' ).appendTo('.notice_container').eq(0);
		$('.notice_container').removeClass('empty');
		dismiss.hide();
		haveDismissed = true;
	});
	
	//original wp focus on click function
	/* button.on( 'focus.scroll-into-view', function(e){
		if ( e.target.scrollIntoView )
			e.target.scrollIntoView(false);
	}); */
	
	//scroll page to top when closing notice panel
	button.on('click',function(){
		haveClosed = true;
		if ( $(this).hasClass('screen-meta-active') ){
			$(window).scrollTop(true);
		}else{
			wait (500).then(function(){ //still jumpy sometimes - but scrolls to correct position 400 ~ 600
				$(window).scrollTop(true);
			});
		}
			
	});
	
	
	wait = window.wait || function(ms){
		var dfd = $.Deferred();
		setTimeout(dfd.resolve, ms); //callback, timeout till callback 
		return dfd.promise();
	};
	
	// auto-close notices panel after short delay
	// only auto-close if we have not interacted (opened/closed) with panel previously
	wait(20000).then(function(){
		if ( ! haveClosed )
			screenMeta.close(panel,button);
	});
	
}(jQuery,document) )