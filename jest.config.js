export default {
	testEnvironment: "node",
	transform: {
		"^.+\\.js$": "babel-jest",
	},
	moduleFileExtensions: ["js"],
	moduleDirectories: ["node_modules"],
	verbose: true,
	testPathIgnorePatterns: ["/node_modules/"],
	collectCoverage: true, // set to true to collect code coverage
	collectCoverageFrom: ["*.js"],
	coverageDirectory: "coverage/",
	coverageReporters: ["text", "lcov"],
	reporters: ["default", "jest-junit"],
	transformIgnorePatterns: [],
	rootDir: "./",
	moduleNameMapper: {
		"^iso-639-3/to-1$": "<rootDir>/mocks/iso-639-3-to-1.js", // replace with the path to your mock file
	},
};
