// Create a function that returns a random entry from the entries array that's consistent every day
import { entries } from "@/lib/entries";
import { Entry } from "@/lib/types";
import moment from "moment";

// Get a featured entry that's consistent every day
// How it works: Create a random seed based on the current date and use it to get a consistent entry
export const getFeaturedEntry = (currentDate: Date = new Date()): Entry | undefined => {
  // Create a seed based on the date (year, month, day) only, ignoring time
  const randomSeed = moment(currentDate).format('YYYYMMDD');
  const randomIndex = Math.floor(Number(randomSeed) % entries.length);
  return entries[randomIndex] as Entry | undefined;
};