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

import { InspectorControls} from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, TextControl, CheckboxControl, IconButton    } from '@wordpress/components';

import { useEffect } from '@wordpress/element';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes }) {

	// The text of the submit button
	const onChangeButtonText = ( newText ) => {
		setAttributes ( {button_text: newText });
	};

	// default selection for a category/tag changes
	const onChangeTagDefault = ( newTagDefault, tag ) => {

		let newDefaultSelection = newTagDefault ? 1 : 0;

		setAttributes ( {
			default_tags: {
				...attributes.default_tags, 
				[tag]: {
					...attributes.default_tags[tag],
					default_selection: newDefaultSelection
				}
			} 
		} );
	};


	// visibility of a tag/category changes
	const onChangeVisibility = ( tag, visible ) => {

		setAttributes ( {
			default_tags: {
				...attributes.default_tags, 
				[tag]: {
					...attributes.default_tags[tag],
					visible: visible
				}
			} 
		} );
	}


	// initialize the default tag status
	useEffect( () => {
		
		let new_tags = [];

		for (const key in push_notification_user_tags_list){
			let current_tag = attributes.default_tags[key] || {};
			let current_label = push_notification_user_tags_list[key] || '';

			let new_tag = {
				key: key,
				label: current_label,
				default_selection: 0,
				visible: 1
			};

			new_tags[key] = {...new_tag, current_tag};
		}
		
		setAttributes ( {
			default_tags: { ...new_tags, ...attributes.default_tags }
		});
		
		return () => {false};
	}, []);



	// visibility switch for visible categories
	let visible_icon = (tag) => {
		return (<IconButton 
			className="visibility-button"
			label="Category is visible"
			onClick={() => onChangeVisibility(tag, 0)}
			icon={
				<svg>
					<path  d="M12.22,6.09A12.91,12.91,0,0,0,2,11.68c2.58,3.44,6.21,5.6,10.25,5.6s7.66-2.16,10.24-5.6A12.91,12.91,0,0,0,12.22,6.09Zm0,10.13a4.54,4.54,0,1,1,4.54-4.54A4.55,4.55,0,0,1,12.22,16.22Z" transform="translate(-1.97 -5.09)"/>
					<path d="M14,13.46a2.54,2.54,0,0,0,.71-1.76,2.58,2.58,0,0,0-4.21-2A3.9,3.9,0,0,1,14,13.46Z" transform="translate(-1.97 -5.09)"/>
				</svg>
			} 
		/>);
	};

	
	// visibility switch for INvisible categories
	let invisible_icon = (tag) => {
		return (<IconButton 
			className="visibility-button"
			label="Category is hidden"
			onClick={() => onChangeVisibility(tag, 1)}
			icon={
				<svg>
					<path  d="M5.21,14.9l2.53-2.53a5,5,0,0,1-.07-.69,4.55,4.55,0,0,1,4.55-4.54,4,4,0,0,1,.69.07l1-1a11.63,11.63,0,0,0-1.67-.13A12.91,12.91,0,0,0,2,11.68,15.2,15.2,0,0,0,5.21,14.9Z" transform="translate(-1.97 -4.6)"/>
					<path d="M19.09,8.36l-2.42,2.43a5.27,5.27,0,0,1,.09.89,4.54,4.54,0,0,1-4.54,4.54,4.26,4.26,0,0,1-.89-.09l-1,1a10.38,10.38,0,0,0,1.86.18c4,0,7.66-2.16,10.24-5.6A15.35,15.35,0,0,0,19.09,8.36Z" transform="translate(-1.97 -4.6)"/>
					<rect  x="1.61" y="10.41" width="21.52" height="2.01" transform="translate(-6.42 7.49) rotate(-45)"/>
				</svg>
			} 
		/>);
	}

	// set up list of tags checkboxes
	let tag_list = [];
	for (const key in push_notification_user_tags_list) {

		let label = push_notification_user_tags_list[key];

		// default the label to the key
		if (label.length == 0) {
			label = <em>{key}</em>;
		}

		let row_class = "tag_row ";
		let visibility_icon = visible_icon(key);
		let disabled = false;

		// changes for invisible categories
		if (attributes.default_tags[key] && ! attributes.default_tags[key].visible) {
			row_class += " invisible";
			visibility_icon = invisible_icon(key);
			disabled=true;
		}

		tag_list.push (
			<div className={row_class}>
			{visibility_icon}
				<CheckboxControl 
					label={label}
					disabled={disabled}
					onChange={(newValue) => onChangeTagDefault(newValue, key)}
					checked={ attributes.default_tags[key] && attributes.default_tags[key].default_selection }
				/>
			</div>
		);
	}


	return (
		<>
		<p { ...useBlockProps() }>
			{tag_list}
			<TextControl
				label="Button text"
				value={attributes.button_text}
				onChange={onChangeButtonText}
			/>
		</p>

		</>
	);
}
