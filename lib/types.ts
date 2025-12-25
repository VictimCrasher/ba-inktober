export type Entry = {
	date: string;
	title: string;
	description: string[];
	note: string[];
	school: string;
	characters: {
		name: string;
		club: string;
	}[];
	isLandscape: boolean;
	image: string;
};
