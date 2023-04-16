#!/usr/bin/env node

// Import required modules using ES module syntax
import arg from "arg";
import { getContent } from "./scrapper.js";

// Function to parse command line arguments
export function parseArgumentsIntoOptions(rawArgs) {
	// Parse arguments using 'arg' module
	const args = arg(
		{
			"--url": String, // Add option for URL argument
			"-u": "--url", // Add alias for URL argument
		},
		{
			argv: rawArgs.slice(2), // Slice off the first two arguments (node and script file)
		}
	);
	return {
		url: (args && args["--url"]) || null, // Extract URL from parsed arguments
	};
}

// Function to handle the command line interface
export function cli(args) {
	const options = parseArgumentsIntoOptions(args);
	if (!options.url) {
		console.error("Error: You must provide a URL with --url option");
		process.exit(1);
	}
	// Call getContent function with provided URL
	getContent(options.url)
		.then((metadata) => console.log(metadata))
		.catch((error) => console.error("Error:", error));
}
