// Create a function that returns a random entry from the entries array that's consistent every day
import { entries } from "@/lib/entries";
import { Entry } from "@/lib/types";
import moment from "moment";

/**
 * A seeded pseudo-random number generator using the Mulberry32 algorithm.
 * @param {number} seed - The seed value.
 * @returns {function} A function that generates the next pseudo-random number (0-1).
 */
function mulberry32(seed: number): () => number {
	return function () {
		let t = (seed += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// Get a featured entry that's consistent every day
// How it works: Create a random seed based on the current date and use it to get a consistent entry
export const getFeaturedEntry = (currentDate: Date = new Date()): Entry | undefined => {
	// Create a seed based on the date (year, month, day) only, ignoring time
	const randomSeed = moment(currentDate).format("YYYYMMDD");
	const randomGenerator = mulberry32(Number(randomSeed));
	const randomIndex = Math.floor(randomGenerator() * entries.length);
	return entries[randomIndex] as Entry | undefined;
};
