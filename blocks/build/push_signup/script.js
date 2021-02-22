/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./blocks/src/push_signup/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./blocks/src/push_signup/loader.js":
/*!******************************************!*\
  !*** ./blocks/src/push_signup/loader.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  init: function init(source_button, icon_container, message_container) {
    // if this button doesn't have a notification ID, assign one
    if (!source_button.dataset.notificationLoaderId) {
      source_button.dataset.notificationLoaderId = Math.round(Math.random() * 1000000);
    } // add the icon if it's not already in the specified container


    if (!icon_container.querySelector('.permission-status_loading-icon')) {
      icon_container.appendChild(this.create_wrapper(this.icon_markup, source_button.dataset.notificationLoaderId, 'permission-status_loading-icon'));
    } // add the message if it's not already in the specified container


    if (!message_container.querySelector('.permission-status_message')) {
      message_container.appendChild(this.create_wrapper(this.message_markup, source_button.dataset.notificationLoaderId, 'permission-status_message'));
    }
  },

  /**
   * Create a wrapper element with a given loader ID and class
   */
  create_wrapper: function create_wrapper(markup, data_loader_id, className) {
    // create the outer element
    var element = document.createElement('div');
    element.dataset.notificationLoaderId = data_loader_id;
    element.classList.add('permission-status'); // add the custom class name

    if (className.length) {
      element.className = element.className + ' ' + className;
    } // set the markup inside


    element.innerHTML = markup;
    return element;
  },

  /**
   * Start the permission checking process
   */
  start: function start(source_element) {
    // hide everything (to take care of existing messages)
    this.hide_timeouts(); // set the notification ID as 'in progress'

    this.in_progress.push(source_element.dataset.notificationLoaderId); // reset the icons

    var icon_elements = document.querySelectorAll("[data-notification-loader-id='" + source_element.dataset.notificationLoaderId + "'].permission-status .circle-loader");

    for (var i = 0; i < icon_elements.length; i++) {
      icon_elements[i].style.display = "block";
      icon_elements[i].classList.remove('load-complete');
      icon_elements[i].classList.remove('load-failed');
    } // show icons/messages for this id


    var elements = document.querySelectorAll("[data-notification-loader-id='" + source_element.dataset.notificationLoaderId + "'].permission-status");

    for (var _i = 0; _i < elements.length; _i++) {
      elements[_i].style.transition = 'none';
      elements[_i].style.opacity = 1;
    }
  },

  /**
   * End the permission checking
   * @param string status  "success" or "failed"
   */
  end: function end(status) {
    clearTimeout(this.timeout);

    for (var i = 0; i < this.in_progress.length; i++) {
      var element = document.querySelector("[data-notification-loader-id='" + this.in_progress[i] + "'].permission-status .circle-loader");

      if (element) {
        element.classList.add('load-complete');

        if (status == 'failed') {
          element.classList.add('load-failed');
        }
      }
    }

    this.timeout = setTimeout(this.hide_timeouts, 8000);
    this.in_progress = [];
  },
  hide_elements: function hide_elements(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.transition = 'opacity 1s';
      elements[i].style.opacity = 0;
    }
  },
  hide_timeouts: function hide_timeouts() {
    this.hide_elements(document.querySelectorAll('.timeout-status .permission-status'));
  },
  hide_all: function hide_all() {
    this.hide_elements(document.querySelectorAll('.permission-status'));
  },

  /**
   * Set the message for any in progress status message areas
   * @param string message 
   */
  set_message: function set_message(message) {
    for (var i = 0; i < this.in_progress.length; i++) {
      var element = document.querySelector("[data-notification-loader-id='" + this.in_progress[i] + "'].permission-status .permission-status-message");

      if (element) {
        element.innerHTML = '<em>' + message + '</em>';
      }
    }
  },

  /**
   * End the permission checking using an object to convey status and a message
   * @param {status: int, message:string} obj 
   */
  set_result: function set_result(obj) {
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
};

/***/ }),

/***/ "./blocks/src/push_signup/script.js":
/*!******************************************!*\
  !*** ./blocks/src/push_signup/script.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader.js */ "./blocks/src/push_signup/loader.js");
