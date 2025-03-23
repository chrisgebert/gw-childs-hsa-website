import Fetch from "@11ty/eleventy-fetch";

export default async function () {
    let url = "https://libwww.freelibrary.org/rss/eventsrss.cfm?type=&series=&location=&department=&age=School%20Age";

    let response = await Fetch(url, {
        duration: "1w",
        type: "parsed-xml",
    });

    return response;
};