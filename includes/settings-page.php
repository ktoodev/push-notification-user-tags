<?php 

namespace PushNotificationUserTags;

new Tag_Admin_Page();

/**
 * Add a settings page to the OneSignal settings area to administer tags
*/
class Tag_Admin_Page {

    /**
     * Hook for the sub page
     */
    private $hook;

    /**
     * Capability to administer tags
     */
    private $capability = 'manage_options';

    /**
     * Default options for popup
     */
    public static $popup_defaults = array(
        'signup_content'    => "Sign up for the categories you'd like us to notify you about.",
        'signup_button'     => 'Sign up',
        'update_content'    => "Update the categories you'd like us to notify you about.",
        'update_button'     => 'Update notifications'
    );
    
    /**
     * Default options for popup
     */
    public static $icon_defaults = array(
        'show_icon'             => false,
        'unsubscribed_tooltip'  => "Sign up for notifications",
        'subscribed_tooltip'    => "Update notification options",
        'icon_background'       => "#999999",
        'icon_foreground'       => 'white',
        'tooltip_background'    => '#333333',
        'tooltip_text_color'    => 'white',
        'tooltip_border_color'  => 'white',
        'icon_align'            => 'bottom-left',
    );

    /**
     * Construct the page 
     */
    function __construct () {
        \add_action( 'admin_menu', array ($this, 'tag_admin_page' ), 20);
        \add_action ('admin_enqueue_scripts', array ($this, 'tag_page_scripts'));
        \add_action ('admin_post_push_notifications_save_user_tags', array ($this, 'save_category_tags'));
        \add_action ('admin_post_push_notifications_popup_settings', array ($this, 'save_popup_settings'));
        \add_action ('admin_post_push_notifications_icon_settings', array ($this, 'save_icon_settings'));
    }


    /**
     * Add a page for administering tags under the OneSignal page
     */
    function tag_admin_page() {
        $this->hook = add_submenu_page(
            'onesignal-push',               // parent
            'Push category tags',           // title 
            'Push Categories',                // menu title
            $this->capability,               // capability
            'push-notification-user-tags',  // slug
            array ($this, 'tag_admin_content')       // content 
        );
    }


