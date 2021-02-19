OneSignal.push(function() {

    // add a class to the bell to allow separate styling for users who are already subscribed
    OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
        if (isEnabled) {
            document.querySelector('.notification-icon').classList.add('is-subscribed'); 
        }
    });


    // open the modal on a click to the bell 
    document.getElementsByClassName('notification-icon')[0].addEventListener ('click', function () {
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