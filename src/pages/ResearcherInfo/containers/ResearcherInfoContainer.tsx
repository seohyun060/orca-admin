import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import ResearcherInfo from '../ResearcherInfo';
import { useLocation } from 'react-router-dom';
import { EChange, Researchers } from '@typedef/types';
import { ResearcherList, Publication } from '@typedef/types';
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
		useState<Publication[]>(publications);
	const [locationEdit, setLocationEdit] = useState(mapLocation);
	const [pubEdit, setPubEdit] = useState(false);
	const onClickPubEdit = useCallback(
		(index: number) => {
			const updatedPublication = [...publicationEdit];
			updatedPublication[index].editable = !updatedPublication[index].editable;
			setPublicationEdit(updatedPublication);
		},
		[publicationEdit],
	);

	const uploadProfileHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				setSelectedProfile(file);
			}
		},
		[setSelectedProfile],
	);

	// const onChangePublicationEdit = useCallback(
	// 	(e: EChange, index: number) => {
	// 		const updatedPublication = [...publicationEdit];
	// 		updatedPublication[index] = e.target.value;
	// 		setPublicationEdit(updatedPublication);
	// 	},
	// 	[publicationEdit],
	// );
	const onChangePubEdit = useCallback(
		(e: EChange, index: number, type: number) => {
			const updatedPublication = [...publicationEdit];
			switch (type) {
				case 0:
					updatedPublication[index].link = e.target.value;
					break;
				case 1:
					updatedPublication[index].title = e.target.value;
					break;
				case 2:
					updatedPublication[index].author = e.target.value;
					break;
				case 3:
					updatedPublication[index].year = e.target.value;
					break;
				case 4:
					updatedPublication[index].journal = e.target.value;
					break;
				case 5:
					updatedPublication[index].conference = e.target.value;
					break;
				case 6:
					updatedPublication[index].ho = e.target.value;
					break;
			}
			setPublicationEdit(updatedPublication);
		},
		[publicationEdit],
	);
	// const onChangePubLink = useCallback(
	// 	(e: EChange, index: number) => {
	// 		const updatedPublication = [...publicationEdit];
	// 		updatedPublication[index].link = e.target.value;
	// 		setPublicationEdit(updatedPublication);
	// 	},
	// 	[publicationEdit],
	// );
	// const onChangePubTitle = useCallback(
	// 	(e: EChange, index: number) => {
	// 		const updatedPublication = [...publicationEdit];
	// 		updatedPublication[index].title = e.target.value;
	// 		setPublicationEdit(updatedPublication);
	// 	},
	// 	[publicationEdit],
	// );
	// const onChangePubAuthor = useCallback(
	// 	(e: EChange, index: number) => {
	// 		const updatedPublication = [...publicationEdit];
	// 		updatedPublication[index].author = e.target.value;
	// 		setPublicationEdit(updatedPublication);
	// 	},
	// 	[publicationEdit],
	// );
	// const onChangePubYear = useCallback(
	// 	(e: EChange, index: number) => {
	// 		const updatedPublication = [...publicationEdit];
	// 		updatedPublication[index].year = parseInt(e.target.value);
	// 		setPublicationEdit(updatedPublication);
	// 	},
	// 	[publicationEdit],
	// );
	// const onChangePubJournal = useCallback(
	// 	(e: EChange, index: number) => {
	// 		const updatedPublication = [...publicationEdit];
	// 		updatedPublication[index].journal = e.target.value;
	// 		setPublicationEdit(updatedPublication);
	// 	},
	// 	[publicationEdit],
	// );
	// const onChangePubConference = useCallback(
	// 	(e: EChange, index: number) => {
	// 		const updatedPublication = [...publicationEdit];
	// 		updatedPublication[index].conference = e.target.value;
	// 		setPublicationEdit(updatedPublication);
	// 	},
	// 	[publicationEdit],
	// );
	// const onChangePubHo = useCallback(
	// 	(e: EChange, index: number) => {
	// 		const updatedPublication = [...publicationEdit];
	// 		updatedPublication[index].ho = e.target.value;
	// 		setPublicationEdit(updatedPublication);
	// 	},
	// 	[publicationEdit],
	// );
	const onAddClicked = useCallback(() => {
		setPublicationEdit((prevEdit) => [
			...prevEdit,
			{
				link: '',
				title: '',
				author: '',
				year: '',
				journal: '',
				conference: '',
				ho: '',
				editable: false,
			},
		]);
	}, [publicationEdit]);
	const onSubClicked = (index: number) => {
		setPublicationEdit((prevList) => {
			// 배열에서 index 위치의 요소를 제외한 새 배열 생성
			const updatedList = prevList.filter((item, i) => i !== index);
			return updatedList;
		});
	};
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
			publicationEdit: Publication[],
		) => {
			console.log(researcherList[1]);
			const filteredPublicationEdit = publicationEdit.filter((item, index) => {
				return (
					item.link !== '' ||
					item.title !== '' ||
					item.author !== '' ||
					item.year !== '' ||
					item.journal !== '' ||
					item.conference !== '' ||
					item.ho !== ''
				);
			});
			if (filteredPublicationEdit.length == 0) {
				filteredPublicationEdit.push({
					link: '',
					title: '',
					author: '',
					year: '',
					journal: '',
					conference: '',
					ho: '',
					editable: false,
				});
			}
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
	useEffect(() => {
		return () => {};
	}, []);

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
			//onChangePublicationEdit={onChangePublicationEdit}
			locationEdit={locationEdit}
			onLocationClicked={onLocationClicked}
			onAddClicked={onAddClicked}
			onApplyClicked={onApplyClicked}
			onChangePubEdit={onChangePubEdit}
			pubEdit={pubEdit}
			onClickPubEdit={onClickPubEdit}
			onSubClicked={onSubClicked}
		/>
	);
};

export default ResearcherInfoContainer;
