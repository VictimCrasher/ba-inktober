import { entries } from "./entries";

const dayCount = new Set(entries.map((entry) => entry.date)).size;
const characterCount = new Set(entries.flatMap((entry) => entry.characters.map((character) => character.name))).size;

export const headerLabels = [
	`${dayCount} ${dayCount === 1 ? "Day" : "Days"}.`,
	`${characterCount} ${characterCount === 1 ? "Character" : "Characters"}.`,
	"1 Game.",
];
export const headerDescription = "A journey through the world of Blue Archive through the pen and paper.";
