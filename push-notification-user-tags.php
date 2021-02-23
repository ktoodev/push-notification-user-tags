<?php
/**
 * Plugin Name: Push Notification User Tags
 * Description: Add data tags for users to target pushes when used with the OneSignal plugin.
 * Version: 0.2
 * Author: David Purdy, KTOO
 * Author URI: https://www.ktoo.org
 * Text Domain: push-notification-user-tags
 */

 namespace PushNotificationUserTags;


define (__NAMESPACE__ . '\PLUGIN_DIR', __DIR__);
define (__NAMESPACE__ . '\PLUGIN_FILE', __FILE__);


require_once (PLUGIN_DIR . '/includes/settings-page.php');
require_once (PLUGIN_DIR . '/includes/meta-box.php');
require_once (PLUGIN_DIR . '/includes/notification-icon.php');

// blocks 
require_once (PLUGIN_DIR . '/blocks/src/push_signup/index.php');
require_once (PLUGIN_DIR . '/blocks/src/push_categories/index.php');


// make sure the main OneSignal plugin is active
require_once( ABSPATH . 'wp-admin/includes/plugin.php' );

if( ! \is_plugin_active( 'onesignal-free-web-push-notifications/onesignal.php' ) ) {
    
    // Deactivate this plugin
    deactivate_plugins( plugin_basename( PLUGIN_FILE ) );

    // show an admin error
    add_action( 'admin_notices', function() {
        ?>
        <div class="updated error">
            <p>
                <?php
                _e( 'Push Notification User Tags has been deactivated because it requires The OneSignal plugin to be active', 'push-notification-user-tags' );
                ?>
            </p>
        </div>
        <?php
        if ( isset( $_GET['activate'] ) ) {
            unset( $_GET['activate'] );
        }
    } );
}
