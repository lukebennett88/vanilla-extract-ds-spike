/**
 * Everything exported from this file will be available
 * within the Remix app via the "~/styles" import.
 */

// Global styles
import './global.css';

// Utility classes
export { sprinkles } from './sprinkles.css';
export type { Sprinkles } from './sprinkles.css';

// Component styles
import * as Button from '../button/button.css';
export const componentStyles = {
	Button,
};
