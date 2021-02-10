<?php
 
namespace PushNotificationUserTags;

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_push_tags_signup() {
	$dir = PLUGIN_DIR;

	$script_asset_path = "$dir/blocks/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/temp-push-setup" block first.'
		);
	}
	$index_js     = 'blocks/build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-push-tags-block-editor',
		plugins_url( $index_js, PLUGIN_FILE ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-push-tags-block-editor', 'push-notification-user-tags' );


	$editor_css = 'blocks/build/index.css';
	wp_register_style(
		'create-block-push-tags-block-editor',
		plugins_url( $editor_css, PLUGIN_FILE ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'blocks/build/style-index.css';
	wp_register_style(
		'create-block-temp-push-setup-block',
		plugins_url( $style_css, PLUGIN_FILE ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	
	$attributes = array (
		'button_text' => array (
			'type' => 'string',
			'default' => 'Sign up'
		)
	);

	register_block_type(
		'push-notification-user-tags/push-signup',
		array(
			'attributes' => $attributes,
			'editor_script' => 'create-block-push-tags-block-editor',
			'editor_style'  => 'create-block-push-tags-block-editor',
			'style'         => 'create-block-temp-push-setup-block',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\create_block_push_tags_signup' );
