export type Researchers = {
	id: number;
	name: string;
	department: string;
	project: string;
	stored: boolean;
	location: number;
	profile: string;
	link: string;
	twitter: string;
	biography: string;
	publications: string[];
};

export type GNBTableTypes = {
	label: string;
	path: string;
	icon: string;
};
export type Insights = {
	id: number;
	type: string;
	title: string;
	date: string;
	pdfList: string[];
	text: string;
	stored: boolean;
};

export type Newsletters = {
	id: number;
	email: string;
};
export type ResearcherList = Researchers[];
export type EChange = React.ChangeEvent<HTMLInputElement>;

export type OnSetEdit = (
	edit: boolean,
	id: number,
	name: string,
	department: string,
	project: string,
	location: number,
	profile: string,
	link: string,
	twitter: string,
	biography: string,
	publications: string[],
) => void;

export type OnApplyClicked = (
	edit: boolean,
	id: number,
	locationEdit: number,
	nameEdit: string,
	departmentEdit: string,
	projectEdit: string,
	selectedProfile: File | null,
	linkEdit: string,
	twitterEdit: string,
	biographyEdit: string,
	publicationEdit: string[],
) => void;

export type OnApplyInsight = (
	edit: boolean,
	id: number,
	type: string,
	pdfList: string[],
	text: string,
) => void;
