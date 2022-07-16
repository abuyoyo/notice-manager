<?php
/**
 * NoticeManager class
 * 
 * @todo Maybe rename plugin and class to Notice-Collector
 * @todo Fix regression - notice tab click not closing on first click (next time - backup first!)
 * @todo Maybe make separate wp-admin-notice-register class (core API demo plugin)
 */
if ( ! defined('ABSPATH') ) wp_die( 'No soup for you!' );

/**
 * NoticeManager class
 */
class NoticeManager{

	/**
	 * Options
	 * 
	 * @var array $options
	 */
	private $options;
	
	function __construct(){
		// exit early if not admin page
		if ( !is_admin() )
			return;

		$this->options = get_option( 'notice_manager' );
		
		add_action( 'admin_enqueue_scripts' , [ $this , 'admin_enqueues' ] );
		
		if ( ! empty( $this->options['screen_panel'] ) ){
			add_action( 'admin_init' , [ $this , 'register_notice_manager_panel' ] );
		}else{
			// array_walk($this->options,function(&$item){$item=0;});
		}

	}
	
	function admin_enqueues(){
		wp_enqueue_script( 'notice_manager_panel', NOTICE_MANAGER_URL . 'js/notice_manager_panel.js' , null, false , true );
		wp_localize_script( 'notice_manager_panel', 'notice_manager_options', $this->options );
		wp_enqueue_style( 'admin_notices', NOTICE_MANAGER_URL . 'css/admin_notices.css' );
	}


	/**
	 * Register screen-meta-links panel on all pages
	 * 
	 * @hook admin_init
	 * 
	 * @uses screen-meta-links-api library
	 */
	function register_notice_manager_panel(){
		if ( ! function_exists( 'wph_add_screen_meta_panel' ) )
			return;

		wph_add_screen_meta_panel(
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
		
		// if auto_collect is ON - we don't need the button.
		// if ( empty( $this->options['auto_collect'] ) )
		// We ALWAYS print the button!
		echo '<button type="button" class="notice-dismiss"><span class="screen-reader-text">' . __( 'Dismiss' ) . '</span><strong> Dismiss Notices</strong></button><div></div>' ;

		// NOTE:
		// button is a copy of is-dismissible button - for styling purposes only
		// js functionality and listener -  js/notice_manager_meta_panel.js
		echo '<div class="notice_container empty"></div>';
	}

}