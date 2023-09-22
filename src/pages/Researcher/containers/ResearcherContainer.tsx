import React, { useCallback, useEffect, useState } from 'react';
import Researcher from '../Researcher';
import { ResearcherList, EChange } from '@typedef/types';
type Props = {};
const researcherList: ResearcherList = [];
for (let j = 0; j < 24; j++) {
	if (j < 16) {
		researcherList.push({
			name: `${j}Name`,
			department: 'Radiology Department',
			project: 'CadAI-B projects',
			stored: false,
		});
	} else {
		researcherList.push({
			name: `${j}Name`,
			department: 'Radiology Department',
			project: 'CadAI-B projects',
			stored: true,
		});
	}
}
const ResearcherContainer = (props: Props) => {
	const [search, setSearch] = useState('');
	const [stored, setStored] = useState(false);
	const [filteredList, setFilteredList] = useState<ResearcherList>([]);
	const [displayedColor, setDisplayedColor] = useState(1);
	const [storedColor, setStoredColor] = useState(0.3);

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
		(filteredList: ResearcherList, index: number) => {
			const updatedList = [...filteredList]; // Create a copy of the list
			updatedList[index].stored = !updatedList[index].stored; // Toggle stored value
			setFilteredList(updatedList); // Up
		},
		[filteredList],
	);
	const onTrashClick = useCallback(
		(filteredList: ResearcherList, index: number) => {
			const updatedList = [...filteredList]; // Create a copy of the list
			updatedList.splice(index, 1);
			setFilteredList(updatedList); // Up
		},
		[filteredList],
	);
	const onSetSearch = useCallback(
		(e: EChange) => {
			setSearch(e.target.value);
		},
		[search],
	);
	useEffect(() => {
		setFilteredList(
			researcherList.filter(
				(researcher) => researcher.name.indexOf(search) !== -1,
			),
		);
		return () => {};
	}, [search]);

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
		/>
	);
};

export default ResearcherContainer;
