(function($,document){
	let button = $( '#meta-link-notices' ),
		panel = $( '#meta-link-notices-wrap' ),
		haveClosed = false;

	let notices = $( 'div.updated, div.error, div.notice, div.update-nag' ).not( '.inline, .below-h2' );
	
	
				
	// $( '#meta-link-notices-wrap button' );
	let dismissNoticesButton = $( '#meta-link-notices-wrap button.notice-dismiss' );

	$(document).ready(function(){

		console.log(noticeManager);

		/**
		 * Move ALL notices above page title. ALWAYS!
		 */
		notices.insertBefore('.wrap:first');


		/**
		 * Remove meta-links-notices if no notices on page
		 * Remove screen-meta-links wrapper if no panels on page
		 */
		if ( ! notices.length ){
			console.log('NO NOTICES');
			$('#meta-link-notices-link-wrap').detach();
			$('#meta-link-notices-wrap').detach();

			if ( ! $('#screen-meta-links').children().length )
				$('#screen-meta-links').detach();

			return;
		}

		
		/**
		 * auto-open notices panel
		 */
		if (button.length){
			panel.toggle();
			button.addClass( 'screen-meta-active' );

			screenMeta.open(panel,button);			
		}

		if (noticeManager.autoCollect){
			collectNotices();
		}

		if (noticeManager.autoCollapse){
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
		}
	});


	
	dismissNoticesButton.on('click',function(){
		screenMeta.close(panel,button);
		collectNotices();
	});
	
	
	

	function collectNotices(){
		$( 'div.updated, div.error, div.notice, div.update-nag' ).not( '.inline, .below-h2' )
			.appendTo('.notice_container').eq(0);
		$('.notice_container').removeClass('empty');

		dismissNoticesButton.detach();
	}
	
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
			// wait (500).then(function(){ //still jumpy sometimes - but scrolls to correct position 400 ~ 600
			// 	$(window).scrollTop(true);
			// });
		}
			
	});
	
	
	
	
}(jQuery,document) )