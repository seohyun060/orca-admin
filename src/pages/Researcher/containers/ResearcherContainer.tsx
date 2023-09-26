import React, { useCallback, useEffect, useState } from 'react';
import Researcher from '../Researcher';
import { ResearcherList, EChange } from '@typedef/types';
import { useNavigate } from 'react-router-dom';
type Props = {
	researcherList: ResearcherList;
	setResearcherList: any;
};
const ResearcherContainer = ({ researcherList, setResearcherList }: Props) => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [stored, setStored] = useState(false);
	const [filteredList, setFilteredList] =
		useState<ResearcherList>(researcherList);
	const [displayedColor, setDisplayedColor] = useState(1);
	const [storedColor, setStoredColor] = useState(0.3);
	const [edit, setEdit] = useState(0);
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
			publications: string[],
		) => {
			//setEdit(index);

			navigate('/researcherinfo', {
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
		setFilteredList(
			researcherList.filter(
				(researcher) => researcher.name.indexOf(search) !== -1,
			),
		);
		return () => {};
	}, [search, researcherList]);

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
