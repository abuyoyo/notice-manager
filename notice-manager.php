<?php
/**
 * Plugin Name: Notice Manager
 * Description: Manage notices on WordPress admin pages. Adds 'Notices' screen-meta-link.
 * Version: 0.12
 * Author: abuyoyo
 * Author URI: https://github.com/abuyoyo/
 * Plugin URI: https://github.com/abuyoyo/notice-manager
 */
defined( 'ABSPATH' ) || die( 'No soup for you!' );

use WPHelper\PluginCore;

/**
 * Print setting page
 */
new PluginCore(
	__FILE__,
	[
		'update_checker' => ['auth'=> $github_oauth],

		'admin_page' => [
			'parent'   => 'options',
			'render'   => 'settings-page', // built-in settings page
			'settings' => [
				'option_name' => 'notice_manager', // option_name used in wp_options table
				'sections' => [
					[
						'id'          => 'notice_manager',
						// 'title'       => 'N',
						'description' => 'Setup How notice manager functions.',
						'fields'      => [
							[
								'id' => 'screen_panel',
								'title' => 'Notices Panel',
								'type' => 'checkbox',
								'description' => 'Enable\disable screen-meta-links \'Notices\' panel.',
							],
							[
								'id' => 'auto_collect',
								'title' => 'Auto-Collect Notices',
								'type' => 'checkbox',
								'description' => 'Automatic collection of notices into panel.',
							],
							[
								'id' => 'auto_collapse',
								'title' => 'Auto-collapse Panel',
								'type' => 'checkbox',
								'description' => 'Notices panel will stay open for a few seconds on page load, and then close automatically.',
							],
						]
					]
				]
			]
		]
	]
);

require_once 'src/utilities.php';
require_once 'src/NoticeManager.php';


add_action('plugins_loaded', function(){
	new NoticeManager();
});
