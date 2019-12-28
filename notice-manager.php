<?php
/**
 * Plugin Name: abuyoyo / Notice Manager
 * Description: Manage notices on WordPress admin pages. Adds 'Notices' screen-meta-link.
 * Version: 0.10
 * Author: abuyoyo
 * Author URI: https://github.com/abuyoyo/
 * Plugin URI: https://github.com/abuyoyo/notice-manager
 */
if ( ! defined('ABSPATH') )
	wp_die( 'No soup for you!' );

/**
 * @todo If no notices on page - don't show Notice Manager panel
 */
class NoticeManager{
	
	function __construct(){
		// exit early if not admin page
		if ( !is_admin() )
			return;
		
		add_action( 'admin_enqueue_scripts' , [ $this , 'admin_enqueues' ] );
		
		add_action( 'admin_init' , [ $this , 'register_notice_manager_panel' ] );

		// we don't want to update wp-plugin registered with same name
		add_filter( 'site_transient_update_plugins', [ $this, 'remove_update_notifications' ] );
	}
	
	function admin_enqueues(){
		wp_enqueue_script( 'move_notices', plugin_dir_url( __FILE__ ) . 'js/move_notices.js' , null, false , true ); //default script - moves all notices above wrap h1/h2
		wp_enqueue_style( 'admin_notices', plugin_dir_url( __FILE__ ) . 'css/admin_notices.css' );
	}
	
	function register_notice_manager_panel(){
		if ( ! function_exists( 'add_screen_meta_link' ) )
			return;

		add_screen_meta_link(
			'meta-link-notices', // $id
			'Notices', // $text
			'', // $href - not used
			'*', // $page - string or array of page/screen IDs
			[ 'aria-controls' => 'meta-link-notices-wrap' ], // $attributes - Additional attributes for the link tag.
			[ $this , 'print_notice_manager_panel' ] // $panel callback - cb echoes its output
		);
		
		wp_enqueue_script( 'notice_manager_panel', plugin_dir_url( __FILE__ ) . 'js/notice_manager_panel.js' , null, false , true );
	}
	
	/* not JSON-safe - unescaped quotes */
	function print_notice_manager_panel(){
		
		// NOTE:
		// button is a copy of is-dismissible button - for styling purposes only
		// js functionality and listener -  js/notice_manager_meta_panel.js
		echo '<div class="notice_container empty"></div>';
		echo '<button type="button" class="notice-dismiss"><span class="screen-reader-text">' . __( 'Dismiss' ) . '</span><strong> Dismiss Notices</strong></button><div></div>' ;
	}

	/**
	 * A plugin 'notice-manager' exists now on @link https://wordpress.org/plugins/
	 * Disable update notifications completely for our plugin.
	 * 
	 * @todo - use update_checker to only upload our plugin from github
	 */
	function remove_update_notifications($value) {

		if ( isset( $value ) && is_object( $value ) ) {
			unset( $value->response[ plugin_basename(__FILE__) ] );
		}
	
		return $value;
	}

}


global $notice_manager;
$notice_manager = new NoticeManager();


add_filter( 'wds_required_plugins', function($required){
	$req_array = [
		'screen-meta-links/screen-meta-links.php',
	];
	return array_merge( $required, $req_array );
});
