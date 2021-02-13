OneSignal.push(function() {
    

    
    if (OneSignal.isPushNotificationsSupported()) {
        

        OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {   
            
            if (!isEnabled) {
                return;
            }

            let elements = document.getElementsByClassName('wp-block-push-notification-signup');

            // load any existing options 
            for(let i = 0; i < elements.length; i++) {

                OneSignal.getTags().then(function(tags) {
                    if (!tags) {
                        return;
                    }
                    let checkboxes = document.querySelectorAll('#' + elements[i].dataset.pushCategoryContainerId + ' input[type="checkbox"]');

                    for (let box = 0; box < checkboxes.length; box++) {
                        
                        if (tags.hasOwnProperty(checkboxes[box].value)) {
                            checkboxes[box].checked = parseInt(tags[checkboxes[box].value]);
                        }
                    }
                });
            }

            
        });


        // add button event handler to submit tags when it's clicked 
        let buttons = document.querySelectorAll('.push-notification-signup .wp-block-button__link');
        for (let i =0; i < buttons.length; i++) {


            let submit_event = function (event) {

                Push_Category_Loader.start(event.target);
                Push_Category_Loader.set_message('Click "allow" to enable notifications.');
                
                // find parent with container ID
                let container = event.target;
                while ( ! container.dataset.pushCategoryContainerId) {
                    container = container.parentNode;
                }

                let checkboxes = document.querySelectorAll('#' + container.dataset.pushCategoryContainerId + ' input[type="checkbox"]');

                let data = {};

                for (let box = 0; box < checkboxes.length; box++) {
                    data[checkboxes[box].value] = checkboxes[box].checked ? 1 : 0;
                }

                OneSignal.sendTags(data);


                let permission_timeout = setTimeout (function () {
                    Push_Category_Loader.set_message("If you don't see a popup to allow notifications, try clicking the padlock to the left of the URL or look for a bell icon to the right of the URL.");
                }, 10000);

               Notification.requestPermission().then(function (permission) {
                    clearTimeout(permission_timeout);

                    if (permission == 'denied') {
                        Push_Category_Loader.set_result({
                            status: 0,
                            message: 'Notifications are blocked - try clicking the padlock next to the URL to allow them.'
                        });
                    }
                    else if (permission == 'granted') {
                        if (Push_Category_Loader.last_status < 1) {    
                            Push_Category_Loader.set_result({
                                status: 1,
                                message: 'Successfully signed up for notifications'
                            });
                        }
                        else {
                            Push_Category_Loader.set_result({
                                status: 1,
                                message: 'Subscription updated'
                            });
                        }
                        OneSignal.setSubscription(true);
                    }
                    else if (permission == 'default') {
                        Push_Category_Loader.set_result({
                            status: -1,
                            message: 'You must click "allow" in your browser to enable notifications (click the signup button to try again)'
                        });
                    }
                });

            };

            
            Push_Category_Loader.init(buttons[i], buttons[i].parentNode, buttons[i].parentNode.parentNode);
            buttons[i].addEventListener('click', submit_event);

        }
    }
  });

