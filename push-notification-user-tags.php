<?php
/**
 * Plugin Name: Push Notification User Tags
 * Description: Add data tags for users to target pushes when used with the OneSignal plugin.
 * Version: 0.1
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

