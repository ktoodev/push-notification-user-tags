(window["webpackJsonp_temp_push_setup"] = window["webpackJsonp_temp_push_setup"] || []).push([["style-index"],{

/***/ "./blocks/src/push_signup/style.scss":
/*!*******************************************!*\
  !*** ./blocks/src/push_signup/style.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp_temp_push_setup"] = window["webpackJsonp_temp_push_setup"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./blocks/src/index.js","style-index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./blocks/src/index.js":
/*!*****************************!*\
  !*** ./blocks/src/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _push_signup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./push_signup */ "./blocks/src/push_signup/index.js");

_push_signup__WEBPACK_IMPORTED_MODULE_0__["register"]();

/***/ }),

/***/ "./blocks/src/push_signup/edit.js":
/*!****************************************!*\
  !*** ./blocks/src/push_signup/edit.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Edit; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./blocks/src/push_signup/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */





/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

function Edit(_ref) {
  var clientId = _ref.clientId,
      attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;

  // default selection for a category/tag changes
  var onChangeTagDefault = function onChangeTagDefault(newTagDefault, tag) {
    var newDefaultSelection = newTagDefault ? 1 : 0;
    setAttributes({
      default_tags: _objectSpread(_objectSpread({}, attributes.default_tags), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, tag, _objectSpread(_objectSpread({}, attributes.default_tags[tag]), {}, {
        default_selection: newDefaultSelection
      })))
    });
  }; // visibility of a tag/category changes


  var onChangeVisibility = function onChangeVisibility(tag, visible) {
    // build the list of new tags
    var new_tags = _objectSpread(_objectSpread({}, attributes.default_tags), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, tag, _objectSpread(_objectSpread({}, attributes.default_tags[tag]), {}, {
      visible: visible
    }))); // get the count of total visible tags in the new list


    var visible_tags = Object.keys(new_tags).filter(function (tag) {
      return new_tags[tag].visible;
    }).length; // update the max columns to be no more than the visible tags

    setMaxColumns(visible_tags);
    setAttributes({
      default_tags: new_tags
    });
  }; // change setting for showing categories


  var onChangeShowCategories = function onChangeShowCategories(newValue) {
    setAttributes({
      show_categories: newValue
    });
  }; // change setting for showing categories


  var onChangeColumns = function onChangeColumns(newValue) {
    var clampedValue = Math.min(Math.max(1, newValue), Object.keys(attributes.default_tags).filter(function (tag) {
      return attributes.default_tags[tag].visible;
    }).length);
    setAttributes({
      columns: clampedValue
    });
  }; // set the max columns (outside of the column control being updated)


  var setMaxColumns = function setMaxColumns(max) {
    setAttributes({
      columns: Math.min(max, attributes.columns)
    });
  }; // change setting for automatically showing new categories


  var onChangeShowNewCategories = function onChangeShowNewCategories(newValue) {
    setAttributes({
      show_new_categories: newValue
    });
  }; // change setting for automatically selecting new


  var onChangeSelectNewCategories = function onChangeSelectNewCategories(newValue) {
    setAttributes({
      select_new_categories: newValue
    });
  }; // change setting for removing deleted categories


  var onChangeRemoveDeletedCategories = function onChangeRemoveDeletedCategories(newValue) {
    setAttributes({
      remove_deleted_categories: newValue
    });
  }; // initialize the default tag status


  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var new_tags = [];
    /**
     * Add a tag to the block attributes
     */

    var add_tag = function add_tag(key) {
      var current_tag = attributes.default_tags[key] || {};
      var current_label = push_notification_user_tags.tag_list[key]['label'] || '';
      var new_tag = {
        key: key,
        label: current_label,
        default_selection: attributes.select_new_categories,
        visible: attributes.show_new_categories
      };
      new_tags[key] = _objectSpread(_objectSpread({}, new_tag), current_tag);
    }; // go through the tags stored in this block


    for (var key in attributes.default_tags) {
      // if this key is still in the settings or we're not deleting keys that aren't, add it
      if (push_notification_user_tags.tag_list.hasOwnProperty(key) || !attributes.remove_deleted_categories) {
        add_tag(key);
      }
    } // go through the tags defined in settings


    for (var _key in push_notification_user_tags.tag_list) {
      // if this isn't already in the attributes, add it
      if (!attributes.default_tags.hasOwnProperty(_key)) {
        add_tag(_key);
      }
    }

    setAttributes({
      default_tags: _objectSpread(_objectSpread({}, new_tags), attributes.default_tags)
    });
    return function () {
      false;
    };
  }, []); // visibility switch for visible categories

  var visible_icon = function visible_icon(tag) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["Button"], {
      className: "visibility-button",
      label: "Category is visible",
      onClick: function onClick() {
        return onChangeVisibility(tag, 0);
      },
      icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("svg", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("path", {
        d: "M12.22,6.09A12.91,12.91,0,0,0,2,11.68c2.58,3.44,6.21,5.6,10.25,5.6s7.66-2.16,10.24-5.6A12.91,12.91,0,0,0,12.22,6.09Zm0,10.13a4.54,4.54,0,1,1,4.54-4.54A4.55,4.55,0,0,1,12.22,16.22Z",
        transform: "translate(-1.97 -5.09)"
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("path", {
        d: "M14,13.46a2.54,2.54,0,0,0,.71-1.76,2.58,2.58,0,0,0-4.21-2A3.9,3.9,0,0,1,14,13.46Z",
        transform: "translate(-1.97 -5.09)"
      }))
    });
  }; // visibility switch for INvisible categories


  var invisible_icon = function invisible_icon(tag) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["Button"], {
      className: "visibility-button",
      label: "Category is hidden",
      onClick: function onClick() {
        return onChangeVisibility(tag, 1);
      },
      icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("svg", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("path", {
        d: "M5.21,14.9l2.53-2.53a5,5,0,0,1-.07-.69,4.55,4.55,0,0,1,4.55-4.54,4,4,0,0,1,.69.07l1-1a11.63,11.63,0,0,0-1.67-.13A12.91,12.91,0,0,0,2,11.68,15.2,15.2,0,0,0,5.21,14.9Z",
        transform: "translate(-1.97 -4.6)"
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("path", {
        d: "M19.09,8.36l-2.42,2.43a5.27,5.27,0,0,1,.09.89,4.54,4.54,0,0,1-4.54,4.54,4.26,4.26,0,0,1-.89-.09l-1,1a10.38,10.38,0,0,0,1.86.18c4,0,7.66-2.16,10.24-5.6A15.35,15.35,0,0,0,19.09,8.36Z",
        transform: "translate(-1.97 -4.6)"
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("rect", {
        x: "1.61",
        y: "10.41",
        width: "21.52",
        height: "2.01",
        transform: "translate(-6.42 7.49) rotate(-45)"
      }))
    });
  }; // set up list of tags checkboxes


  var tag_list = [];

  var _loop = function _loop(key) {
    var label = push_notification_user_tags.tag_list[key]['label']; // default the label to the key

    if (label.length == 0) {
      label = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("em", null, key);
    }

    var row_class = "tag_row ";
    var visibility_icon = visible_icon(key);
    var disabled = false; // changes for invisible categories

    if (attributes.default_tags[key] && !attributes.default_tags[key].visible) {
      row_class += " invisible";
      visibility_icon = invisible_icon(key);
      disabled = true;
    }

    tag_list.push(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: row_class
    }, visibility_icon, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["CheckboxControl"], {
      label: label,
      disabled: disabled,
      onChange: function onChange(newValue) {
        return onChangeTagDefault(newValue, key);
      },
      checked: attributes.default_tags[key] && attributes.default_tags[key].default_selection && attributes.default_tags[key].visible
    })));
  };

  for (var key in push_notification_user_tags.tag_list) {
    _loop(key);
  } // template for submit button


  var submit_template = [['core/button', {
    text: 'Sign up'
  }]];
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["useBlockProps"])(), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    style: {
      columnCount: attributes.columns
    }
  }, attributes.show_categories ? tag_list : ''), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    className: "submit-button-container"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["InnerBlocks"], {
    template: submit_template,
    templateLock: "all"
  }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelBody"], {
    initialOpen: true
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ExternalLink"], {
    href: push_notification_user_tags.admin_url,
    target: "_blank"
  }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Edit push categories'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToggleControl"], {
    label: "Show individual push categories",
    onChange: onChangeShowCategories,
    checked: attributes.show_categories
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["TextControl"], {
    label: "Columns for categories:",
    type: "number",
    className: "column-number",
    onChange: onChangeColumns,
    value: attributes.columns
  }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelBody"], {
    title: "Future categories",
    initialOpen: true
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["__experimentalText"], null, "What should we do when new push categories are added in the admin section?")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToggleControl"], {
    label: "Show new categories by default",
    help: "When new categories are added in the admin panel, should they be visible by default?",
    onChange: onChangeShowNewCategories,
    checked: attributes.show_new_categories
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToggleControl"], {
    label: "Select new categories by default",
    help: "When new categories are added in the admin panel, should they be checked by default?",
    onChange: onChangeSelectNewCategories,
    checked: attributes.select_new_categories
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToggleControl"], {
    label: "Automatically remove deleted categories",
    help: "Strongly recommended: When existing categories are deleted, remove them from this block",
    onChange: onChangeRemoveDeletedCategories,
    checked: attributes.remove_deleted_categories
  })))));
}

