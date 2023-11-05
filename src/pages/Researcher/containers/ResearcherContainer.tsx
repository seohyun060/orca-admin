import React, { useCallback, useEffect, useState } from 'react';
import Researcher from '../Researcher';
import {
	ResearcherList,
	EChange,
	Publication,
	Researchers,
} from '@typedef/types';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	getResearchers,
	deleteResearcher,
	storeResearcher,
} from 'src/api/ResearcherAPI';
import images from 'src/assets/images';
import { getCookie } from 'src/cookies/cookie';
type Props = {};
const ResearcherContainer = ({}: Props) => {
	const navigate = useNavigate();
	const [researcherList, setResearcherList] = useState<ResearcherList>([]);
	const [search, setSearch] = useState('');
	const [stored, setStored] = useState(false);
	const [filteredList, setFilteredList] =
		useState<ResearcherList>(researcherList);
	const [displayedColor, setDisplayedColor] = useState(1);
	const [edit, setEdit] = useState(false);
	const [storedColor, setStoredColor] = useState(0.3);

	const onDisplayedClick = useCallback(() => {
		if (stored) {
			setStored(false);
			setDisplayedColor(1);
			setStoredColor(0.3);
		}
	}, [stored, displayedColor, storedColor]);
	const onStoredClick = useCallback(() => {
		if (!stored) {
			setStored(true);
			setDisplayedColor(0.3);
			setStoredColor(1);
		}
	}, [stored, displayedColor, storedColor]);
	const onStoredisplayClick = useCallback(
		(researcherList: ResearcherList, id: number) => {
			const updatedList = [...researcherList]; // Create a copy of the list
			for (let i = 0; i < updatedList.length; i++) {
				if (updatedList[i].id == id) {
					updatedList[i].stored = !updatedList[i].stored;
					storeResearcher(id, updatedList[i].stored).then((data) => {});
					break;
				}
			}
			setResearcherList(updatedList); // Up
		},
		[researcherList],
	);
	const onTrashClick = useCallback(
		(id: number) => {
			const confirmed = window.confirm('삭제하시겠습니까?');
			if (confirmed) {
				setResearcherList((prevList: ResearcherList) => {
					const updatedList = prevList.filter(
						(researcher) => researcher.id !== id,
					);
					return updatedList;
				});
				deleteResearcher(id).then((data) => {});
				alert('삭제되었습니다.');
			}
		},
		[researcherList],
	);
	const onSetSearch = useCallback(
		(e: EChange) => {
			setSearch(e.target.value);
		},
		[search],
	);
	const onSetEdit = useCallback(
		(id: number) => {
			navigate(`/researcherinfo/${id}`);
			window.scrollTo(0, 0);
		},
		[edit],
	);

	useEffect(() => {
		getResearchers().then((data) => {
			const updatedList: ResearcherList = [];
			data.data.map((d: any) => {
				const tempData: Researchers = {
					id: d.id,
					name: d.name,
					profile: d.image ? d.image : images.orcagroup,
					location: d.locationNumber,
					department: d.affiliation,
					project: d.projectType,
					stored: d.isStored,
					link: '',
					twitter: ``,
					biography: '',
					publications: [],
				};
				updatedList.push(tempData);
			});
			setResearcherList(updatedList);
		});

		return () => {};
	}, []);
	useEffect(() => {
		setFilteredList(
			researcherList.filter(
				(researcher) => researcher.name.indexOf(search) !== -1,
			),
		);
		return () => {};
	}, [researcherList, search]);

	useEffect(() => {
		let check = getCookie('login');
		console.log(typeof check, 'sfsdfsffasgagf');
		if (typeof check == 'undefined') {
			//alert('로그인이 필요한 화면입니다');
			navigate('/');
		}
	}, []);
	return (
		<Researcher
			stored={stored}
			search={search}
			onSetSearch={onSetSearch}
			filteredList={filteredList}
			displayedColor={displayedColor}
			storedColor={storedColor}
			onDisplayedClick={onDisplayedClick}
			onStoredClick={onStoredClick}
			onStoredisplayClick={onStoredisplayClick}
			onTrashClick={onTrashClick}
			onSetEdit={onSetEdit}
			researcherList={researcherList}
		/>
	);
};

export default ResearcherContainer;
