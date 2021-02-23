/**
 * Scripts for the signup block
 * - Load existing categories for user
 * - Get push permission and manage flow
 */

import './loader.js';

window.OneSignal = window.OneSignal || [];

window.OneSignal.push(function() {
    
    // only run setup on supported browsers
    if (OneSignal.isPushNotificationsSupported()) {

            
        /**
         * Pre-check categories the user is already subscribed to 
         * @param string container_class    Class for containers that have category checkboxes inside them (all checkboxes in these containers will be considered for pre-checking)   
         * @param {key: 0|1} tags           The tags (by key) with a 1 or a 0 (pre-checked or not pre-checked)
         */
        OneSignal.precheck_existing_tags = function (container_class, tags) {
            // return if no tags to pre-check
            if (!tags) {
                return;
            }

            // get all the container elements
            let elements = document.getElementsByClassName(container_class);
        
            // go through all container elements
            for(let i = 0; i < elements.length; i++) {
        
                // get all checkboxes in the container
                let checkboxes = elements[i].querySelectorAll('input[type="checkbox"]');

                // if a passed tag matches the checkbox, use the passed tag value for the checkbox
                for (let box = 0; box < checkboxes.length; box++) {
                    if (tags.hasOwnProperty(checkboxes[box].value)) {
                        checkboxes[box].checked = parseInt(tags[checkboxes[box].value]);
                    }
                }
            }
        }
        

        // pre-check categories existing subscribers have signed up for
        OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {   
            if (!isEnabled) {
                return;
            }

            document.querySelector('.wp-block-push-notification-signup').classList.add('subscribed-user');
            let alternate_subscribed_button = document.querySelector('.wp-block-push-notification-signup').dataset.alternateSubscribedButton;
            if (alternate_subscribed_button) {
                document.querySelector('.wp-block-push-notification-signup .wp-block-button__link').innerHTML = alternate_subscribed_button;
            }
            
            OneSignal.getTags().then(function(tags) {
                OneSignal.precheck_existing_tags('wp-block-push-notification-signup', tags);            
            });
        });


        // add button event handler to submit tags when signup buttons are clicked
        let buttons = document.querySelectorAll('.push-notification-signup .wp-block-button__link');
        for (let i =0; i < buttons.length; i++) {

            /**
             * Event handler for submitting events
             * @param {*} event 
             */
            let submit_event = function (event) {

                // start the loading icon and set the loadin gmessage
                Push_Category_Loader.start(event.target);
                Push_Category_Loader.set_message('Click "allow" to enable notifications.');
                
                // find parent with container ID
                let container = event.target;
                while ( ! container.classList.contains('wp-block-push-notification-signup')) {
                    container = container.parentNode;
                }

                // all the checkboxes we want to submit
                let checkboxes = container.querySelectorAll('input[type="checkbox"]');

                // final data to submit
                let data = {};

                // add checkbox values to data
                for (let box = 0; box < checkboxes.length; box++) {
                    data[checkboxes[box].value] = checkboxes[box].checked ? 1 : 0;
                }

                // send tags to OneSignal
                OneSignal.sendTags(data).then(function (tags) {
                    // pre-check all tag checkboxes anywhere on the page (in case there are multiple signup blocks in different places)
                    OneSignal.precheck_existing_tags('wp-block-push-notification-signup', tags);
                });

                // if permission takes too long, show a helpful message
                let permission_timeout = setTimeout (function () {
                    Push_Category_Loader.set_message("If you don't see a popup to allow notifications, try clicking the padlock to the left of the URL or look for a notification icon (sometimes a bell or text bubble).");
                }, 10000);

            
                // request permissions
                Notification.requestPermission().then(function (permission) {

                    // stop the timer for permission process
                    clearTimeout(permission_timeout);

                    // permission denied
                    if (permission == 'denied') {
                        Push_Category_Loader.set_result({
                            status: 0,
                            message: 'Notifications are blocked - try clicking the padlock next to the URL to allow them.'
                        });
                    }

                    // permission granted
                    else if (permission == 'granted') {
                        
                        // new signup
                        if (Push_Category_Loader.last_status < 1) {    
                            Push_Category_Loader.set_result({
                                status: 1,
                                message: 'Successfully signed up for notifications'
                            });
                        }

                        // existing subscription update
                        else {
                            Push_Category_Loader.set_result({
                                status: 1,
                                message: 'Subscription updated'
                            });
                        }

                        // set the subscription to false if no category tags were selected, true if any were
                        let any_tag_subscribed = false;
                        for (const tag_checkbox in data) {
                            if (data[tag_checkbox] != 0) {
                                any_tag_subscribed = true;
                            }
                        }
                        OneSignal.setSubscription(any_tag_subscribed);
                    }

                    // no action taken
                    else if (permission == 'default') {
                        Push_Category_Loader.set_result({
                            status: -1,
                            message: 'You must click "allow" in your browser to enable notifications (click the signup button to try again)'
                        });
                    }
                });

            };

            // initialize the loader on the button with the containers for the icon and message
            Push_Category_Loader.init(buttons[i], buttons[i].parentNode, buttons[i].parentNode.parentNode);

            // handle clicks on the submit button
            buttons[i].addEventListener('click', submit_event);
        }
    }
  });

