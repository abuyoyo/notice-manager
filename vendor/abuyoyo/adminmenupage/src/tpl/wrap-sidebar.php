<?php
/**
 * Template for CMB2 Options Page
 * 
 * @var string $ob_content - Render template or callback
 * @var WPHelper\AdminPage $this
 */
?>
<div class="wrap">
	<h1><?= get_admin_page_title() ?></h1>
	<?php include 'tab-nav-simple.php' ?>
	<div id="poststuff">
		<div id="post-body" class="metabox-holder columns-2">

			<!-- main content -->
			<div id="post-body-content">
				<div class="meta-box-sortables ui-sortable tabs-content">
					<?php echo $ob_content ?>
				</div><!-- .meta-box-sortables -->
			</div><!-- #post-body-content -->

			<!-- sidebar -->
			<div id="postbox-container-1" class="postbox-container">
				<?php include 'sidebar-add-meta-boxes.php'; ?>
			</div><!-- #postbox-container-1 .postbox-container -->
		</div><!-- #post-body -->
		<div class="clear"></div>
	</div><!-- #poststuff -->
</div><!-- .wrap -->