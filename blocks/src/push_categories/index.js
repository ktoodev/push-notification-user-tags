/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
//import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
function register() {
	registerBlockType('push-notification-user-tags/push-categories', {
		/**
		 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
		 */
		apiVersion: 2,

		/**
		 * Only allow this block to be used in a full notifications signup block
		 */
		parent: ['push-notification-user-tags/push-signup'],

		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __('Push notification categories', 'push-notification-user-tags'),

		/**
		 * This is a short description for your block, can be translated with `i18n` functions.
		 * It will be shown in the Block Tab in the Settings Sidebar.
		 */
		description: __(
			'Browser push signup categories the user wants to be notified about.',
			'push-notification-user-tags'
		),

		/**
		 * An icon property should be specified to make it easier to identify a block.
		 * These can be any of WordPress’ Dashicons, or a custom svg element.
		 */
		icon: 'list-view',

		/**
		 * Optional block extended support features.
		 */
		supports: {
			// Removes support for an HTML mode.
			html: false,
		},

		/**
		 * @see ./edit.js
		 */
		edit: Edit,

		/**
		 * @see ./save.js
		 */
		save,
	});
}

register();