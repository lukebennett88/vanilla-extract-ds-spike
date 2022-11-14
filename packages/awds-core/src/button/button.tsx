import { useButton as useAriaButton } from '@react-aria/button';
import { mergeRefs } from '@react-aria/utils';
import { cx } from 'class-variance-authority';
import { forwardRef, useRef } from 'react';
import { componentStyles } from '../styles';

////////////////////////////////////////////////////////////////////////////////
/**
 * Button
 *
 * @description
 */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(props, forwardedRef) {
		const internalRef = useRef<HTMLButtonElement>(null);
		const { buttonProps } = useButton(props, internalRef);
		return (
			<button ref={mergeRefs(internalRef, forwardedRef)} {...buttonProps} />
		);
	}
);

////////////////////////////////////////////////////////////////////////////////

const buttonStyles = componentStyles.Button;

/**
 * useButton
 *
 * @description
 */

export function useButton(
	props: ButtonProps,
	ref: React.RefObject<HTMLButtonElement>
): UseButtonReturn {
	const { buttonProps, isPressed } = useAriaButton(
		// @ts-expect-error: event handlers don't match up with native types here
		props,
		ref
	);
	return {
		buttonProps: {
			/**
			 * Probably not strictly required here, but now we have a way to detect if
			 * the button is pressed using only CSS.
			 */
			'aria-pressed': isPressed ? 'true' : undefined,
			/**
			 * Not every prop passed into `useAriaButton` gets returned so we need to
			 * manually pass through what we want here for now.
			 */
			'children': props.children,
			'className': cx(
				buttonStyles.root,
				buttonStyles.size[props.size],
				props.className
			),
			'style': props.style,
			...buttonProps,
		},
	};
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Types
 */

export type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonProps = NativeButtonProps & {
	size: keyof typeof buttonStyles.size;
};
export type UseButtonReturn = {
	buttonProps: NativeButtonProps;
};
