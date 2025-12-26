export type Entry = {
	date: string;
	title: string;
	description: string[];
	note: string[];
	school: string | undefined;
	characters: {
		name: string;
		club: string;
	}[];
	isLandscape: boolean;
	image: string;
};
