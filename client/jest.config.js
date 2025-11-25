/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom', // Changed from 'node' to 'jsdom' for React
	testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
		'\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js', // Mock file imports
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
};
