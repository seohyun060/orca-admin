import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import ResearcherInfo from '../ResearcherInfo';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EChange, Researchers } from '@typedef/types';
import { ResearcherList, Publication } from '@typedef/types';
import { ToastContainer, toast } from 'react-toastify';
import {
	putResearchers,
	getResearcherDetail,
	postResearchers,
} from 'src/api/ResearcherAPI';
import images from 'src/assets/images';
type Props = {
	//researcherList: ResearcherList; setResearcherList: any
};

const ResearcherInfoContainer = ({}: // researcherList,
// setResearcherList,
Props) => {
	const location = useLocation();
	//const edit = location.state.Edit;
	// id = location.state.Id;
	const params = useParams();
	const navigate = useNavigate();
	// const name = location.state.Name;
	// const department = location.state.Department;
	// const project = location.state.Project;
	// const mapLocation = location.state.Location;
	// //const profile = location.state.Profile;
	// const link = location.state.Link;
	// const twitter = location.state.Twitter;
	// const biography = location.state.Biography;
	// const publications = location.state.Publications;
	const [edit, setEdit] = useState(false);
	const [id, setId] = useState(0);
	const [mapDisplay, setMapDisplay] = useState(true);
	const [dropbox, setDropbox] = useState(false);
	const [nameEdit, setNameEdit] = useState('');
	const [departmentEdit, setDepartmentEdit] = useState('');
	const [projectEdit, setProjectEdit] = useState('');
	const [linkEdit, setLinkEdit] = useState('');
	const [twitterEdit, setTwitterEdit] = useState('');
	const [profile, setProfile] = useState('');
	const [biographyEdit, setBiographyEdit] = useState('');
	const [selectedProfile, setSelectedProfile] = useState<File | null>(null);
	const [publicationEdit, setPublicationEdit] = useState<Publication[]>([
		{
			link: '',
			title: '',
			author: '',
			pubYear: null,
			journal: '',
			conference: '',
			volume: '',
			editable: true,
		},
	]);
	const [locationEdit, setLocationEdit] = useState(1);
	const [pubEdit, setPubEdit] = useState(true);

	useEffect(() => {
		if (params.id != '0') {
			getResearcherDetail(params.id).then((data) => {
				console.log(data.data); // 나옴
				//const updatedList: ResearcherList = [];
				setId(data.data.id);
				setLocationEdit(data.data.locationNumber);
				setNameEdit(data.data.name);
				setDepartmentEdit(data.data.affiliation);
				setProjectEdit(data.data.projectType);
				setProfile(data.data.image);
				//setSelectedProfile(data.data.image);
				setLinkEdit(data.data.linkedIn);
				setTwitterEdit(data.data.twitter);
				setBiographyEdit(data.data.biography);
				const pubAPI = data.data.publications;
				console.log(pubAPI);
				setPublicationEdit(pubAPI);
				console.log(publicationEdit);
				// if (data.data.publications.length != 0) {
				// 	const updatedPublication = [...publicationEdit];
				// 	for (let i = 0; i < pubAPI.length; i++) {
				// 		updatedPublication[i].title = pubAPI[i].title;
				// 		updatedPublication[i].author = pubAPI[i].author;
				// 		updatedPublication[i].year = pubAPI[i].pubYear;
				// 		updatedPublication[i].journal = pubAPI[i].journal;
				// 		updatedPublication[i].conference = pubAPI[i].conference;
				// 		updatedPublication[i].ho = pubAPI[i].volume;
				// 		updatedPublication[i].link = pubAPI[i].link;
				// 	}
				// 	setPublicationEdit(updatedPublication);
				// 	console.log(updatedPublication);
				// }

				//console.log(researcherList); // 안나옴
			});
		}

		//console.log(researcherList); // 안나옴
	}, []);
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
				if (
					file.type ===
					('application/png' || 'application/jpeg' || 'application/svg')
				) {
					console.log('이건 이미지');
					setSelectedProfile(file);
				} else {
					alert('올바른 이미지 파일을 선텍하세요.');
				}
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
					updatedPublication[index].pubYear = parseInt(e.target.value);
					console.log(e.target.value);
					console.log(updatedPublication[index].pubYear);

					break;
				case 4:
					updatedPublication[index].journal = e.target.value;
					break;
				case 5:
					updatedPublication[index].conference = e.target.value;
					break;
				case 6:
					updatedPublication[index].volume = e.target.value;
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
				pubYear: null,
				journal: '',
				conference: '',
				volume: '',
				editable: true,
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
	const onEnterKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			// Enter 키가 눌렸을 때 줄 바꿈 추가
			e.preventDefault(); // Enter 키의 기본 동작을 취소
			setBiographyEdit(biographyEdit + '\n'); // 줄 바꿈을 추가한 내용으로 업데이트
		}
	};
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
		async (
			//edit: boolean,
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
			let check = 0;
			if (
				linkEdit !== '' &&
				!linkEdit.includes('https://') &&
				!linkEdit.includes('http://')
			) {
				check = 1;
			} else if (
				twitterEdit !== '' &&
				!twitterEdit.includes('https://') &&
				!twitterEdit.includes('http://')
			) {
				check = 2;
			} else {
				for (let i = 0; i < publicationEdit.length; i++) {
					if (
						publicationEdit[i].link !== '' &&
						!publicationEdit[i].link.includes('https://') &&
						!publicationEdit[i].link.includes('http://')
					) {
						check = 3;
						break;
					}
				}
			}
			if (check == 0) {
				const filteredPublicationEdit = publicationEdit.filter(
					(item, index) => {
						return (
							item.link !== '' ||
							item.title !== '' ||
							item.author !== '' ||
							item.pubYear !== null ||
							item.journal !== '' ||
							item.conference !== '' ||
							item.volume !== ''
						);
					},
				);
				if (filteredPublicationEdit.length == 0) {
					filteredPublicationEdit.push({
						link: '',
						title: '',
						author: '',
						pubYear: null,
						journal: '',
						conference: '',
						volume: '',
						editable: true,
					});
				}

				const createTempResearcher = () => ({
					affiliation: departmentEdit,
					id,

					locationNumber: locationEdit,
					name: nameEdit,
					projectType: projectEdit,

					linkedIn: linkEdit,
					twitter: twitterEdit,
					biography: biographyEdit,
					publications: filteredPublicationEdit,
				});

				console.log(id);

				if (id == 0) {
					await postResearchers(createTempResearcher(), selectedProfile);
					alert('연구원 추가 완료');
				} else {
					await putResearchers(id, createTempResearcher(), selectedProfile);
					alert('연구원 편집 완료');
				}
				setEdit(true);
				navigate('/researcher', {
					state: {
						Edit: edit,
					},
				});
				// if (id == 0) {
				// } else {
				// 	alert('연구원 편집 완료');
				// }
			} else if (check == 1) {
				alert('링크드인 주소가 올바르지 않습니다.');
			} else if (check == 2) {
				alert('트위터 주소가 올바르지 않습니다.');
			} else if (check == 3) {
				alert('논문 주소가 올바르지 않습니다.');
			}
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
			edit,
		],
	);
	useEffect(() => {
		return () => {};
	}, []);
	return (
		<ResearcherInfo
			//edit={edit}
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
			locationEdit={locationEdit}
			onLocationClicked={onLocationClicked}
			onAddClicked={onAddClicked}
			onApplyClicked={onApplyClicked}
			onChangePubEdit={onChangePubEdit}
			pubEdit={pubEdit}
			onClickPubEdit={onClickPubEdit}
			onSubClicked={onSubClicked}
			onEnterKeyPress={onEnterKeyPress}
		/>
	);
};

export default ResearcherInfoContainer;
