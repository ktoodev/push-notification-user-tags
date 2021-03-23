<?php 
/**
 * Meta box to specify the categories used for a OneSignal push
 */
namespace PushNotificationUserTags;


/**
 * Check if the OneSignal meta box exists 
 */
function onesignal_metabox_exists () {
    global $wp_meta_boxes, $post, $typenow;

    // find the current post type
    if ($post && $post->post_type) $post_type = $post->post_type;
	elseif($typenow) $post_type = $typenow;	
	elseif(function_exists ('get_current_screen') && get_current_screen()->post_type) $post_type = get_current_screen()->post_type;
	
    // if there are no meta boxes registered for this post type
    if ( ! isset ($wp_meta_boxes[$post_type])) {
        return false;
    }

    // call recursive function to search for the OneSignal meta box ID
    return find_id ('top', $wp_meta_boxes[$post_type], 'onesignal_notif_on_post');
}

/**
 * Recursively search array for meta box ID
 */
function find_id ($key, $value, $id) {

    // base case
    if ( ! is_array ($value) ) {
        return ( $key == 'id' && $value == $id );
    }
    else {
        foreach ($value as $next_key => $next_value) {
            if ( find_id ($next_key, $next_value, $id) ) {
                return true;
            }
        }
        return false;
    }
}


/**
 * Register the meta box
 */
function initialize_meta_box () {
    $args = array(
        'public' => true,
        '_builtin' => false,
    );
    $post_types = array_merge (\get_post_types($args), array ('post'));

    if ( ! onesignal_metabox_exists() ) {
        return;
    }

    foreach ($post_types  as $post_type) {
        add_meta_box(
            'push_notification_user_tags',
            __('Push Notification Categories', 'push-notification-user-tags'),
            __NAMESPACE__ . '\meta_box_content',
            $post_type,
            'side',
            'low'
        );
    }
}
\add_action('add_meta_boxes', __NAMESPACE__ .  '\initialize_meta_box', 30);


/**
 * Meta box content
 */
function meta_box_content ($post, $args) {
    $tags = \get_option('push_notification_user_tags_list', array());

    $meta = \get_post_meta ($post->ID, 'push_notification_user_tags_list', true);
    if (!is_array($meta) || empty ($meta)) {
        $meta = array();
    }
    ?>

    <?php esc_html_e('Send a push notification to users subscribed to any of the following categories:', 'push-notification-user-tags'); ?>

    <?php \wp_nonce_field( 'push_tags_add_to_post', 'push_tags_admin_nonce' ); ?>

    <?php foreach ($tags as $key => $tag): ?>
        <?php 
        $label = !empty ($tag['label']) ? $tag['label'] : '<em style="opacity:0.8">' . $key . '</em>'; 
        $checked = in_array($key, $meta) ? ' checked' : '';
        ?>
        <div class="push_notification_user_tag"><label><input type="checkbox" name="push_tags_for_post[]" value="<?php echo $key; ?>" <?php echo $checked; ?> /><?php echo $label; ?></label></div>
    <?php endforeach; ?>

    
    <a href="<?php echo \admin_url ('admin.php?page=push-notification-user-tags'); ?>" target="_blank" style="text-align: right; display: block; font-style: italic; margin-top: 5px;">
        <?php esc_html_e('Edit these categories', 'push-notification-user-tags'); ?>
    </a>
    
    <script>
    jQuery( document ).ready(function( $ ) {
        
        // set initial state: tag checkboxes only enabled when push is enabled
        $('.push_notification_user_tag input').prop('disabled', ! $('#send_onesignal_notification').prop('checked'));

        // when push state changes, change whether tag checkboxes are disabled
        $('#send_onesignal_notification').on('change', function (event) {
            $('.push_notification_user_tag input').prop('disabled', !event.target.checked);
        });


        // move tag checkboxes into main metabox
        $('<hr style=" margin: 12px 0; border-top: 1px solid #8e8e8e;"></hr>').appendTo('#onesignal_notif_on_post .inside');
        $('#push_notification_user_tags .inside').contents().appendTo('#onesignal_notif_on_post .inside');
        $('#push_notification_user_tags').hide();
    });
    </script>
    <?php 
}

/**
 * Save push categories to post
 */
function save_push_categories_to_post ( $post_id ) {
    if ( array_key_exists( 'push_tags_for_post', $_POST ) ) {
        update_post_meta(
            $post_id,
            'push_notification_user_tags_list',
            $_POST['push_tags_for_post']
        );
    }
}
add_action( 'save_post', __NAMESPACE__ . '\save_push_categories_to_post' );


/**
 * Intercept the default OneSignal push and send selectively
 */
function send_notification_tag_filter($fields, $new_status, $old_status, $post) {

    $filters = array();
    foreach ($_POST['push_tags_for_post'] as $key) {
        $filters[] = array (
            'field'     => 'tag',
            'key'       => $key,
            'relation'  => '=', 
            'value'     => '1'
        );
        $filters[] = array (
            'operator'  => 'OR'
        );
    }

    // remove the last dangling "OR"
    array_pop ($filters);
    
    $fields['filters'] = $filters;
    return $fields;
}
add_filter('onesignal_send_notification', __NAMESPACE__ . '\send_notification_tag_filter', 10, 4);