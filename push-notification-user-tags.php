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

// blocks 
require_once (PLUGIN_DIR . '/blocks/src/push_signup/index.php');


function add_notification_bell() {
    $bell_image = PLUGIN_DIR . '/assets/img/notification-icon-bell.svg';

    // if the file exists, get its contents and build the inline logo markup
    if (file_exists ($bell_image)) {
        $svg_contents = file_get_contents($bell_image);

        // remove comments
        $svg_contents = preg_replace('/<!--(.|\s)*?-->/', '', $svg_contents);

        //remoe XML tag
        $svg_contents = preg_replace('/<(\s)?\?xml\s[^>]+>/', '', $svg_contents);

        $image_alt = 'Site notifications';

        // insert alt info into the SVG title element for accessibility
    
        // add a title tag with the ALT text
        $svg_contents = preg_replace ('/<svg[^>]*>\s*/mi', '$0<title id="logo_alt">' . $image_alt . '</title>', $svg_contents);

        // Add the aria-lablledby attribute to <svg> pointing to the title
        $svg_contents = preg_replace ('/(<svg[^>]*)(>)/mi', '$1  aria-labelledby="logo_alt" $2', $svg_contents);


        
        // add role
        if (!preg_match ('/<svg[^>]*\srole\s*=[^>]*>/mi', $svg_contents) ) {		// there's no role
            $svg_contents = preg_replace ('/(<svg[^>]*)(>)/mi', '$1  role="img" $2', $svg_contents);
        }

        // add class
        if (!preg_match ('/<svg[^>]*\sclass\s*=[^>]*>/mi', $svg_contents) ) {		// there's no role
                $svg_contents = preg_replace ('/(<svg[^>]*)(>)/mi', '$1  class="notification-bell" $2', $svg_contents);
        }
        else {
            $svg_contents = preg_replace ('/(<svg[^>]*\sclass\s*=)([\'"]?)((.(?!\2))*.)\2([^>]*>)/im', '$1"$3 notification-bell" $5', $svg_contents);
        }

        echo '<div class="notification-icon">' . $svg_contents . '</div>';
    }


    /* subscription popup */
    $current_tags = \get_option('push_notification_user_tags_list', array());

    $output = '';
    $output .= '<div class="notification-background-wrapper signup-hidden">';
    $output .= '<div class="wp-block-push-notification-signup popup">';
    if (is_array ($current_tags) && !empty ($current_tags)) {
        $output .= '<div class="wp-block-push-notification-signup__categories" style="column-count:2">';
        foreach ($current_tags as $tag) {

            // individual checkboxes
            if (isset ($tag['visible']) && $tag['visible'] ) {
                $output .= '<div class="push-notification-category">';

                $label = !empty ($tag['label']) ? $tag['label'] : $tag['key'];
                $output .= '<label><input type="checkbox" value="' . $tag['key'] . '"' . (!empty($tag['checked']) ? ' checked' : '') . ' />' . $label . '</label>';
                
                $output .= '</div>';
            }
        }
        $output .= '</div>';
    }

    $output .= '<div class="wp-block-button alignright push-notification-signup"><a class="cancel-popup">Cancel</a><a class="wp-block-button__link">Sign up</a></div>';
    $output .= '</div>';
    $output .= '</div>';

    echo $output;
}
\add_action( 'wp_footer', __NAMESPACE__ . '\add_notification_bell' );



function enqueue_notification_bell() {
    wp_enqueue_script( 'notification-bell', plugin_dir_url(PLUGIN_FILE) . 'assets/js/bell.js', array (), '0.1', true);
    wp_enqueue_style( 'notification-bell', plugin_dir_url(PLUGIN_FILE) . 'assets/css/bell.css', array (), '0.1');
}
\add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_notification_bell' );