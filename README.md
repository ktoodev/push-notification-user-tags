# Push Notification User Tags

Works with OneSignal to allow site visitors to choose specific categories of notifications to get when they sign up for push notifications by adding data tags on signup. 

## Features 

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



## Development

    npm install
    npm run build
