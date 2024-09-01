/**
 * NoticeManager class/module
 * 
 */
const NoticeManager = function ($) {

	const selectors_notice = [
		"div.notice",
		"div.updated",
	]

	const selectors_warning = [
		"div.notice-warning",
		"div.update-nag",
	]

	const selectors_error = [
		"div.error",
		"div.notice-error",
	]

	const selectors_all = selectors_notice.concat(selectors_warning, selectors_error)

	const selectors_skip = [
		".inline",
		".below-h2",
		".theme-info .notice",
		".hidden",
	]

	// wait function used with autoCollapse
	const wait = function (ms) {
		var dfd = $.Deferred()
		setTimeout(dfd.resolve, ms) //callback, timeout till callback
		return dfd.promise()
	}

	const options = window.notice_manager_options

	let notices

	let button
	let panel
	let dismissNoticesButton

	let haveClosed // set to true on first close/collect

	return {
		bootstrap: () => {

			// Init selectors
			button = $("#meta-link-notices")
			panel = $("#meta-link-notices-wrap")
			dismissNoticesButton = $("#meta-link-notices-wrap button.notice-dismiss")

			// bootstrap notices
			// get all notices that are not explicitly marked as `.inline` or `.below-h2`
			// we add .update-nag.inline for WordPress Update notice
			notices = $(selectors_all.join(', '))
				.not(selectors_skip.join(', '))
				.add("div.update-nag")

			// Set state
			haveClosed = false

			dismissNoticesButton.on("click", () => {
				screenMeta.close(panel, button)
				if (!haveClosed) {
					NoticeManager.collectNotices()
				}
				NoticeManager.addCounter()
			})

			//original wp focus on click function
			button.on("focus.scroll-into-view", (e) => {
				if (e.target.scrollIntoView) e.target.scrollIntoView(false)
			})

			// scroll page to top when closing notice panel
			// function used to work with $(this)
			// using e.target instead
			// not sure if this should perhaps be e.currentTarget
			button.on("click", (e) => {
				if ($(e.target).hasClass("screen-meta-active")) {
					if (haveClosed) {
						NoticeManager.addCounter()
					}

					// $(window).scrollTop(true)
				} else {
					NoticeManager.removeCounter()

					// wait (500).then(function(){ //still jumpy sometimes - but scrolls to correct position 400 ~ 600
					// 	$(window).scrollTop(true)
					// })
				}
			})

			// prevent jumpy scrollRestoration on reload page
			// fixed below on 'beforeunload'
			// if (history.scrollRestoration) {
			//	history.scrollRestoration = 'manual'
			//}
			/**
			 * Set history.scrollTop to prevent jump on page refresh when scrollRestoration = auto
			 */
			$(window).on('beforeunload', () => history.pushState(
					{ scrollTop: document.body.scrollTop },
					document.title,
					document.location.pathname
				)
			)

			/**
			 * Remove panel if there are no notices on this page
			 */
			if (options.screen_panel) {
				NoticeManager.maybeRemoveNoticesPanel()
			}

			if (options.screen_panel && options.auto_collect) {
				NoticeManager.collectNotices()
			} else {
				if (options.above_title) {
					NoticeManager.moveAboveTitle()
				}
			}

			/**
			 * auto-open notices panel
			 */
			if (button.length && !options.distraction_free) {
				panel.toggle()
				button.addClass("screen-meta-active")
				screenMeta.open(panel, button)
			}

			/**
			 * auto-close notices panel after short delay
			 * only auto-close if we have collected notices previously
			 * only auto-close if no error messages
			 */
			if (options.auto_collapse && !options.distraction_free) {
				wait(4000).then(() => {
					if (haveClosed && NoticeManager.getNoticesTopPriority() != 'error') {
						screenMeta.close(panel, button)
						NoticeManager.addCounter()
					}
				})
			}

			if (options.distraction_free) {
				NoticeManager.addCounterWhenClosed()
			}

		},

		getNotices: () => notices,

		getNoticesTopPriority: () => {
			if (notices.filter(":visible").filter(selectors_error.join(", ")).length)
				return 'error'
			if (notices.filter(":visible").filter(selectors_warning.join(", ")).length)
				return 'warning'
			return 'info'
		},

		/**
		 * .filter(":visible") unreliable when closed
		 * 
		 * @returns {string} top priority
		 */
		getNoticesTopPriorityWhenClosed: () => {
			if (notices.filter(selectors_error.join(", ")).length)
				return 'error'
			if (notices.filter(selectors_warning.join(", ")).length)
				return 'warning'
			return 'info'
		},

		/**
		 * Collect notices into panel.
		 * Remove dismiss-notices button.
		 */
		collectNotices: () => {
			notices.appendTo(".notice_container").eq(0)
			$(".notice_container").removeClass("empty") // .empty removes padding

			haveClosed = true // initial collection has occurred.

			/**
			 * When dismissible notices are dismissed, check if any notices are left on page.
			 * If no notices are left - remove Notice Panel entirely
			 */
			$(document).on(
				"DOMNodeRemoved",
				"#meta-link-notices-wrap div.notice",
				() => {
					notices = panel
						.find(selectors_all.join(", "))
						.filter(":visible")
					NoticeManager.maybeRemoveNoticesPanel()
				}
			)
		},

		addCounter: () => {
			if (!button.children('.plugin-count').length) {
				button.append(
					$("<span/>").text(notices.filter(":visible").length).attr({
						class: "plugin-count",
					}).addClass(NoticeManager.getNoticesTopPriority())
				)
			}
		},

		/**
		 * cannot rely on filter(:visible)
		 */
		addCounterWhenClosed: () => {
			if (!button.children('.plugin-count').length) {
				button.append(
					$("<span/>").text(notices.length).attr({
						class: "plugin-count",
					}).addClass(NoticeManager.getNoticesTopPriorityWhenClosed())
				)
			}
		},

		removeCounter: () => {
			button.children(".plugin-count").remove()
		},

		/**
		 * Remove meta-links-notices if no notices on page
		 * Remove screen-meta-links wrapper if no panels on page
		 */
		maybeRemoveNoticesPanel: () => {
			if (!notices.length) {
				screenMeta.close(panel, button)

				$("#meta-link-notices-link-wrap").detach()
				$("#meta-link-notices-wrap").detach()

				if ($("#screen-meta-links").children().length == 0) {
					$("#screen-meta-links").detach()
				}
			}
		},

		/**
		 * Move ALL notices above page title.
		 * Default no-panel action - override WordPress moving notices BELOW title.
		 * I HATE it when WordPress moves notices below title.
		 */
		moveAboveTitle: () => {
			notices.insertBefore(".wrap:first")
		},
	}
}(jQuery);

jQuery(NoticeManager.bootstrap);