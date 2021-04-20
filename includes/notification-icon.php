<?php 
/**
 * Add a persistent floating notification bell
 */

namespace PushNotificationUserTags;

/**
 * Output the actual markup for the bell
 */
function add_notification_bell() {

    // bail if we shouldn't show the bell icon
    $onesignal_settings = \get_option('OneSignalWPSetting', array());
    $icon_settings = \get_option('push_notification_icon_settings', array());

    if ( ! empty ($onesignal_settings['notifyButton_enable']) || empty ($icon_settings['show_icon'])) {
        return;
    }
    


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

        $icon_options = \get_option('push_notification_icon_settings', array());

        $subscribed_tooltip = !empty ($icon_options['subscribed_tooltip']) ? '<div class="notification-icon_tooltip notification-icon_subscribed-tooltip">' . $icon_options['subscribed_tooltip'] . '</div>' : '';
        $unsubscribed_tooltip = !empty ($icon_options['unsubscribed_tooltip']) ? '<div class="notification-icon_tooltip notification-icon_unsubscribed-tooltip">' . $icon_options['unsubscribed_tooltip'] . '</div>' : '';

        echo '<div class="notification-icon is-not-subscribed">' . $svg_contents . $subscribed_tooltip . $unsubscribed_tooltip . '</div>';
    }


    /* subscription popup */
    $current_tags = \get_option('push_notification_user_tags_list', array());
    $popup_options = \get_option('push_notification_popup_info', array());

    $output = '';
    $output .= '<div class="notification-background-wrapper signup-hidden">';
    $output .= '<div class="wp-block-push-notification-signup popup" role="dialog"  aria-labelledby="notification-description" aria-modal="true">';
    $output .= '<button class="cancel-popup exit-button" aria-label="close">&times;</button>';

    $output .= !empty ($popup_options['signup_content']) ? '<div class="notification-description signup" id="notification-description">' . $popup_options['signup_content'] . '</div>' : '';

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

    $signup_button_label = !empty ($popup_options['signup_button']) ? $popup_options['signup_button'] : 'Sign up';
    $output .= '<div class="wp-block-button alignright push-notification-signup"><a class="cancel-popup">Cancel</a><a class="wp-block-button__link">' . $signup_button_label . '</a></div>';
    $output .= '</div>';
    $output .= '</div>';

    echo $output;
}
\add_action( 'wp_footer', __NAMESPACE__ . '\add_notification_bell' );


/**
 * Enqueue styles and scripts used by the bell 
 */
function enqueue_notification_bell() {

    // bail if we shouldn't show the bell icon
    $onesignal_settings = \get_option('OneSignalWPSetting', array());
    $icon_settings = \get_option('push_notification_icon_settings', array());

    if ( ! empty ($onesignal_settings['notifyButton_enable']) || empty ($icon_settings['show_icon'])) {
        return;
    }
    

    // enqueue assets the icon needs to work
    wp_enqueue_script( 'notification-bell', plugin_dir_url(PLUGIN_FILE) . 'assets/js/bell.js', array (), '0.1', true);
    wp_enqueue_style( 'notification-bell', plugin_dir_url(PLUGIN_FILE) . 'assets/css/bell.css', array (), '0.1');

    
    $popup_options = \get_option('push_notification_popup_info', array());

    // localize popup options (so script can dynamically change things like messages for whether the user is signed in)
	wp_localize_script( 
        'notification-bell', 
        'push_notification_popup_options', 
        $popup_options
    );
    
    $icon_options = \get_option('push_notification_icon_settings', array());

    // localize icon options 
	wp_localize_script( 
        'notification-bell', 
        'push_notification_icon_settings', 
        $icon_options
    );
}
\add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_notification_bell' );

/**
 * Output header CSS for configurable style options
 */
function icon_options_head_styles () {
    $options = \get_option('push_notification_icon_settings', Tag_Admin_Page::$icon_defaults);
    $options = array_merge (Tag_Admin_Page::$icon_defaults, $options);
    ?>
<style>
.notification-bell-icon-img .icon-background {
    fill:<?php echo $options['icon_background']; ?>;
}

.notification-bell-icon-img .icon-foreground {
    fill:<?php echo $options['icon_foreground']; ?>;
}
.notification-icon_tooltip {
    background:<?php echo $options['tooltip_background']; ?>;
    color: <?php echo $options['tooltip_text_color']; ?>;
    border: 1px solid <?php echo $options['tooltip_border_color']; ?>;
}


<?php if ($options['icon_align'] == 'bottom-left'): ?>

    .notification-icon_tooltip {
        position: absolute;
        left: 80%;
        top: 50%;
        transform-origin: left center;
        padding: 6px 10px 6px 16px;
    }
    .notification-icon {
        left: 10px;
    }

<?php elseif ($options['icon_align'] == 'bottom-right'): ?>

    .notification-icon_tooltip {
        right: 80%;
        transform-origin: right center;
        padding: 6px 16px 6px 10px;
    }
    .notification-icon {
        right: 10px;
    }

<?php endif; ?>


</style>
    <?php 
}
\add_action( 'wp_head', __NAMESPACE__ . '\icon_options_head_styles' );