/***/ }),

/***/ "./blocks/src/push_signup/editor.scss":
/*!********************************************!*\
  !*** ./blocks/src/push_signup/editor.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./blocks/src/push_signup/index.js":
/*!*****************************************!*\
  !*** ./blocks/src/push_signup/index.js ***!
  \*****************************************/
/*! exports provided: register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./blocks/src/push_signup/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./blocks/src/push_signup/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./blocks/src/push_signup/save.js");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

var register = function register() {
  Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])('push-notification-user-tags/push-signup', {
    /**
     * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
     */
    apiVersion: 2,

    /**
     * This is the display title for your block, which can be translated with `i18n` functions.
     * The block inserter will show this name.
     */
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Push notification signups', 'push-notification-user-tags'),

    /**
     * This is a short description for your block, can be translated with `i18n` functions.
     * It will be shown in the Block Tab in the Settings Sidebar.
     */
    description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Browser push signup block, with option for users to choose categories or topics to be notified about.', 'push-notification-user-tags'),

    /**
     * Blocks are grouped into categories to help users browse and discover them.
     * The categories provided by core are `text`, `media`, `design`, `widgets`, and `embed`.
     */
    category: 'widgets',

    /**
     * An icon property should be specified to make it easier to identify a block.
     * These can be any of WordPress’ Dashicons, or a custom svg element.
     */
    icon: 'bell',

    /**
     * Optional block extended support features.
     */
    supports: {
      // Removes support for an HTML mode.
      html: false
    },

    /**
     * @see ./edit.js
     */
    edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],

    /**
     * @see ./save.js
     */
    save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
  });
};

/***/ }),

/***/ "./blocks/src/push_signup/save.js":
/*!****************************************!*\
  !*** ./blocks/src/push_signup/save.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return save; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

function save(props) {
  // don't let the button have an URL and force it to have the right class for later JS
  if (props.innerBlocks.length) {
    delete props.innerBlocks[0].attributes.url;
    var old_class_name = props.innerBlocks[0].attributes.className ? props.innerBlocks[0].attributes.className : '';
    props.innerBlocks[0].attributes.className = old_class_name.replace('push-notification-signup').trim() + ' push-notification-signup';
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["InnerBlocks"].Content, null);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blocks"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map