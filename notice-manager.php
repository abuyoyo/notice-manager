<?php
/**
 * Plugin Name: Notice Manager
 * Description: Manage notices on WordPress admin pages. Adds 'Notices' screen-meta-link panel to collect notices from page.
 * Version: 0.24
 * Author: abuyoyo
 * Author URI: https://github.com/abuyoyo/
 * Plugin URI: https://github.com/abuyoyo/notice-manager
 * Update URI: https://github.com/abuyoyo/notice-manager
 */
defined( 'ABSPATH' ) || die( 'No soup for you!' );

/**
 * Dependencies
 * Allow all other auto-loaders to fail before including our own.
 */
if (
	! class_exists( 'WPHelper\PluginCore' )
	||
	! class_exists( 'WPHelper\AdminPage' )
	||
	! function_exists( 'wph_add_screen_meta_panel' )
)
{
	if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ){
		require_once __DIR__ . '/vendor/autoload.php';
	}
}

use WPHelper\PluginCore;

/**
 * Bootstrap plugin and admin page (Tools > Notice Manager)
 */
new PluginCore(
	__FILE__,
	[
		'action_links' => [
			'settings' => [
				'text' => 'Settings',
				'href' => 'menu_page' // reserved option_name
			],
		],
		'admin_page' => [
			'parent'   => 'options',
			'render'   => 'settings-page', // built-in settings page
			// 'plugin_info' => true, // disable on public repo
			'settings' => [
				'option_name' => 'notice_manager', // option_name used in wp_options table
				'sections' => [
					[
						'id'          => 'notice_manager',
						'description' => 'Setup Notice Manager options.',
						'description_container' => 'notice-info',
						'fields'      => [
							[
								'id' => 'above_title',
								'title' => 'Above Title',
								'type' => 'checkbox',
								'description' => 'Simply move all notices above title. WordPress core moves notices below title using script. This script moves them back over the title. This option does not move notices into panel.',
							],
							[
								'id' => 'screen_panel',
								'title' => 'Notices Panel',
								'type' => 'checkbox',
								'description' => 'Enable Screen Meta \'Notices\' panel. User can collect notices into collapsible panel.',
							],
							[
								'id' => 'auto_collect',
								'title' => 'Auto-Collect Notices',
								'type' => 'checkbox',
								'description' => 'If Notices panel is enabled - auto-collect notices into panel on page load.',
							],
							[
								'id' => 'auto_collapse',
								'title' => 'Auto-Collapse Panel',
								'type' => 'checkbox',
								'description' => 'If auto-collect is enabled - Notices panel will stay open for a few seconds on page load, and then close automatically. Panel will not auto-collapse if it contains `error` level notices.',
							],
							[
								'id' => 'distraction_free',
								'title' => 'Distraction Free',
								'type' => 'checkbox',
								'description' => 'Notice Panel is closed on page load. Requires auto_collect.'
							],
						],
					],
				],
			],
		],
		'update_checker' => true, // If Plugin Update Checker library is available - allow updates/auto-updates.
	],
);

require_once 'src/NoticeManager.php';


add_action( 'plugins_loaded', fn() => new NoticeManager() );