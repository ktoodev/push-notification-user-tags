<?php 

namespace PushNotificationUserTags;


/**
 * Register the meta box
 */
function initialize_meta_box () {
    $args = array(
        'public' => true,
        '_builtin' => false,
    );
    $post_types = array_merge (\get_post_types($args), array ('post'));

    foreach ($post_types  as $post_type) {
        add_meta_box(
            'push_notification_user_tags',
            __('Push Notification Categories', 'push-notification-user-tags'),
            __NAMESPACE__ . '\meta_box_content',
            $post_type,
            'side',
            'high'
        );
    }
}
\add_action('admin_init', __NAMESPACE__ .  '\initialize_meta_box', 11);


/**
 * Meta box content
 */
function meta_box_content () {
    $tags = \get_option('push_notification_user_tags_list');
    ?>
    
    <?php \wp_nonce_field( 'push_tags_add_to_post', 'push_tags_admin_nonce' ); ?>

    <?php foreach ($tags as $key => $label): ?>
        <?php $label = !empty ($label) ? $label : '<em style="opacity:0.8">' . $key . '</em>'; ?>
        <div class="push_notification_user_tag"><label><input type="checkbox" name="push_tags_for_post[]" value="<?php echo $key; ?>" /><?php echo $label; ?></label></div>
    <?php endforeach; ?>

    
    <a href="<?php echo \admin_url ('admin.php?page=push-notification-user-tags'); ?>" target="_blank"><?php esc_html_e('Edit these categories', 'push-notification-user-tags'); ?></a>

    
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