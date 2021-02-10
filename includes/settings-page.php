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
     * Construct the page 
     */
    function __construct () {
        \add_action( 'admin_menu', array ($this, 'tag_admin_page' ), 20);
        \add_action ('admin_enqueue_scripts', array ($this, 'tag_page_scripts'));
        \add_action ('admin_post_push_notifications_save_user_tags', array ($this, 'save_category_tags'));
    }


    /**
     * Add a page for administering tags under the OneSignal page
     */
    function tag_admin_page() {
        $this->hook = add_submenu_page(
            'onesignal-push',               // parent
            'Push category tags',           // title 
            'Category tags',                // menu title
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
        <h1 class="test"><?php esc_html_e('Push categories', 'push-notification-user-tags'); ?></h1>

        <p><?php esc_html_e('The "key" fields here will show up as tag keys in OneSignal (the value will be 1 for users who select that category and will be 0 or will not exist for other users).', 'push-notification-user-tags'); ?>
        <p><?php esc_html_e('The "label" field from this page is only used within WordPress to identify each category - you won\'t find it in OneSignal.', 'push-notification-user-tags'); ?>

        <?php $current_tags = \get_option('push_notification_user_tags_list'); ?>


        <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
            <input type="hidden" name="action" value="push_notifications_save_user_tags">

            <table class="push-tag-list wp-list-table widefat fixed striped table-view-list" role="presentation">
                <thead>
                    <tr>
                        <th class="column-name" id="tag-key-text">Key</th>
                        <th class="column-name" id="tag-label-text">Label</th>
                        <th class="delete-column"></th>
                    </tr>
                </thead>
                    
                <tbody>
                    <tr class="repeatable-template">
                        <td><input name="tags[keys][]" aria-labelledby="tag-key-text" /></td>
                        <td><input name="tags[labels][]" aria-labelledby="tag-label-text" /></td>
                        <td><input type="button" class="button delete" value="Delete" /></td>
                    </tr>

                    <?php foreach ($current_tags as $key => $label): ?>
                    
                    <tr>
                        <td><input name="tags[keys][]" aria-labelledby="tag-key-text" value="<?php echo $key; ?>" /></td>
                        <td><input name="tags[labels][]" aria-labelledby="tag-label-text" value="<?php echo $label; ?>" /></td>
                        <td><input type="button" class="button delete" value="Delete" /></td>
                    </tr>

                    <?php endforeach; ?>
                </tbody>
            </table>
            <input type="button" class="button add-push-tag" value="Add push category" />
            <?php \wp_nonce_field( 'push_tags_save', 'push_tags_admin_nonce' ); ?>
            <?php \submit_button( __( 'Save tags', 'push-notification-user-tags' ), 'primary' ); ?>
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
                $label = $_POST['tags']['labels'][$tag_index];
                $key = $_POST['tags']['keys'][$tag_index];

                // continue if nothing in this row
                if (empty ($label) && empty ($key)) {
                    continue;
                }

                // if the key is empty, make one from the label
                $key = !empty ($key) ? $key : $label;

                $key = \sanitize_title ($key);

                $tags[$key] = $label;
            }

            // save tag array as option 
            \update_option ('push_notification_user_tags_list', $tags);
        }

        return \wp_safe_redirect (\admin_url ('admin.php?page=push-notification-user-tags&saved=1'));
    }
}