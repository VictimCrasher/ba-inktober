import { years } from "@/lib/entries";

export const YEAR_OPTIONS: { label: string; value: string }[] = [
	{ label: "All Years", value: "" },
	...years.map((year) => ({ label: year, value: year })),
];

export const ITEM_PER_PAGE = 12;
