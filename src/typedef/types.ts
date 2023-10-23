export type Publication = {
	link: string;
	title: string;
	author: string;
	pubYear: number;
	journal: string;
	conference: string;
	volume: string;
	editable: boolean;
};

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
	publications: Publication[];
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
	publications: Publication[],
) => void;

export type OnApplyClicked = (
	//∂edit: boolean,
	id: number,
	locationEdit: number,
	nameEdit: string,
	departmentEdit: string,
	projectEdit: string,
	selectedProfile: File | null,
	linkEdit: string,
	twitterEdit: string,
	biographyEdit: string,
	publicationEdit: Publication[],
) => void;

export type OnApplyInsight = (
	edit: boolean,
	id: number,
	type: string,
	pdfList: string[],
	text: string,
) => void;

export type VisitorGraph = {
	monthly: number[];
	weekly: number[];
	daily: number[];
};

type AccVisitor = {
	today: number;
	yesterday: number;
	lastweek: number;
	last7days: number;
	last30days: number;
	last60days: number;
	last90days: number;
	last12months: number;
	thisyear: number;
	lastyear: number;
	total: number;
};
export type VisitorTable = {
	web: AccVisitor;
	mobile: AccVisitor;
};

type ProjectStatus = {
	active: number;
	completed: number;
	terminated: number;
};

type EventStatus = {
	lastEvent: number;
	upcomingEvent: number;
};
export type StatisticsList = {
	researcherNumber: number;
	newsletterNumber: number;
	orcagroupNumber: number;
	projectStatus: ProjectStatus;
	eventStatus: EventStatus;
};
