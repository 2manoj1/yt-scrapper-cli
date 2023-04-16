// Import the functions from cli.js
import { parseArgumentsIntoOptions, cli } from "./cli.js";
// Import the getContent function from scrapper.js (you may need to provide a mock for this)
import { getContent } from "./scrapper.js";

// Mock the console.error and process.exit functions
console.error = jest.fn();
process.exit = jest.fn();

// Mock the getContent function
jest.mock("./scrapper.js", () => ({
	getContent: jest.fn().mockResolvedValue({
		title: "Example Title",
		description: "Example Description",
	}),
}));

// Test suite for parseArgumentsIntoOptions function
describe("parseArgumentsIntoOptions", () => {
	// Test case 1: should parse arguments and return options object
	it("should parse arguments and return options object", () => {
		// Mock the rawArgs input
		const rawArgs = ["node", "script.js", "--url", "https://example.com"];
		// Call the parseArgumentsIntoOptions function
		const options = parseArgumentsIntoOptions(rawArgs);
		// Assert that the returned options object has the correct properties and values
		expect(options).toEqual({ url: "https://example.com" });
	});

	// Test case 2: should return null if --url argument is not provided
	it("should return null if --url argument is not provided", () => {
		// Mock the rawArgs input
		const rawArgs = ["node", "script.js"];
		// Call the parseArgumentsIntoOptions function
		const options = parseArgumentsIntoOptions(rawArgs);
		// Assert that the returned options object has a null url property
		expect(options.url).toBeNull();
	});
});

// Test suite for cli function
describe("cli", () => {
	// Test case 1: should call getContent function with provided URL
	it("should call getContent function with provided URL", () => {
		// Mock the args input
		const args = ["node", "script.js", "--url", "https://example.com"];
		// Call the cli function
		cli(args);
		// Assert that the getContent function is called with the correct URL
		expect(getContent).toHaveBeenCalledWith("https://example.com");
	});

	// Test case 2: should print error message and exit with code 1 if --url argument is not provided
	it("should print error message and exit with code 1 if --url argument is not provided", () => {
		// Mock the args input
		const args = ["node", "script.js"];
		// Call the cli function
		cli(args);
		// Assert that the console.error function is called with the correct error message
		expect(console.error).toHaveBeenCalledWith(
			"Error: You must provide a URL with --url option"
		);
		// Assert that the process.exit function is called with code 1
		expect(process.exit).toHaveBeenCalledWith(1);
	});
});
