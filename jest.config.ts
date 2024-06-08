// Export a Jest configuration object
export default {
  // Set the preset to 'ts-jest' for TypeScript support
  preset: 'ts-jest',
  // Specify the test environment as 'jsdom' to simulate a browser-like environment
  testEnvironment: 'node',
  // Define module name mapping for CSS, LESS, SCSS, and SASS files to 'identity-obj-proxy'
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  // Specify setup files to be run after Jest is initialized
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

// may need to look into "jest.pathToJest": "npm.cmd test --"
// run "npx jest" to run the tests or npx jest __tests__/name.test.ts etc
// ?may also Ctrl+Shift+P if installed on VScode and search Run Test?