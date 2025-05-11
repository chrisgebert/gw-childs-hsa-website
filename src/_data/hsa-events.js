import Fetch from "@11ty/eleventy-fetch";

const CALENDAR_ID = 'gwchildshsa@gmail.com';
const API_KEY = process.env.GOOGLE_API_KEY;

const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime`;

export default async function () {
  try {
    let json = await Fetch(url, {
      duration: "1w",
      type: "json",
    });

    return json;
  } catch (error) {
    console.error("Failed to fetch calendar:", error);
    return [];
  }
};