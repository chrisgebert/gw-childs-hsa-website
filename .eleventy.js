module.exports = function(eleventyConfig) {  
    // Set custom directories for input, output, includes, and data 
    eleventyConfig.addPassthroughCopy("src/assets/css/style.css");
    eleventyConfig.addPassthroughCopy("src/assets/images");

    return {
        passthroughFileCopy: true,
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
    };
};