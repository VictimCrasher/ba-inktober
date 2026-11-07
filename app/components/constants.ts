export const ITEM_PER_PAGE = 12;

export const SORT_OPTIONS = [
	{ label: "Oldest", value: "oldest" },
	{ label: "Newest", value: "newest" },
] as const;

export type SortOrder = (typeof SORT_OPTIONS)[number]["value"];

export const VIEW_OPTIONS = [
	{ label: "Grid", value: "grid" },
	{ label: "Calendar", value: "calendar" },
] as const;

export type ViewMode = (typeof VIEW_OPTIONS)[number]["value"];
