import React, { ChangeEvent, useCallback, useState } from 'react';
import ResearcherInfo from '../ResearcherInfo';
import { useLocation } from 'react-router-dom';
import { EChange, Researchers } from '@typedef/types';
import { ResearcherList } from '@typedef/types';
type Props = { researcherList: ResearcherList; setResearcherList: any };

const ResearcherInfoContainer = ({
	researcherList,
	setResearcherList,
}: Props) => {
	const location = useLocation();
	const edit = location.state.Edit;
	const id = location.state.Id;
	const name = location.state.Name;
	const department = location.state.Department;
	const project = location.state.Project;
	const mapLocation = location.state.Location;
	const profile = location.state.Profile;
	const link = location.state.Link;
	const twitter = location.state.Twitter;
	const biography = location.state.Biography;
	const publications = location.state.Publications;

	const [mapDisplay, setMapDisplay] = useState(true);
	const [dropbox, setDropbox] = useState(false);
	const [nameEdit, setNameEdit] = useState(name);
	const [departmentEdit, setDepartmentEdit] = useState(department);
	const [projectEdit, setProjectEdit] = useState(project);
	const [linkEdit, setLinkEdit] = useState(link);
	const [twitterEdit, setTwitterEdit] = useState(twitter);
	const [biographyEdit, setBiographyEdit] = useState(biography);
	const [selectedProfile, setSelectedProfile] = useState<File | null>(null);
	const [publicationEdit, setPublicationEdit] =
		useState<string[]>(publications);
	const [locationEdit, setLocationEdit] = useState(mapLocation);
	const uploadProfileHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedProfile(file);
		}
	};

	const onChangePublicationEdit = useCallback(
		(e: EChange, index: number) => {
			const updatedPublication = [...publicationEdit];
			updatedPublication[index] = e.target.value;
			setPublicationEdit(updatedPublication);
		},
		[publicationEdit],
	);
	const onAddClicked = useCallback(() => {
		setPublicationEdit((prevEdit) => [...prevEdit, '']);
	}, [publicationEdit]);

	const onChangeNameEdit = useCallback(
		(e: EChange) => {
			setNameEdit(e.target.value);
		},
		[nameEdit],
	);
	const onChangeDepartmentEdit = useCallback(
		(e: EChange) => {
			setDepartmentEdit(e.target.value);
		},
		[departmentEdit],
	);
	const onChangeProjectEdit = useCallback(
		(e: EChange) => {
			setProjectEdit(e.target.value);
		},
		[projectEdit],
	);
	const onChangeLinkEdit = useCallback(
		(e: EChange) => {
			setLinkEdit(e.target.value);
		},
		[linkEdit],
	);
	const onChangeTwitterEdit = useCallback(
		(e: EChange) => {
			setTwitterEdit(e.target.value);
		},
		[twitterEdit],
	);
	const onChangeBiographyEdit = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setBiographyEdit(e.target.value);
		},
		[biographyEdit],
	);
	const onDropboxClicked = useCallback(() => {
		setDropbox((prev) => !prev);
	}, [dropbox]);

	const onMapDisplayClicked = useCallback(() => {
		setMapDisplay((prev) => !prev);
	}, [mapDisplay]);
	const onLocationClicked = useCallback(
		(mapNumber: number) => {
			setLocationEdit(mapNumber);
			setDropbox(false);
		},
		[locationEdit, dropbox],
	);

	const onApplyClicked = useCallback(
		(
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
		) => {
			console.log(researcherList[1]);
			const filteredPublicationEdit = publicationEdit.filter(
				(item) => item !== '',
			);
			const createTempResearcher = () => ({
				id,
				name: nameEdit,
				department: departmentEdit,
				project: projectEdit,
				stored: edit
					? researcherList.find((researcher) => researcher.id === id)?.stored
					: false,
				location: locationEdit,
				profile: selectedProfile ? selectedProfile.name : '',
				link: linkEdit,
				twitter: twitterEdit,
				biography: biographyEdit,
				publications: filteredPublicationEdit,
			});

			const updatedResearchers = edit
				? researcherList.map((researcher) =>
						researcher.id === id ? createTempResearcher() : researcher,
				  )
				: [...researcherList, createTempResearcher()];

			setResearcherList(updatedResearchers);
			console.log(researcherList[1]);
		},
		[
			nameEdit,
			departmentEdit,
			projectEdit,
			locationEdit,
			selectedProfile,
			linkEdit,
			twitterEdit,
			biographyEdit,
			publicationEdit,
			researcherList,
			setResearcherList,
		],
	);

	return (
		<ResearcherInfo
			edit={edit}
			id={id}
			mapDisplay={mapDisplay}
			onMapDisplayClicked={onMapDisplayClicked}
			dropbox={dropbox}
			onDropboxClicked={onDropboxClicked}
			nameEdit={nameEdit}
			departmentEdit={departmentEdit}
			projectEdit={projectEdit}
			onChangeNameEdit={onChangeNameEdit}
			onChangeDepartmentEdit={onChangeDepartmentEdit}
			onChangeProjectEdit={onChangeProjectEdit}
			selectedProfile={selectedProfile}
			uploadProfileHandler={uploadProfileHandler}
			profile={profile}
			linkEdit={linkEdit}
			twitterEdit={twitterEdit}
			biographyEdit={biographyEdit}
			onChangeLinkEdit={onChangeLinkEdit}
			onChangeTwitterEdit={onChangeTwitterEdit}
			onChangeBiographyEdit={onChangeBiographyEdit}
			publicationEdit={publicationEdit}
			onChangePublicationEdit={onChangePublicationEdit}
			locationEdit={locationEdit}
			onLocationClicked={onLocationClicked}
			onAddClicked={onAddClicked}
			onApplyClicked={onApplyClicked}
		/>
	);
};

export default ResearcherInfoContainer;
