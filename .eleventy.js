const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

// Import transforms
const parseTransform = require('./transforms/parse-transform.js');

module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addCollection("posts", function(collection) {
    const coll = collection.getFilteredByTag("posts");
  
    for(let i = 0; i < coll.length ; i++) {
      const prevPost = coll[i-1];
      const nextPost = coll[i + 1];
  
      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }
  
    return coll;
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addTransform('parse', parseTransform);

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      includes: "_includes",
      layouts: "_includes/_layouts",
      partials: "_includes/partials",
      data: "_data",
    }
  }
  
};

