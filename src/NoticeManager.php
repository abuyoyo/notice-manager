<?php
/**
 * NoticeManager class
 */
if ( ! defined('ABSPATH') ) wp_die( 'No soup for you!' );

 /**
 * @todo If no notices on page - don't show Notice Manager panel
 */
class NoticeManager{

	/**
	 * Options
	 * 
	 * @var Array $options
	 */
	private $options;
	
	function __construct(){
		// exit early if not admin page
		if ( !is_admin() )
			return;

		$this->options = get_option( 'notice_manager');
		

		add_action( 'admin_enqueue_scripts' , [ $this , 'admin_enqueues' ] );
		
		if ( empty( $this->options['screen_panel'] ) ){
			array_walk($this->options,function(&$item){$item=0;});
		}else{
			add_action( 'admin_init' , [ $this , 'register_notice_manager_panel' ] );
		}
			

		// we don't want to update wp-plugin registered with same name
		// add_filter( 'site_transient_update_plugins', [ $this, 'remove_update_notifications' ] );
	}
	
	function admin_enqueues(){
		wp_enqueue_script( 'notice_manager_panel', NOTICE_MANAGER_URL . 'js/notice_manager_panel.js' , null, false , true );
		wp_localize_script( 'notice_manager_panel', 'noticeManager', camelCaseKeys($this->options) );
		wp_enqueue_style( 'admin_notices', NOTICE_MANAGER_URL . 'css/admin_notices.css' );
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
			unset( $value->response[ NOTICE_MANAGER_BASENAME ] );
		}
	
		return $value;
	}

}