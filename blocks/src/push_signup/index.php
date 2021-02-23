<?php 

namespace PushNotificationUserTags;

/**
 * Register the push signup block
 */
function create_block_push_tags_signup() {

	$script_asset_path = PLUGIN_DIR . "/blocks/build/push_signup/index.asset.php";
	$push_signup_script_asset_path = PLUGIN_DIR . "/blocks/build/push_signup/script.asset.php";
	if ( ! file_exists( $script_asset_path ) || ! file_exists($push_signup_script_asset_path)) {
		throw new \Error(
			'You need to run `npm start` or `npm run build` for the "push-notification-user-tags/push-signup" block first.'
		);
	}

    // register index script
	$index_js     = 'blocks/build/push_signup/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-push-tags-block-editor',
		plugins_url( $index_js, PLUGIN_FILE ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-push-tags-block-editor', 'push-notification-user-tags' );

    // localize scripts
	wp_localize_script( 
        'create-block-push-tags-block-editor', 
        'push_notification_user_tags', 
        array (
            'tag_list' => \get_option('push_notification_user_tags_list', array()), 
            'admin_url' => \admin_url ('admin.php?page=push-notification-user-tags')
        )
    );

    // register editor styles
	$editor_css = 'blocks/build/push_signup/index.css';
	wp_register_style(
		'create-block-push-tags-block-editor',
		plugins_url( $editor_css, PLUGIN_FILE ),
		array(),
		filemtime( PLUGIN_DIR . "/$editor_css" )
	);

    // register main styles
	$style_css = 'blocks/build/style-push_signup/index.css';
	wp_register_style(
		'create-block-temp-push-setup-block',
		plugins_url( $style_css, PLUGIN_FILE ),
		array(),
		filemtime( PLUGIN_DIR . "/$style_css" )
	);

	
    // register main (front end) script
	$script_js     = 'blocks/build/push_signup/script.js';
	$push_signup_script_asset = require( $push_signup_script_asset_path );
	wp_register_script(
		'push-signup-script',
		plugins_url( $script_js, PLUGIN_FILE ),
		$push_signup_script_asset['dependencies'],
		$push_signup_script_asset['version']
	);
	

	// register block attributes
	$attributes = array (
		'alternate_subscribed_button' => array (
			'type' => 'string',
			'default' => 'Update'
		),
	);

    // register th eblock
	register_block_type(
		'push-notification-user-tags/push-signup',
		array(
            'render_callback' => __NAMESPACE__ . '\render_signup_block',
			'attributes' => $attributes,
			'editor_script' => 'create-block-push-tags-block-editor',
			'editor_style'  => 'create-block-push-tags-block-editor',
			'style'         => 'create-block-temp-push-setup-block',
			'script'		=> 'push-signup-script',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\create_block_push_tags_signup' );

/**
 * Render the front end of the push signup block
 */
function render_signup_block ($attributes, $content) {
    

    $output = '';

    // wrappera round the whole block
	$unique_class = 'current-block-id-' . rand(100000,999999);
    $output .= '<div class="wp-block-push-notification-signup timeout-status notifications-not-supported ' . $unique_class . '">';

    $output .= $content;
	$output .= '</div>';

    // scripts
    $output .= '<script type="text/javascript">var OneSignal = OneSignal || []; OneSignal.push(function() {if (OneSignal.isPushNotificationsSupported()) { let elements = document.getElementsByClassName("wp-block-push-notification-signup"); for(let i = 0; i < elements.length; i++) { elements[i].classList.remove("notifications-not-supported"); } }});</script>';
	$output .= '<script type="text/javascript">document.querySelector(".' . $unique_class . '").dataset.alternateSubscribedButton="' . $attributes['alternate_subscribed_button'] . '";document.querySelector(".' . $unique_class . '").classList.remove("' . $unique_class . '");</script>';

    return $output;

}