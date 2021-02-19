window.Push_Category_Loader = window.Push_Category_Loader || {

    /**
     * The markup for icons
     */
    icon_markup: '<div class="loader-wrapper"><div class="circle-loader" style="display:none"><div class="checkmark draw"></div><div class="block draw"></div></div></div>',

    /**
     * The markup for message containers
     */
    message_markup: '<div class="permission-status-message"></div>',

    /**
     * DOM elements that allready have an icon in them (for duplication checking so each element gets at most one icon)
     */
    icon_elements: [],
    
    /**
     * DOM elements that already have a message in them (for duplciation checking so each element gets at most one message)
     */
    message_elements: [],

    /**
     * The last recorded status of notifications (for contextual messages that depend on whether the status has changed)
     */
    last_status: 0,

    /**
     * Array of loader IDs that are currently trying to get permission
     */
    in_progress: [],


    timeout: null,


    /**
     * Add markup for icon and message to the specified containers, triggered by the specified source button
     */
    init: function (source_button, icon_container, message_container) {

        // if this button doesn't have a notification ID, assign one
        if ( ! source_button.dataset.notificationLoaderId) {
            source_button.dataset.notificationLoaderId = Math.round(Math.random() * 1000000);
        }

        // add the icon if it's not already in the specified container
        if ( ! icon_container.querySelector('.permission-status_loading-icon')) {
            icon_container.appendChild (this.create_wrapper (this.icon_markup, source_button.dataset.notificationLoaderId, 'permission-status_loading-icon'));
        }
        
        // add the message if it's not already in the specified container
        if ( ! message_container.querySelector('.permission-status_message')) {
            message_container.appendChild (this.create_wrapper (this.message_markup, source_button.dataset.notificationLoaderId, 'permission-status_message'));
        }
    },

    
    /**
     * Create a wrapper element with a given loader ID and class
     */
    create_wrapper: function (markup, data_loader_id, className) {

        // create the outer element
        let element = document.createElement('div');
        element.dataset.notificationLoaderId = data_loader_id;
        element.classList.add('permission-status');

        // add the custom class name
        if (className.length) {
            element.className = element.className + ' ' + className;
        }

        // set the markup inside
        element.innerHTML = markup;

        return element;
    },

    /**
     * Start the permission checking process
     */
    start: function (source_element) {
        // hide everything (to take care of existing messages)
        this.hide_all();

        // set the notification ID as 'in progress'
        this.in_progress.push (source_element.dataset.notificationLoaderId);

        // reset the icons
        let icon_elements = document.querySelectorAll("[data-notification-loader-id='" + source_element.dataset.notificationLoaderId + "'].permission-status .circle-loader");
        for (let i = 0; i < icon_elements.length; i++) {
            icon_elements[i].style.display = "block";
            icon_elements[i].classList.remove('load-complete');
            icon_elements[i].classList.remove('load-failed');
        }

        // show icons/messages for this id
        let elements = document.querySelectorAll("[data-notification-loader-id='" + source_element.dataset.notificationLoaderId + "'].permission-status");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.transition = 'none';
            elements[i].style.opacity = 1;
        }
    },

    
    /**
     * End the permission checking
     * @param string status  "success" or "failed"
     */
    end: function (status) {
        clearTimeout (this.timeout);

        for (let i = 0; i < this.in_progress.length; i++) {
            let element = document.querySelector("[data-notification-loader-id='" + this.in_progress[i] + "'].permission-status .circle-loader");
            if (element) {
                element.classList.add('load-complete');
                if (status == 'failed') {
                    element.classList.add('load-failed');
                }
            }
        }

        this.timeout = setTimeout (this.hide_all, 8000);

        this.in_progress = [];
    },


    hide_all: function () {
        let everything = document.querySelectorAll('.timeout-status .permission-status');
        for (let i = 0; i < everything.length; i++) {
            everything[i].style.transition = 'opacity 1s';
            everything[i].style.opacity = 0;
        }
    },


    /**
     * Set the message for any in progress status message areas
     * @param string message 
     */
    set_message: function (message) {
        for (let i = 0; i < this.in_progress.length; i++) {
            let element = document.querySelector("[data-notification-loader-id='" + this.in_progress[i] + "'].permission-status .permission-status-message");
            if (element) {
                element.innerHTML = '<em>' + message + '</em>';
            }
        }
    },


    /**
     * End the permission checking using an object to convey status and a message
     * @param {status: int, message:string} obj 
     */
    set_result: function (obj) {
        this.last_status = obj.status;
        if (obj.message) {
            this.set_message(obj.message);
        }

        if (obj.status > 0) {
            this.end('success');
        }
        if (obj.status <= 0) {
            this.end('failed');
        }
    }
}