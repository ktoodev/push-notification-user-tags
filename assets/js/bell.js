OneSignal.push(function() {


    // make updates for already-subscribed users
    let update_subscribed = function(isEnabled) {
        console.log ('update subscribed');
        console.log (isEnabled);
        if (isEnabled) {
            document.querySelector('.notification-icon').classList.remove('is-not-subscribed'); 
            document.querySelector('.notification-icon').classList.add('is-subscribed');

            // if we have a different description for already-subscribed users, replace it
            if (push_notification_popup_options && push_notification_popup_options.update_content) {
                document.querySelector ('.wp-block-push-notification-signup.popup .notification-description').innerHTML = push_notification_popup_options.update_content;
            }

            // if we have a different button label for already-subscribed users, replace it
            if (push_notification_popup_options && push_notification_popup_options.update_button) {
                document.querySelector ('.wp-block-push-notification-signup.popup .push-notification-signup .wp-block-button__link').innerHTML = push_notification_popup_options.update_button;
            }
            
        }
    };
    
    OneSignal.on('subscriptionChange', function (isSubscribed) {
        update_subscribed (isSubscribed);
    });


    if (OneSignal.isPushNotificationsSupported()) {
        OneSignal.isPushNotificationsEnabled().then(function (isEnabled) {
            update_subscribed(isEnabled);

            document.querySelector('.notification-icon').classList.add('is-supported');
        });
    }


    // open the modal on a click to the bell 
    document.getElementsByClassName('notification-icon')[0].addEventListener ('click', function () {
        Push_Category_Loader.hide_all();
        document.querySelector('.notification-background-wrapper.signup-hidden').classList.remove('signup-hidden');
    });


    // close modal on a click to either the background or the "cancel" button
    document.querySelector('.notification-background-wrapper').addEventListener ('click', function (event) {
        if (event.target.classList.contains ('notification-background-wrapper') || event.target.classList.contains ('cancel-popup')) {
            document.querySelector('.notification-background-wrapper').classList.add('signup-hidden');
        }
    });
    

    // clicking the submit button 
    document.querySelector('.popup .push-notification-signup .wp-block-button__link').addEventListener('click', function (event) {

        // if we're just updating settings, hide the window shortly after the message appears
        OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {   
            
            if (isEnabled) {
                // if the subscription state is enabled, hide the window after the message appears
                setTimeout (function () {
                    document.querySelector('.notification-background-wrapper').classList.add('signup-hidden');
                }, 2000);
            }
            
            else {

                // otherise, close the window after a successful subscription
                OneSignal.on('subscriptionChange', function (isSubscribed) {
                    if (isSubscribed) {
                        setTimeout (function () {
                            document.querySelector('.notification-background-wrapper').classList.add('signup-hidden');
                        }, 2000);
                    }
                });
            }
        });

        
    });
    
});