/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_loader_js__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Scripts for the signup block
 * - Load existing categories for user
 * - Get push permission and manage flow
 */

window.OneSignal = window.OneSignal || [];
window.OneSignal.push(function () {
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
      } // get all the container elements


      var elements = document.getElementsByClassName(container_class); // go through all container elements

      for (var i = 0; i < elements.length; i++) {
        // get all checkboxes in the container
        var checkboxes = elements[i].querySelectorAll('input[type="checkbox"]'); // if a passed tag matches the checkbox, use the passed tag value for the checkbox

        for (var box = 0; box < checkboxes.length; box++) {
          if (tags.hasOwnProperty(checkboxes[box].value)) {
            checkboxes[box].checked = parseInt(tags[checkboxes[box].value]);
          }
        }
      }
    }; // pre-check categories existing subscribers have signed up for


    OneSignal.isPushNotificationsEnabled().then(function (isEnabled) {
      if (!isEnabled) {
        return;
      }

      OneSignal.getTags().then(function (tags) {
        OneSignal.precheck_existing_tags('wp-block-push-notification-signup', tags);
      });
    }); // add button event handler to submit tags when signup buttons are clicked

    var buttons = document.querySelectorAll('.push-notification-signup .wp-block-button__link');

    for (var i = 0; i < buttons.length; i++) {
      /**
       * Event handler for submitting events
       * @param {*} event 
       */
      var submit_event = function submit_event(event) {
        // start the loading icon and set the loadin gmessage
        Push_Category_Loader.start(event.target);
        Push_Category_Loader.set_message('Click "allow" to enable notifications.'); // find parent with container ID

        var container = event.target;

        while (!container.classList.contains('wp-block-push-notification-signup')) {
          container = container.parentNode;
        } // all the checkboxes we want to submit


        var checkboxes = container.querySelectorAll('input[type="checkbox"]'); // final data to submit

        var data = {}; // add checkbox values to data

        for (var box = 0; box < checkboxes.length; box++) {
          data[checkboxes[box].value] = checkboxes[box].checked ? 1 : 0;
        } // send tags to OneSignal


        OneSignal.sendTags(data).then(function (tags) {
          // pre-check all tag checkboxes anywhere on the page (in case there are multiple signup blocks in different places)
          OneSignal.precheck_existing_tags('wp-block-push-notification-signup', tags);
        }); // if permission takes too long, show a helpful message

        var permission_timeout = setTimeout(function () {
          Push_Category_Loader.set_message("If you don't see a popup to allow notifications, try clicking the padlock to the left of the URL or look for a notification icon (sometimes a bell or text bubble).");
        }, 10000); // request permissions

        Notification.requestPermission().then(function (permission) {
          // stop the timer for permission process
          clearTimeout(permission_timeout); // permission denied

          if (permission == 'denied') {
            Push_Category_Loader.set_result({
              status: 0,
              message: 'Notifications are blocked - try clicking the padlock next to the URL to allow them.'
            });
          } // permission granted
          else if (permission == 'granted') {
              // new signup
              if (Push_Category_Loader.last_status < 1) {
                Push_Category_Loader.set_result({
                  status: 1,
                  message: 'Successfully signed up for notifications'
                });
              } // existing subscription update
              else {
                  Push_Category_Loader.set_result({
                    status: 1,
                    message: 'Subscription updated'
                  });
                } // set the subscription to false if no category tags were selected, true if any were


              var any_tag_subscribed = false;

              for (var tag_checkbox in data) {
                if (data[tag_checkbox] != 0) {
                  any_tag_subscribed = true;
                }
              }

              OneSignal.setSubscription(any_tag_subscribed);
            } // no action taken
            else if (permission == 'default') {
                Push_Category_Loader.set_result({
                  status: -1,
                  message: 'You must click "allow" in your browser to enable notifications (click the signup button to try again)'
                });
              }
        });
      }; // initialize the loader on the button with the containers for the icon and message


      Push_Category_Loader.init(buttons[i], buttons[i].parentNode, buttons[i].parentNode.parentNode); // handle clicks on the submit button

      buttons[i].addEventListener('click', submit_event);
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map