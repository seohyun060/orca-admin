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
