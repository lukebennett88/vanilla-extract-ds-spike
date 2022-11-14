import { useButton as useAriaButton } from '@react-aria/button';
import { mergeRefs } from '@react-aria/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useRef } from 'react';

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
			'className': getButtonStyles({ ...props, className: props.className }),
			'style': props.style,
			...buttonProps,
		},
	};
}

////////////////////////////////////////////////////////////////////////////////

/**
 * getButtonStyles
 *
 * @description
 */

export const getButtonStyles = cva(
	['border cursor-default font-medium inline-flex items-center rounded-full'],
	{
		variants: {
			prominence: {
				high: [
					'bg-skin-button-muted border-transparent text-skin-base',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-skin-button-accent',
					'hover:bg-skin-fill',
				],
				low: [
					'bg-skin-button-accent border-transparent text-skin-inverted',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-skin-button-accent',
					'hover:bg-skin-button-accent-hover',
				],
			},
			/**
			 * We would need to use compoundVariants for to style with both tone
			 * and prominence.
			 */
			// tone: {
			// 	positive: [''],
			// 	critical: [''],
			// 	caution: [''],
			// 	info: [''],
			// },
			size: {
				small: ['px-4 h-8 text-sm'],
				regular: ['px-6 h-12 text-base'],
			},
		},
		defaultVariants: {
			prominence: 'high',
			size: 'regular',
			// tone: 'positive',
		},
	}
);

////////////////////////////////////////////////////////////////////////////////

/**
 * Types
 */

export type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonVariantProps = VariantProps<typeof getButtonStyles>;
export type ButtonProps = NativeButtonProps & ButtonVariantProps;
export type UseButtonReturn = {
	buttonProps: NativeButtonProps;
};
