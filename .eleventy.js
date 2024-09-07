const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    // Set custom directories for input, output, includes, and data
    eleventyConfig.addFilter("futureEvents", function(events) {
        const now = DateTime.now();
        const sixWeeksLater = now.plus({ weeks: 6});

        return events.filter(event => {
            const eventDate = DateTime.fromISO(event.date);
            return eventDate >= now && eventDate <= sixWeeksLater;
        });
    });
    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return DateTime.fromISO(date).toFormat(format);
    });

    eleventyConfig.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByTag("post");
    });

    eleventyConfig
        .addPassthroughCopy("src/assets/css")
        .addPassthroughCopy("src/assets/images")
        .addPassthroughCopy("src/assets/js")
        .addPassthroughCopy("src/files/")
        .addPassthroughCopy("src/admin");

    return {
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        passthroughFileCopy: true,
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
    };
};