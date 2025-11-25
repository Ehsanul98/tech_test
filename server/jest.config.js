module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/src/__tests__/**/*.test.ts'],
	collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
	globals: {
		'ts-jest': {
			tsconfig: {
				esModuleInterop: true,
			},
		},
	},
	// Set NODE_ENV to 'test' for all tests
	testEnvironmentOptions: {
		env: {
			NODE_ENV: 'test',
		},
	},
};
