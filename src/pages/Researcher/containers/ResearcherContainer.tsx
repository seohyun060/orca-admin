import React, { useCallback, useEffect, useState } from 'react';
import Researcher from '../Researcher';
import {
	ResearcherList,
	EChange,
	Publication,
	Researchers,
} from '@typedef/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { getResearchers, deleteResearcher } from 'src/api/ResearcherAPI';
import images from 'src/assets/images';
type Props = {};
const ResearcherContainer = ({}: Props) => {
	const navigate = useNavigate();
	const [researcherList, setResearcherList] = useState<ResearcherList>([]);
	const location = useLocation();
	const [search, setSearch] = useState('');
	const [stored, setStored] = useState(false);
	const [filteredList, setFilteredList] =
		useState<ResearcherList>(researcherList);
	const [displayedColor, setDisplayedColor] = useState(1);
	const [edit, setEdit] = useState(false);
	const [storedColor, setStoredColor] = useState(0.3);

	if (location.state) {
		console.log(location.state);
	}
	const onDisplayedClick = useCallback(() => {
		if (stored) {
			setStored(false);
			setDisplayedColor(1);
			setStoredColor(0.3);
		}
		console.log(stored, displayedColor, storedColor);
	}, [stored, displayedColor, storedColor]);
	const onStoredClick = useCallback(() => {
		if (!stored) {
			setStored(true);
			setDisplayedColor(0.3);
			setStoredColor(1);
		}
		console.log(stored, displayedColor, storedColor);
	}, [stored, displayedColor, storedColor]);
	const onStoredisplayClick = useCallback(
		(researcherList: ResearcherList, id: number) => {
			const updatedList = [...researcherList]; // Create a copy of the list
			for (let i = 0; i < updatedList.length; i++) {
				if (updatedList[i].id == id) {
					updatedList[i].stored = !updatedList[i].stored;
					break;
				}
			}
			setResearcherList(updatedList); // Up
		},
		[researcherList],
	);
	const onTrashClick = useCallback(
		(id: number) => {
			setResearcherList((prevList: ResearcherList) => {
				const updatedList = prevList.filter(
					(researcher) => researcher.id !== id,
				);
				return updatedList;
			});
			deleteResearcher(id).then((data) => {
				//console.log(data.data); // 나옴

				console.log(data);
				//console.log(researcherList); // 안나옴
			});
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
		(
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
		) => {
			//setEdit(index);

			navigate(`/researcherinfo/${id}`, {
				state: {
					Edit: edit,
					Id: id,
					Name: name,
					Department: department,
					Project: project,
					Location: location,
					Profile: profile,
					Link: link,
					Twitter: twitter,
					Biography: biography,
					Publications: publications,
				},
			});
			window.scrollTo(0, 0);
		},
		[edit],
	);

	useEffect(() => {
		setTimeout(() => {
			getResearchers().then((data) => {
				//console.log(data.data); // 나옴
				const updatedList: ResearcherList = [];
				data.data.map((d: any) => {
					const tempData: Researchers = {
						id: d.id,
						name: d.name,
						profile: d.image ? d.image : images.orcagroup,
						location: d.locationNumber,
						department: d.affiliation,
						project: d.projectType,
						stored: false,
						link: 'https://ca70-221-166-133-218.ngrok-free.app',
						twitter: `twitter`,
						biography: 'Biography of researcher',
						publications: [
							{
								link: 'www.bodybuilding.com',
								title: 'Olympia',
								author: 'Chris, Bumstead',
								pubYear: 2023,
								journal: 'Classic',
								conference: 'Physique',
								volume: 'Grand Prix',
								editable: false,
							},
						],
					};
					updatedList.push(tempData);
				});
				setResearcherList(updatedList);
				//console.log(researcherList); // 안나옴
			});
		}, 200);

		return () => {};
	}, []);
	useEffect(() => {
		setFilteredList(
			researcherList.filter(
				(researcher) => researcher.name.indexOf(search) !== -1,
			),
		);
		// setTimeout(() => {
		// 	setFilteredList(
		// 		researcherList.filter(
		// 			(researcher) => researcher.name.indexOf(search) !== -1,
		// 		),
		// 	);
		// }, 300);

		return () => {};
	}, [researcherList, search]);

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
