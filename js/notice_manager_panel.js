/**
 * NoticeManager class/module
 * 
 */
var NoticeManager = (function ($, document) {
	let options = window.notice_manager_options;

	// wait function used with autoCollapse
	let wait = function (ms) {
		var dfd = $.Deferred();
		setTimeout(dfd.resolve, ms); //callback, timeout till callback
		return dfd.promise();
	};

	let notices;

	let button;
	let panel;
	let haveClosed; // set to true on first close/collect
	let dismissNoticesButton;

	// bootstrap
	// some of these need to run BEFORE document.ready - don't know why really
	button = $("#meta-link-notices");
	panel = $("#meta-link-notices-wrap");
	haveClosed = false;
	dismissNoticesButton = $("#meta-link-notices-wrap button.notice-dismiss");

	dismissNoticesButton.on("click", () => {
		screenMeta.close(panel, button);
		NoticeManager.collectNotices();
	});

	//original wp focus on click function
	button.on("focus.scroll-into-view", (e) => {
		if (e.target.scrollIntoView) e.target.scrollIntoView(false);
	});

	// scroll page to top when closing notice panel
	// cannot convert to arrow function - uses this
	// could use event.target instead
	button.on("click", function () {
		haveClosed = true;
		if ($(this).hasClass("screen-meta-active")) {
			// $(window).scrollTop(true);
		} else {
			// wait (500).then(function(){ //still jumpy sometimes - but scrolls to correct position 400 ~ 600
			// 	$(window).scrollTop(true);
			// });
		}
	});

	/**
	 * document.on.ready
	 */
	$(() => {

		console.log("NoticeManager.on.ready");
		console.log("options");
		console.log(options);

		// bootstrap notices
		// get all notices that are not explicily marked as `.inline` or `.below-h2`
		// we add .update-nag.inline for WordPress Update notice
		notices = $("div.updated, div.error, div.notice")
			.not(".inline, .below-h2")
			.add("div.update-nag");

		/**
		 * Remove panel if there are no notices on this page
		 */
		NoticeManager.maybeRemoveNoticesPanel();

		if (options.auto_collect) {
			NoticeManager.collectNotices();
		} else {
			/**
			 * Move ALL notices above page title.
			 * Default no-panel action - override WordPress moving notices BELOW title.
			 * I HATE it when WordPress moves notices below title.
			 *
			 * comment this line out to completely restore WordPress functionality when auto_collect is off
			 */
			notices.insertBefore(".wrap:first");
		}

		/**
		 * auto-open notices panel
		 */
		if (button.length) {
			panel.toggle();
			button.addClass("screen-meta-active");
			screenMeta.open(panel, button);
		}

		/**
		 * auto-close notices panel after short delay
		 * only auto-close if we have not interacted (opened/closed) with panel previously
		 */
		if (options.auto_collapse) {
			wait(4000).then(() => {
				if (!haveClosed) {
					screenMeta.close(panel, button);
				}
			});
		}
	}); // end document.on.ready

	// prevent jumpy scrollRestoration on reload page
	// fixed below on 'beforeunload'
	// if (history.scrollRestoration) {
	//	history.scrollRestoration = 'manual';
	//}
	/**
	 * Set history.scrollTop to prevent jump on page refresh when scrollRestoration = auto
	 */
	$(window).on("beforeunload", () => {
		history.pushState(
			{ scrollTop: document.body.scrollTop },
			document.title,
			document.location.pathname
		);
	});

	return {
		getNotices: () => notices,

		/**
		 * Collect notices into panel.
		 * Remove dismiss-notices button.
		 */
		collectNotices: () => {
			notices.appendTo(".notice_container").eq(0);
			$(".notice_container").removeClass("empty"); // .empty removes padding

			/**
			 * When dismissible notices are dismissed, check if any notices are left on page.
			 * If no notices are left - remove Notice Panel entirely
			 */
			$(document).on("DOMNodeRemoved", ".notice.is-dismissible", (e) => {
				notices = panel
					.find("div.updated, div.error, div.notice, div.update-nag")
					.filter(":visible");
				NoticeManager.maybeRemoveNoticesPanel();
			});
		},

		/**
		 * Remove meta-links-notices if no notices on page
		 * Remove screen-meta-links wrapper if no panels on page
		 */
		maybeRemoveNoticesPanel: () => {
			if (!notices.length) {
				screenMeta.close(panel, button);

				$("#meta-link-notices-link-wrap").detach();
				$("#meta-link-notices-wrap").detach();

				if (!$("#screen-meta-links").children().length)
				$("#screen-meta-links").detach();
			}
		},
	};
}(jQuery,document) )