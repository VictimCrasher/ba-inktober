export type EntryListItem = {
	date: string;
	title: string;
	school: string | undefined;
	characters: {
		name: string;
	}[];
	thumbnail: string;
};

export type FeaturedEntry = {
	date: string;
	title: string;
	thumbnail: string;
	isLandscape: boolean;
};

export type Entry = {
	date: string;
	title: string;
	description: string[];
	note: string[];
	school: string | undefined;
	characters: {
		name: string;
		club: string | undefined;
	}[];
	isLandscape: boolean;
	image: string;
	thumbnail: string;
	pixiv?: string;
	twitter?: string;
	blueSky?: string;
};