    /**
     * Output the content for the tag admin page
     */
    function tag_admin_content () {
        if ( ! current_user_can( $this->capability ) ) {
			wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'push-notification-user-tags' ) );
		}

        ?>
        <h1 class="title"><?php esc_html_e('Push settings', 'push-notification-user-tags'); ?></h1>


        <h2 class="title"><?php esc_html_e('Categories', 'push-notification-user-tags'); ?></h2>

        <p><?php esc_html_e('The "key" fields here will show up as tag keys in OneSignal (the value will be 1 for users who select that category and will be 0 or will not exist for other users).', 'push-notification-user-tags'); ?>
        <p><?php esc_html_e('The "label" field from this page is only used within WordPress to identify each category - you won\'t find it in OneSignal.', 'push-notification-user-tags'); ?>

        <?php $current_tags = \get_option('push_notification_user_tags_list', array()); ?>


        <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
            <input type="hidden" name="action" value="push_notifications_save_user_tags">

            <table class="push-tag-list wp-list-table widefat fixed striped table-view-list" role="presentation">
                <thead>
                    <tr>
                        <th class="column-name" id="tag-key-text">Key</th>
                        <th class="column-name" id="tag-label-text">Label</th>
                        <th class="column-name" id="tag-popup-visible">Visible in popup</th>
                        <th class="column-name" id="tag-popup-default-checked">Checked by default in popup</th>
                        <th class="delete-column"></th>
                    </tr>
                </thead>
                    
                <tbody>
                    <tr class="repeatable-template">
                        <td><input name="tags[keys][%row%]" aria-labelledby="tag-key-text" type="text" /></td>
                        <td><input name="tags[labels][%row%]" aria-labelledby="tag-label-text" type="text" /></td>
                        <td><input name="tags[visible][%row%]" aria-labelledby="tag-popup-visible" type="checkbox" value="1"  /></td>
                        <td><input name="tags[checked][%row%]" aria-labelledby="tag-popup-default-checked" type="checkbox" value="1" /></td>
                        <td><input type="button" class="button delete" value="Delete" /></td>
                    </tr>

                    <?php
                    $row = 0;
                    foreach ($current_tags as $key => $tag): ?>
                    
                    <tr>
                        <td><input name="tags[keys][<?php echo $row; ?>]" aria-labelledby="tag-key-text" type="text" value="<?php echo $key; ?>" /></td>
                        <td><input name="tags[labels][<?php echo $row; ?>]" aria-labelledby="tag-label-text" type="text" value="<?php echo $tag['label']; ?>" /></td>
                        <td><input name="tags[visible][<?php echo $row; ?>]" aria-labelledby="tag-popup-visible" type="checkbox" value="1" <?php echo (!empty ($tag['visible']) ? ' checked' : ''); ?>/></td>
                        <td><input name="tags[checked][<?php echo $row; ?>]" aria-labelledby="tag-popup-default-checked" type="checkbox" value="1" <?php echo (!empty ($tag['checked']) ? ' checked' : ''); ?> /></td>
                        <td><input type="button" class="button delete" value="Delete" /></td>
                    </tr>

                    <?php 
                    $row++;
                    endforeach; 
                    ?>
                </tbody>
            </table>
            <input type="button" class="button add-push-tag" value="Add push category" />
            <?php \wp_nonce_field( 'push_tags_save', 'push_tags_admin_nonce' ); ?>
            <?php \submit_button( __( 'Save category tags', 'push-notification-user-tags' ), 'primary' ); ?>
        </form>

        
        <h2 class="title"><?php esc_html_e('Popup settings', 'push-notification-user-tags'); ?></h2>

        <?php $popup_settings = \get_option('push_notification_popup_info', self::$popup_defaults); ?>

        <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
            <input type="hidden" name="action" value="push_notifications_popup_settings">
        
            <hr />
            <h3 class="title"><?php esc_html_e('For users who are not subscribed', 'push-notification-user-tags'); ?></h3>

            <div class="popup-content-editor">
                <?php wp_editor ($popup_settings['signup_content'], 'signup_content', array ('media_buttons' => false, 'textarea_rows' => 5)); ?>
            </div>

            <table class="form-table" role="presentation">

                <tbody>
                    <tr>
                        <th scope="row"><label for="popup-button-signup"><?php esc_html_e('Signup button text', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="text" id="popup-button-signup" name="signup_button" value="<?php echo $popup_settings['signup_button']; ?>" /></td>
                    </tr>
                </tbody>
            </table>

            
            <hr />
            <h3 class="title"><?php esc_html_e('For users who are currently subscribed', 'push-notification-user-tags'); ?></h3>

            <div class="popup-content-editor">
                <?php wp_editor ($popup_settings['update_content'], 'update_content', array ('media_buttons' => false, 'textarea_rows' => 5)); ?>
            </div>

            
            <table class="form-table" role="presentation">

                <tbody>
                    <tr>
                        <th scope="row"><label for="popup-button-update"><?php esc_html_e('Update button text', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="text" id="popup-button-update" name="update_button" value="<?php echo $popup_settings['update_button']; ?>" />
                        <p class="description"><?php esc_html_e('Shown to already-subscribed users who are updating their options.', 'push-notification-user-tags'); ?></p></td>
                    </tr>
                </tbody>
            </table>

            <?php \wp_nonce_field( 'tags_save_popup_options', 'push_tags_admin_nonce' ); ?>
            <?php \submit_button( __( 'Save popup options', 'push-notification-user-tags' ), 'primary' ); ?>
        </form>



        <h2 class="title"><?php esc_html_e('Notification icon settings', 'push-notification-user-tags'); ?></h2>

        <?php $icon_settings = \get_option('push_notification_icon_settings', self::$icon_defaults); ?>
        
        <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
            <input type="hidden" name="action" value="push_notifications_icon_settings">


            <table class="form-table" role="presentation">

                <tbody>
                    <tr>
                        <?php 
                        $onesignal_settings = \get_option('OneSignalWPSetting', array());
                        $disabled = '';
                        $bell_message = '';
                        if ( ! empty ($onesignal_settings['notifyButton_enable'])) {
                            $disabled = ' disabled ';
                            $bell_message = '<p style="display:inline;font-weight:bold; color:red">' . esc_html__('Disabled because the OneSignal notification bell is turned on.', 'push-notification-user-tags') . '</p>';
                        }
                        
                        $checked = '';
                        if ( ! $disabled && ! empty ($icon_settings['show_icon'])) {
                            $checked = ' checked ';
                        }

                        ?>

                        <th scope="row"><label for="show_icon"><?php esc_html_e('Show floating icon', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="checkbox" id="show_icon" name="show_icon" value="1" <?php echo $disabled . $checked; ?> /><?php echo $bell_message; ?>
                        <p class="description"><?php esc_html_e('Only available when OneSignal notification bell is turned off.', 'push-notification-user-tags'); ?></p></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="unsubscribed_tooltip"><?php esc_html_e('Tooltip for unsubscribed users', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="text" id="unsubscribed_tooltip" name="unsubscribed_tooltip" value="<?php echo $icon_settings['unsubscribed_tooltip'] ?? ''; ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="subscribed_tooltip"><?php esc_html_e('Tooltip for subscribed users', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="text" id="subscribed_tooltip" name="subscribed_tooltip" value="<?php echo $icon_settings['subscribed_tooltip'] ?? ''; ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="icon_background"><?php esc_html_e('Icon background color', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="text" id="icon_background" name="icon_background" value="<?php echo $icon_settings['icon_background'] ?? ''; ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="icon_foreground"><?php esc_html_e('Icon foreground color', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="text" id="icon_foreground" name="icon_foreground" value="<?php echo $icon_settings['icon_foreground'] ?? ''; ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tooltip_background"><?php esc_html_e('Tooltip background color', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="text" id="tooltip_background" name="tooltip_background" value="<?php echo $icon_settings['tooltip_background'] ?? ''; ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tooltip_border_color"><?php esc_html_e('Tooltip border color', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="text" id="tooltip_border_color" name="tooltip_border_color" value="<?php echo $icon_settings['tooltip_border_color'] ?? ''; ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tooltip_text_color"><?php esc_html_e('Tooltip text color', 'push-notification-user-tags'); ?></label></th>
                        <td><input type="text" id="tooltip_text_color" name="tooltip_text_color" value="<?php echo $icon_settings['tooltip_text_color'] ?? ''; ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e('Icon alignment', 'push-notification-user-tags'); ?></th>
                        <td>
                            <input type="radio" id="icon_align_bottom_left" name="icon_align" value="bottom-left" <?php echo (isset ($icon_settings['icon_align']) &&$icon_settings['icon_align'] == 'bottom-left' ? 'checked' : ''); ?> />
                            <label for="icon_align_bottom_left" style="margin-right:30px;">Bottom left</label>
                            <input type="radio" id="icon_align_bottom_right" name="icon_align" value="bottom-right" <?php echo (isset ($icon_settings['icon_align']) &&$icon_settings['icon_align'] == 'bottom-right' ? 'checked' : ''); ?> />
                            <label for="icon_align_bottom_right">Bottom right</label>
                        </td>
                    </tr>
                </tbody>

            </table>

            
            <?php \wp_nonce_field( 'tags_save_icon_options', 'push_tags_admin_nonce' ); ?>
            <?php \submit_button( __( 'Save icon options', 'push-notification-user-tags' ), 'primary' ); ?>

        </form>
        <?php 
    }


    /**
     * Enqueue the scripts for this page 
     */
    function tag_page_scripts ($hook) {
        if ($hook == $this->hook) {
            \wp_enqueue_script( 'push-notification-user-tags-admin-script', plugin_dir_url( PLUGIN_FILE ) . 'assets/admin/js/tags.js', array( 'jquery' ), '0.0.1', true );
            \wp_enqueue_style( 'push-notification-user-tags-admin-styles', plugin_dir_url( PLUGIN_FILE ) . 'assets/admin/css/tags.css', array( ), '0.0.1' );
        }
    }


    /**
     * Saves push category tags
     */
    function save_category_tags () {
                
        // check user capability
        if ( ! \current_user_can( $this->capability ) ) {
			\wp_die( \esc_html__( 'You do not have sufficient permissions to access this page.', 'push-notification-user-tags' ) );
		}

        // check nonce 
        if ( ! isset( $_POST['push_tags_admin_nonce'] ) || ! \wp_verify_nonce( \sanitize_text_field( \wp_unslash( $_POST['push_tags_admin_nonce'] ) ), 'push_tags_save' ) ) { 
			\wp_die( \esc_html__('You are not authorized to perform that action', 'push-notification-user-tags' ) );
		}

        // if tags exist 
        if (isset ($_POST['tags']['labels']) && isset ($_POST['tags']['keys']) && is_array  ($_POST['tags']['labels']) && is_array ($_POST['tags']['keys'])) {

            // convert tags posted from form to array
            $tags = array();
            for ($tag_index = 0; $tag_index < count($_POST['tags']['labels']); $tag_index++) {
                $tag = array();
                $tag['label'] = isset ($_POST['tags']['labels'][$tag_index]) ? $_POST['tags']['labels'][$tag_index] : '';
                $tag['visible'] = !empty($_POST['tags']['visible'][$tag_index]);
                $tag['checked'] = !empty($_POST['tags']['checked'][$tag_index]);
                
                
                // if the key is empty, make one from the label
                $key = !empty ($_POST['tags']['keys'][$tag_index]) ? $_POST['tags']['keys'][$tag_index] : $tag['label'];
                
                // continue if nothing in this row
                if (empty ($tag['label']) && empty ($key)) {
                    continue;
                }

                $tag['key'] = $key = \sanitize_title ($key);

                $tags[$key] = $tag;
            }

            // save tag array as option 
            \update_option ('push_notification_user_tags_list', $tags);
        }

        return \wp_safe_redirect (\admin_url ('admin.php?page=push-notification-user-tags&saved=1'));
    }


    /**
     * Save popup settings
     */
    function save_popup_settings () {
        
        // check user capability
        if ( ! \current_user_can( $this->capability ) ) {
			\wp_die( \esc_html__( 'You do not have sufficient permissions to access this page.', 'push-notification-user-tags' ) );
		}

        // check nonce 
        if ( ! isset( $_POST['push_tags_admin_nonce'] ) || ! \wp_verify_nonce( \sanitize_text_field( \wp_unslash( $_POST['push_tags_admin_nonce'] ) ), 'tags_save_popup_options' ) ) { 
			\wp_die( \esc_html__('You are not authorized to perform that action', 'push-notification-user-tags' ) );
		}

        $option = \get_option('push_notification_icon_settings', self::$icon_defaults);

        if (isset ($_POST['signup_content'])) {
            $option['signup_content'] = stripslashes (\wp_kses_post($_POST['signup_content']));
        }
        if (isset ($_POST['signup_button'])) {
            $option['signup_button'] = stripslashes (\wp_kses_post($_POST['signup_button']));
        }
        if (isset ($_POST['update_content'])) {
            $option['update_content'] = stripslashes (\wp_kses_post($_POST['update_content']));
        }
        if (isset ($_POST['update_button'])) {
            $option['update_button'] = stripslashes (\wp_kses_post($_POST['update_button']));
        }

        \update_option ('push_notification_popup_info', $option);
        
        return \wp_safe_redirect (\admin_url ('admin.php?page=push-notification-user-tags&saved=1'));
    }


    /**
     * Save popup settings
     */
    function save_icon_settings () {
        
        // check user capability
        if ( ! \current_user_can( $this->capability ) ) {
			\wp_die( \esc_html__( 'You do not have sufficient permissions to access this page.', 'push-notification-user-tags' ) );
		}

        // check nonce 
        if ( ! isset( $_POST['push_tags_admin_nonce'] ) || ! \wp_verify_nonce( \sanitize_text_field( \wp_unslash( $_POST['push_tags_admin_nonce'] ) ), 'tags_save_icon_options' ) ) { 
			\wp_die( \esc_html__('You are not authorized to perform that action', 'push-notification-user-tags' ) );
		}

        $option = \get_option('push_notification_icon_settings', self::$popup_defaults);

        foreach (array_keys (self::$icon_defaults) as $field) {
            if (isset ($_POST[$field])) {
                $option[$field] = sanitize_text_field($_POST[$field]);
            }
            else {
                $option[$field] = false;
            }
        }

        \update_option ('push_notification_icon_settings', $option);
        
        return \wp_safe_redirect (\admin_url ('admin.php?page=push-notification-user-tags&saved=1'));
    }
}