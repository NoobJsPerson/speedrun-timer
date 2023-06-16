module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: 'airbnb-base',
	overrides: [
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'no-alert': 0,
		'no-console': 0,
		'no-plusplus': 0,
		'linebreak-style': ['error', 'unix'],
	},
};
