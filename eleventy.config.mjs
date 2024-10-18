import { DateTime } from "luxon";

import UpgradeHelper from "@11ty/eleventy-upgrade-help";

import { I18nPlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {    // Set custom directories for input, output, includes, and data

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

    eleventyConfig.addFilter("basicDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });


    eleventyConfig.addPlugin(UpgradeHelper);

    ['src/assets/css', 'src/assets/images', 'src/assets/js', 'src/files', 'src/admin'].forEach(path =>
        eleventyConfig.addCollection(path)
    );

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid",
            "11ty.js",
        ],

        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",

        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
    };
}