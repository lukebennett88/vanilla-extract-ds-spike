import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

export default defineConfig((options) => ({
	entry: ['src/styles/index.ts', 'src/index.ts'],
	splitting: false,
	clean: !options.watch,
	dts: true,
	format: 'cjs',
	esbuildPlugins: [
		vanillaExtractPlugin({
			identifiers: options.watch ? 'debug' : 'short',
		}),
	],
}));
