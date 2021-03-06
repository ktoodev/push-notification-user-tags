<?php 

namespace PushNotificationUserTags;

/**
 * Register the push signup block
 */
function push_tags_categories() {

	$script_asset_path = PLUGIN_DIR . "/blocks/build/push_categories/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/temp-push-setup" block first.'
		);
	}

    // register index script
	$index_js     = 'blocks/build/push_categories/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'push-tags-categories-editor',
		plugins_url( $index_js, PLUGIN_FILE ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'push-tags-categories-editor', 'push-notification-user-tags' );

    // localize scripts
	wp_localize_script( 
        'push-tags-categories-editor', 
        'push_notification_user_tags', 
        array (
            'tag_list' => \get_option('push_notification_user_tags_list', array()), 
            'admin_url' => \admin_url ('admin.php?page=push-notification-user-tags')
        )
    );



	// register block attributes
	$attributes = array (
		'default_tags' => array (
			'type' => 'object',
			'default' => array()
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

    // register th eblock
	register_block_type(
		'push-notification-user-tags/push-categories',
		array(
            'render_callback' => __NAMESPACE__ . '\render_categories_block',
			'attributes' => $attributes,
			'editor_script' => 'push-tags-categories-editor',
			'script'		=> 'push-categories-script',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\push_tags_categories' );

/**
 * Render the front end of the push signup block
 */
function render_categories_block ($attributes, $content) {
    
    // get all tags set in options
    $all_tags = \get_option('push_notification_user_tags_list', array());

    // the tags we'll be looping through - from settings AND the block if we're showing new tags; otherwise JUST the ones from the block
    $tags_to_show = $attributes['show_new_categories'] ? array_merge ($all_tags, $attributes['default_tags']) : $attributes['default_tags'];

	if (empty ($tags_to_show)) {
		return '';
	}

    $output = '';


	// wrapper around the categories
	$output .= '<div class="wp-block-push-notification-signup__categories" style="column-count:' . $attributes['columns'] . '">';

	// loop through all the tags saved in the block
	foreach ($tags_to_show as $tag) {
		
		// individual checkboxes
		if (isset ($tag['visible']) && $tag['visible'] && ( in_array ($tag['key'], array_keys($all_tags)) || ! $attributes['remove_deleted_categories'] ) ) {
			$output .= '<div class="push-notification-category">';

			$label = !empty ($all_tags[$tag['key']]['label']) ? $all_tags[$tag['key']]['label'] : $tag['key'];
			$output .= '<label><input type="checkbox" value="' . $tag['key'] . '"' . (!empty($tag['default_selection']) ? ' checked' : '') . ' />' . $label . '</label>';
			
			$output .= '</div>';
		}
	}

	$output .= '</div>';    // /wrapper around categories


    // scripts
    $output .= '<script type="text/javascript">var OneSignal = OneSignal || []; OneSignal.push(function() {if (OneSignal.isPushNotificationsSupported()) { let elements = document.getElementsByClassName("wp-block-push-notification-signup"); for(let i = 0; i < elements.length; i++) { elements[i].classList.remove("notifications-not-supported"); } }});</script>';

    return $output;

}
