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
	pixiv?: string;
	twitter?: string;
	blueSky?: string;
};
