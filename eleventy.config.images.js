// This is mostly to make the new EleventyImageTransform plugin compatible with my old shortcode calls

module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode("image", async function (src, alt, vw="") {
		// Start building the img tag
        let imgTag = `<img src="${src}" alt="${alt}"`;

        // Check if vw is provided and not empty
        if (vw) {
            imgTag += ` style="width: ${vw}; height: auto;"`;
        }

        // Close the img tag
        imgTag += '>';

        return imgTag;
    });
};