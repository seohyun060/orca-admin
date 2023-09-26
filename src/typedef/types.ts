export type Researchers = {
	name: string;
	department: string;
	project: string;
	stored: boolean;
};

export type GNBTableTypes = {
	label: string;
	path: string;
	icon: string;
};
export type ResearcherList = Researchers[];
export type EChange = React.ChangeEvent<HTMLInputElement>;
