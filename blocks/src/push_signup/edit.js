/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import {  InnerBlocks} from '@wordpress/block-editor';
import {  TextControl } from '@wordpress/components';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {



	// change setting for showing categories
	const onChangeSubscribedButton = ( newValue ) => {
		setAttributes ( { alternate_subscribed_button: newValue });
	}

	// template for submit button
	const signup_template = [
		['core/group', {templateLock: false, className: 'push-notification-signup new-user'}],
		['core/group', {templateLock: false, className: 'push-notification-signup subscribed-user'}],
		['push-notification-user-tags/push-categories'],
		[ 'core/button', { text: 'Sign up', className: 'push-notification-signup' } ],
	];

	return (
		<>
		<div { ...useBlockProps() }>
			<InnerBlocks
				template={ signup_template }
				templateLock="all"
			/>
			<TextControl 
				label='Subscribed user button text'
				help="Alternate button text for users who are already subscribed to notifications"
				className="alternate-button-text"
				value={attributes.alternate_subscribed_button}
				onChange={onChangeSubscribedButton}
			/>
		</div>

		</>
	);
}
