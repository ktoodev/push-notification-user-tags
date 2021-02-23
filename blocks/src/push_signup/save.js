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
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {

	// don't let the button have an URL and force it to have the right class for later JS
	if (props.innerBlocks.length) {

		for (const index of [0,1,3]) {
			
			// delete URL
			if (props.innerBlocks[index].attributes.url) {
				delete props.innerBlocks[index].attributes.url;
			}

			// add the class name for submission script
			let old_class_name = props.innerBlocks[index].attributes.className ? props.innerBlocks[index].attributes.className : '';
			

			let new_class_name = 'push-notification-signup';
			
			if (index == 0) {
				new_class_name += ' new-user';
			}
			else if (index == 1) {
				new_class_name += ' subscribed-user';
			}


			if (old_class_name && old_class_name.trim().length > 0) {
				new_class_name = old_class_name.replace(new_class_name).trim() + ' ' + new_class_name;
			}

			props.innerBlocks[index].attributes.className = new_class_name;
		}
	}

	return (
			<InnerBlocks.Content />
	);
}
