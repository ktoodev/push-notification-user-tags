# Push Notification User Tags

Works with OneSignal to allow site visitors to choose specific categories of notifications to get when they sign up for push notifications by adding data tags on signup. 

**Please note, this is still an early pre-release of this plugin, and it is still being tested. Features may change and break (or not work to begin with!) or it could conflict with your site in unexpected ways. Not intended for installation on production sites!**

## Install

The easiest way to install is to download [the latest release](https://github.com/ktoodev/push-notification-user-tags/releases/).

## Setup 

Push Notification User Tags extends the [OneSignal plugin](https://wordpress.org/plugins/onesignal-free-web-push-notifications/) to add an interface for site visitors to choose their notification categories and an admin interface to choose which categories should receive push notifications for any given post publish/update. 

This plugin adds a new settings page under the OneSignal plugin.

![The WordPress dashboard side menu showing "OneSignal Push" with "Push Categories" underneath it](https://docs.ktoo.media/wp-content/uploads/2021/02/OneSignal-submenu.png)

This section includes settings for letting users select notification categories to subscribe to.

### Categories
Here's where you define the categories users can subscribe to. 

![A list of categories showing the fields below](https://docs.ktoo.media/wp-content/uploads/2021/02/PushNotifications-define-categories.png)

For each category you can set:
- **Key** - The actual tag value that will be sent to OneSignal (you can see this under "tags" in the OneSignal dashboard). **Changing a category's key will effectively create a new category and you will no longer be able to push to the old key from the post editing screen**
- **Label** - This is only used within WordPress to identify the category for site visitors and administrators. It is not sent to OneSignal. You can change the label at any time without affecting subscriptions/pushes to the underlying key.
- **Visible in popup** - Whether or not to show this category in the popup that's triggered by clicking on the bell notification icon (see below)
- **Checked by default in popup** - Whether or not this category is pre-selected in the bell popup for users who haven't selected any categories yet.

### Popup settings
Settings for the popup window that appears when the bell icon is clicked.

![Popup settings, showing two sections, each with a larger rich text editing area and a smaller "button text" text field](https://docs.ktoo.media/wp-content/uploads/2021/02/PushCategories-popup-settings.png)

There are two sections:
- **For users who are not subscribed** is shown to users who are not currently subscribed to notifications (including users who have de-selected all notification categories)
- **For users who are currently subscribed** is shown to users who have given permission for notifications **and** are signed up for at least one notification category

Each section has a rich text area (to edit the content that goes before the category checkboxes) and a field to edit the text for the submit button.

### Notification icon/bell settings

This setting enables a floating notification bell. It is similar to the feature in the OneSignal WordPress plugin, but launches a popup to allow users to select categories before triggering the native browser notification permission prompt. 

![Enable or disable the notification icon and change its appearance, including colors, alignment, and tooltip text](https://docs.ktoo.media/wp-content/uploads/2021/02/PushCategories-icon-settings.png)

**This bell icon is only available when the OneSignal bell is turned off. If the OneSignal bell is on, it will replace this feature.**

![The notification bell with the tooltip shown](https://docs.ktoo.media/wp-content/uploads/2021/02/Notification-bell.png)

### Block

This plugin includes a "Push notification signups" block to create a signup form showing available notification categories.

![The block interface for a signup section with categories](https://docs.ktoo.media/wp-content/uploads/2021/02/Push-notification-signups_block.png)

- The two sections at the top are block areas which are shown to users who are not currently subscribed to any notifications and those who are, respectively. These sections can hold any blocks (click the plus button to add blocks to them.)
- In the list of categories, turning off the eye icon will hide that category in this signup block (but not elsewhere), and checking the checkbox will pre-select it for visitors who do not already have their own notification category preferences set up.
    - Select the list of categories for more options in the right-hand block settings, including how many columns to use for display and how to handle new categories that are added with the admin settings page after this block is edited.
- Select the signup button for all the settings normally available for buttons (please note that links will have no effect since this button just submits the categories above).
- The "subscribed user button text" field will replace the text shown on the button for users who are currently subscribed. 

## Pushing posts 

In addition to the push controls meta box added by the OneSignal WordPress plugin, this plugin adds a list of categories.

![A list of categories added after the OneSignal checkboxes](https://docs.ktoo.media/wp-content/uploads/2021/02/Push-notification-post-metabox.png)

These checkboxes are only enabled when the OneSignal "Send notification on post publish/update" is selected. The post will be pushed to all users who have signed up for any of the categories selected when the post is published/updated.  


## Development

    npm install
    npm run build
