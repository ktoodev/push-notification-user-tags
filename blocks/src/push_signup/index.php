<?php 

namespace PushNotificationUserTags;

/**
 * Register the push signup block
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

	wp_localize_script( 
        'create-block-push-tags-block-editor', 
        'push_notification_user_tags', 
        array (
            'tag_list' => \get_option('push_notification_user_tags_list'), 
            'admin_url' => \admin_url ('admin.php?page=push-notification-user-tags')
        )
    );

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
		'default_tags' => array (
			'type' => 'object',
			'default' => array()
		),
		'show_categories' => array (
			'type' => 'boolean',
			'default' => true
		),
		'columns' => array (
			'type' => 'integer',
			'default' => 1
		),
		'show_new_categories' => array (
			'type' => 'boolean',
			'default' => true
		),
		'select_new_categories' => array (
			'type' => 'boolean',
			'default' => false
		),
		'remove_deleted_categories' => array (
			'type' => 'boolean',
			'default' => true
		)
	);

	register_block_type(
		'push-notification-user-tags/push-signup',
		array(
            'render_callback' => __NAMESPACE__ . '\render_signup_block',
			'attributes' => $attributes,
			'editor_script' => 'create-block-push-tags-block-editor',
			'editor_style'  => 'create-block-push-tags-block-editor',
			'style'         => 'create-block-temp-push-setup-block',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\create_block_push_tags_signup' );

/**
 * Render the front end of the push signup block
 */
function render_signup_block ($attributes, $content) {
    
    $all_tags = \get_option('push_notification_user_tags_list');
    $new_tags = array_values (array_diff (array_keys ($all_tags), array_keys ($attributes['default_tags'])));
    //$deleted_tags = array_values (array_diff (array_keys ($attributes['default_tags']), array_keys ($all_tags)));

    // the tags we'll be looping through - everything from settings and the block if we're showing new tags, otherwise just the ones from the block
    $tags_to_show = $attributes['show_new_categories'] ? array_merge ($all_tags, $attributes['default_tags']) : $attributes['default_tags'];

    $output = '';

    
    $cat_container_id = 'category-container-' . rand(1000, 999999);

    $output .= '<div data-push-category-container-id="' . $cat_container_id . '" class="wp-block-push-notification-signup notifications-not-supported">';


    if ($attributes['show_categories']) {
        
        $output .= '<div class="wp-block-push-notification-signup__categories" id="' . $cat_container_id . '" style="column-count:' . $attributes['columns'] . '">';

        // loop through all the tags saved in the block
        foreach ($tags_to_show as $tag) {
            
            // if this tag is visibible and in the settings or we're NOT removing deleted tags
            if (isset ($tag['visible']) && $tag['visible'] && ( in_array ($tag['key'], array_keys($all_tags)) || ! $attributes['remove_deleted_categories'] ) ) {
                $output .= '<div class="push-notification-category">';
                $label = !empty ($all_tags[$tag['key']]) ? $all_tags[$tag['key']] : $tag['key'];
                $output .= '<label><input type="checkbox" value="' . $tag['key'] . '"' . ($tag['default_selection'] ? ' checked' : '') . ' />' . $label . '</label>';
                $output .= '</div>';
            }
        }

        $output .= '</div>';
    }

    $output .= $content;

    //$output .= '<div class="permission-status">';
    //$output .= '<div class="circle-loader" style="display:none"><div class="checkmark draw"></div><div class="block draw"></div></div>';
    //$output .= '<div class="permission-status-message"></div>';
    //$output .= '</div>';

    $output .= '</div>';

    $output .= '<script type="text/javascript">var OneSignal = OneSignal || []; OneSignal.push(function() {if (OneSignal.isPushNotificationsSupported()) { let elements = document.getElementsByClassName("wp-block-push-notification-signup"); for(let i = 0; i < elements.length; i++) { elements[i].classList.remove("notifications-not-supported"); } }});</script>';
    $output .= '<script defer type="text/javascript" src="' . \plugin_dir_url(__FILE__) . 'loader.js" ></script>';
    $output .= '<script defer type="text/javascript" src="' . \plugin_dir_url(__FILE__) . 'script.js" ></script>';

    return $output;

}