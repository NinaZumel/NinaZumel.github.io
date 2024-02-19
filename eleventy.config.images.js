const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

function relativeToInputPath(inputPath, relativeFilePath) {
	let split = inputPath.split("/");
	split.pop();

	return path.resolve(split.join(path.sep), relativeFilePath);

}

function isFullUrl(url) {
	try {
		new URL(url);
		return true;
	} catch(e) {
		return false;
	}
}

module.exports = function(eleventyConfig) {
	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	// arguments - image source, alt text, list of sizes to generate, fallback viewport size (100 is 100% of viewport)
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, sizes="100vw", iwidths=[400, 800, 1200, "auto"]) {
		// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
		let formats = ["png"];

		let input;
		if(isFullUrl(src)) {
			input = src;
		} else {
			input = relativeToInputPath(this.page.inputPath, src);
		}

		let metadata = await eleventyImage(input, {
			widths: iwidths,     
			formats,
			outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
			filenameFormat: (id, src, width, format) => {
				const filename = src.split('/').slice(-1)[0].split('.')[0];
				if (width) {
				  return `${filename}-${id}-${width}.${format}`
				}
				return `${filename}-${id}.${format}`
			  }
		});

		// TODO loading=eager and fetchpriority=high
		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

		return eleventyImage.generateHTML(metadata, imageAttributes);
	});
};
