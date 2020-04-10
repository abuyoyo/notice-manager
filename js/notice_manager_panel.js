let notices = jQuery( 'div.updated, div.error, div.notice, div.update-nag' ).not( '.inline, .below-h2' );

(function($,document){

	// wait function used with autoCollapse
	wait = window.wait || function(ms){
		var dfd = $.Deferred();
		setTimeout(dfd.resolve, ms); //callback, timeout till callback 
		return dfd.promise();
	};


	let button = $( '#meta-link-notices' ),
		panel = $( '#meta-link-notices-wrap' ),
		haveClosed = false,

		// notices = $( 'div.updated, div.error, div.notice, div.update-nag' ).not( '.inline, .below-h2' ),
		dismissNoticesButton = $( '#meta-link-notices-wrap button.notice-dismiss' );

	dismissNoticesButton.on('click',function(){
		screenMeta.close(panel,button);
		collectNotices();
	});

	//original wp focus on click function
	button.on( 'focus.scroll-into-view', function(e){
		if ( e.target.scrollIntoView )
			e.target.scrollIntoView(false);
	});
	
	//scroll page to top when closing notice panel
	button.on('click',function(){
		haveClosed = true;
		if ( $(this).hasClass('screen-meta-active') ){
			// $(window).scrollTop(true);
		}else{
			// wait (500).then(function(){ //still jumpy sometimes - but scrolls to correct position 400 ~ 600
			// 	$(window).scrollTop(true);
			// });
		}
			
	});

	


	$(document).ready(function(){

		console.log(noticeManager);

		notices = $( 'div.updated, div.error, div.notice, div.update-nag' ).not( '.inline, .below-h2' );
		

		maybeRemoveNoticesPanel();
		

		if (noticeManager.autoCollect){
			collectNotices();
		}else{
			/**
			 * Move ALL notices above page title.
			 * Default no-panel action - override WordPress moving notices BELOW title.
			 */
			notices.insertBefore('.wrap:first');
		}


		/**
		 * auto-open notices panel
		 */
		if (button.length){
			panel.toggle();
			button.addClass( 'screen-meta-active' );
			screenMeta.open(panel,button);
		}

		
		

		if (noticeManager.autoCollapse){
			
			// auto-close notices panel after short delay
			// only auto-close if we have not interacted (opened/closed) with panel previously
			wait(10000).then(function(){
				if ( ! haveClosed ){
					screenMeta.close(panel,button);
				}
			});
		}

		

		
	});

	/**
	 * Collect notices into panel.
	 * Remove dismiss-notices button.
	 */
	function collectNotices(){

		notices.appendTo('.notice_container').eq(0);
		$('.notice_container').removeClass('empty');

		if (dismissNoticesButton.length)
			dismissNoticesButton.detach();

		$(document).on('DOMNodeRemoved', '.notice.is-dismissible' , function (e) {
			console.log('DOMNodeRemoved');
			console.log(e.target);
			console.log(e);

			// $(e.target).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
				notices = panel.find( 'div.updated, div.error, div.notice, div.update-nag' ).filter(':visible');
				console.log('DomNodeRemoved:notices.length');
				console.log(notices.length);
				maybeRemoveNoticesPanel();
			// });

			// notices = $( 'div.updated, div.error, div.notice, div.update-nag' ).not( '.inline, .below-h2' );
		
			// notices = panel.find( 'div.updated, div.error, div.notice, div.update-nag' );//.not( '.inline, .below-h2' );
			
		
			
		});

	}

	function maybeRemoveNoticesPanel(){

		

		console.log('notices.length');
		console.log(notices.length);
		/**
		 * Remove meta-links-notices if no notices on page
		 * Remove screen-meta-links wrapper if no panels on page
		 */
		if ( ! notices.length ){
			console.log('NO NOTICES');
			screenMeta.close(panel,button);

			$('#meta-link-notices-link-wrap').detach();
			$('#meta-link-notices-wrap').detach();

			if ( ! $('#screen-meta-links').children().length )
				$('#screen-meta-links').detach();

			return;
		}
	}

	
	
	// prevent jumpy scrollRestoration on reload page
	// fixed below on 'beforeunload'
	// if (history.scrollRestoration) {
	//	history.scrollRestoration = 'manual';
	//}
	

	/**
	 * Set history.scrollTop to prevent jump on page refresh when scrollRestoration = auto
	 */
	$(window).on('beforeunload', function() {
		history.pushState({scrollTop:document.body.scrollTop},document.title,document.location.pathname);
	});
	
	
	
	
}(jQuery,document) )