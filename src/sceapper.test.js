import got from "got";
import createMetascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperTitle from "metascraper-title";
import { load } from "cheerio";
import { getContent } from "./scrapper.js"; // Replace with the correct path to your module

// Mocking external dependencies
jest.mock("got");
jest.mock("metascraper");
jest.mock("metascraper-description");
jest.mock("metascraper-title");

describe("getContent", () => {
	it("should fetch content metadata successfully", async () => {
		// Mock response from got
		const response = {
			body: `
        <html>
          <head>
            <meta name='keywords' content='Test Keywords'>
          </head>
          <body>
            <script>
              var ytInitialPlayerResponse = { 
                "microformat": { 
                  "playerMicroformatRenderer": { 
                    "category": "Test Category", 
                    "description": { "simpleText": "Test Description" } 
                  } 
                } 
              };
            </script>
          </body>
        </html>
      `,
			url: "https://example.com",
		};
		got.mockResolvedValueOnce(response);

		// Mock Cheerio filter, text, and attr methods
		const mockCheerio = {
			filter: jest.fn(),
			text: jest.fn(),
			attr: jest.fn(),
		};
		mockCheerio.filter.mockReturnValueOnce(mockCheerio);
		mockCheerio.text.mockReturnValueOnce("");
		mockCheerio.attr.mockReturnValueOnce("Test Keywords");

		// Mock metadata from metascraper
		const metadataFromScraper = {
			title: "Test Title",
			description: "Test Description",
		};
		const mockMetascraperInstance = jest
			.fn()
			.mockResolvedValueOnce(metadataFromScraper);
		createMetascraper.mockReturnValueOnce(mockMetascraperInstance);

		// Invoke getContent function with mocked metascraperInstance
		const result = await getContent(
			"https://example.com",
			mockMetascraperInstance
		);

		// Assert expected result
		expect(result).toEqual({
			...metadataFromScraper,
			keyword: "Test Keywords",
			category: "Test Category",
			longDescription: "Test Description",
		});
	});

	it("should throw an error if ytUrl is not a string", async () => {
		await expect(getContent(12345)).rejects.toThrow(
			"Failed to fetch content metadata"
		);
	});

	it("should throw an error if fetching content fails", async () => {
		got.mockRejectedValueOnce(new Error("Failed to fetch content"));
		await expect(getContent("https://example.com")).rejects.toThrow(
			"Failed to fetch content metadata"
		);
	});
});
