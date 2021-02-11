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
        let buttons = document.getElementsByClassName('push-notification-signup');
        for (let i =0; i < buttons.length; i++) {
            
            buttons[i].addEventListener('click', function (event) {
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

                OneSignal.showNativePrompt();
                OneSignal.setSubscription(true);
                OneSignal.sendTags(data);
            });
        }
    }
  });

