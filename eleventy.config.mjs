import { DateTime } from "luxon";

import { EleventyI18nPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {    // Set custom directories for input, output, includes, and data

    eleventyConfig.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByTag("post");
    });

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

      // Filter to find the most urgent project (ending soonest with reasonable funding need)
    eleventyConfig.addFilter("findUrgentProject", function(apiResponse) {
        if (!apiResponse || apiResponse.length === 0) return null;

        const proposals = apiResponse.proposals;
        const now = new Date();
        const ninetyDaysFromNow = new Date(now.getTime() + (48 * 24 * 60 * 60 * 1000));

        // Find projects ending within 2 weeks, sorted by deadline
        const urgentProjects = proposals
        .filter(project => {
            if (!project.expirationDate) return false;
            const deadline = new Date(project.expirationDate);
            return deadline >= now && deadline <= ninetyDaysFromNow;
        })
        .sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

        // Return the most urgent project with a reasonable funding amount
        return urgentProjects.find(project => {
        const amount = parseFloat(project.costToComplete);
        return amount > 50 && amount < 1000; // Reasonable range for urgency
        }) || urgentProjects[0] || null;
    });

    // Filter to find the most popular/accessible project (lowest amount needed)
    eleventyConfig.addFilter("findPopularProject", function(apiResponse) {
        if (!apiResponse || apiResponse.length === 0) return null;

        const proposals = apiResponse.proposals;

        // Find active projects sorted by amount needed (ascending)
        const activeProjects = proposals
        .filter(project => {
            if (!project.expirationDate || !project.costToComplete) return false;
            const deadline = new Date(project.expirationDate);
            const now = new Date();
            return deadline > now; // Still active
        })
        .sort((a, b) => parseFloat(a.costToComplete) - parseFloat(b.costToComplete));

        // Return the project with the lowest funding need (most achievable)
        return activeProjects.find(project => {
        const amount = parseFloat(project.costToComplete);
        return amount > 20; // Minimum viable amount
        }) || activeProjects[0] || null;
    });

    // Additional helper filter to check if a project is ending soon
    eleventyConfig.addFilter("isEndingSoon", function(expirationDate, days = 7) {
        if (!expirationDate) return false;
        const deadlineDate = new Date(expirationDate);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() + days);
        return deadlineDate <= cutoffDate && deadlineDate >= new Date();
    });

    // Filter to get projects by urgency level
    eleventyConfig.addFilter("projectsByUrgency", function(apiResponse) {
        if (!donorschoose || apiResponse.length === 0) return [];

        const proposals = apiResponse.proposals;
        const now = new Date();

        return proposals
        .filter(project => {
            if (!project.expirationDate) return false;
            return new Date(project.expirationDate) > now; // Only active projects
        })
        .map(project => ({
            ...project,
            daysLeft: Math.ceil((new Date(project.expirationDate) - now) / (1000 * 60 * 60 * 24)),
            urgencyLevel: (() => {
            const daysLeft = Math.ceil((new Date(project.expirationDate) - now) / (1000 * 60 * 60 * 24));
            if (daysLeft <= 7) return 'critical';
            if (daysLeft <= 21) return 'urgent';
            if (daysLeft <= 60) return 'moderate';
            return 'low';
            })()
        }))
        .sort((a, b) => a.daysLeft - b.daysLeft);
    });

    // Filter to format currency amounts
    eleventyConfig.addFilter("currency", function(amount) {
        if (!amount) return '$0';
        const num = parseFloat(amount);
        return '$' + num.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
        });
    });

    // Helper filter to get funding progress percentage
    eleventyConfig.addFilter("fundingProgress", function(project) {
        if (!project.percentFunded) return 0;
        return parseInt(project.percentFunded);
    });

    // Filter to check if project is nearly funded
    eleventyConfig.addFilter("isNearlyFunded", function(project, threshold = 75) {
        const percentFunded = parseInt(project.percentFunded || 0);
        return percentFunded >= threshold;
    });

    // Filter to get project URL for easy linking
    eleventyConfig.addFilter("projectUrl", function(project) {
        return project.proposalURL || project.fundURL || '#';
    });

    eleventyConfig.addFilter("shuffle", function(array) {
        console.log("Shuffle filter called with:", typeof array, Array.isArray(array));
        
        if (!Array.isArray(array)) {
            console.warn("Shuffle filter received non-array", array);
            return array;
        }

        const shuffled = [...array]; // Create a copy
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    });

    eleventyConfig.addPlugin(EleventyI18nPlugin, {
        defaultLanguage: "en",
        errorMode: "allow-fallback"
    });

    eleventyConfig.addPassthroughCopy("src/assets/images");

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
            "jpg",
            "jpeg",
            "png",
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