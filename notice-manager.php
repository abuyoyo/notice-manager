<?php
/**
 * Plugin Name: abuyoyo / Notice Manager
 * Description: Manage notices on WordPress admin pages. Adds 'Notices' screen-meta-link.
 * Version: 0.11
 * Author: abuyoyo
 * Author URI: https://github.com/abuyoyo/
 * Plugin URI: https://github.com/abuyoyo/notice-manager
 */
if ( ! defined('ABSPATH') ) wp_die( 'No soup for you!' );

use WPHelper\PluginCore;
use WPHelper\AdminMenuPage;

new PluginCore(
	__FILE__,
	[
		'update_checker' => ['auth'=> $github_oauth],
	]
);

new AdminMenuPage([
	'slug'     => 'notice-manager',
	'title'    => 'Notice Manager',
	'parent'   => 'options',
	'render'   => 'settings-page', // built-in settings page
	'settings' => [
		'option_name' => 'notice_manager', // option_name used in wp_options table
		// 'option_group' => 'wp_head_cleaner_settings' . '_settings_group', // Optional - Settings group used in register_setting() and settings_fields()
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
						'description' => 'Enable screen-meta-links \'Notices\' panel.',
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
]);

require_once 'src/NoticeManager.php';


add_action('plugins_loaded', function(){
	new NoticeManager();
});


add_filter( 'wds_required_plugins', function($required){
	$req_array = [
		'screen-meta-links/screen-meta-links.php',
	];
	return array_merge( $required, $req_array );
});
