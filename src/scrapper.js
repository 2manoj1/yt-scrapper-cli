import got from "got";
import createMetascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperTitle from "metascraper-title";
import { load } from "cheerio";

// Function to get content metadata
export const getContent = async (ytUrl, metascraperInstance = null) => {
	try {
		if (typeof ytUrl !== "string")
			throw new Error("Failed to fetch content metadata");

		const metascraperToUse =
			metascraperInstance ||
			createMetascraper([metascraperTitle(), metascraperDescription()]);

		// Fetch HTML content from URL
		const response = await got(ytUrl);

		// Extract metadata using metascraper
		const metadataFromScraper = await metascraperToUse({
			html: response?.body,
			url: response?.url,
		});

		// Load HTML content into Cheerio for additional processing
		const $ = load(response?.body);

		// Extract keyword and category from script tags
		let scripts = $("script").filter(function () {
			return $(this).html().indexOf('"category":') > -1;
		});
		let category = "";
		let longDescription = "";
		if (scripts.length === 1) {
			let text = $(scripts[0]).text();
			var func = new Function(
				"return " + text.split("var ytInitialPlayerResponse =")[1]
			);
			const val = func();

			const data = val?.microformat?.playerMicroformatRenderer;
			category = data?.category;
			longDescription = data?.description?.simpleText;
		}

		// Return combined metadata
		return {
			...metadataFromScraper,
			keyword: $('meta[name="keywords"]').attr("content"),
			category,
			longDescription,
		};
	} catch (error) {
		throw new Error("Failed to fetch content metadata");
	}
};
