import Fetch from "@11ty/eleventy-fetch";

import dotenv from "dotenv";

dotenv.config();

const CALENDAR_ID = 'gwchildshsa@gmail.com';
const API_KEY = process.env.GOOGLE_API_KEY;
const TIME_MIN = new Date().toISOString();

const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_API_KEY}&timeMin=${TIME_MIN}&singleEvents=true&orderBy=startTime`;

export default async function () {
  try {
    let json = await Fetch(url, {
      duration: "1w",
      type: "json",
    });

    return json.items;
  } catch (error) {
    console.error("Failed to fetch calendar:", error);
    return [];
  }
};