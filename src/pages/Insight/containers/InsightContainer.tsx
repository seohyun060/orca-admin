import React, { useCallback, useEffect, useState } from 'react';
import Insight from '../Insight';
import { Insights, ResearcherList } from '@typedef/types';
import { EChange } from '@typedef/types';
type Props = {
	insightList: Insights[];
	setInsightList: any;
};

const InsightContainer = ({ insightList, setInsightList }: Props) => {
	const [displayedColor, setDisplayedColor] = useState(1);
	const [storedColor, setStoredColor] = useState(0.3);
	const [stored, setStored] = useState(false);
	const [search, setSearch] = useState('');
	const [filteredList, setFilteredList] = useState<Insights[]>(insightList);

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
	const onSetSearch = useCallback(
		(e: EChange) => {
			setSearch(e.target.value);
		},
		[search],
	);
	const onStoredisplayClick = useCallback(
		(insightList: Insights[], id: number) => {
			const updatedList = [...insightList]; // Create a copy of the list
			for (let i = 0; i < updatedList.length; i++) {
				if (updatedList[i].id == id) {
					updatedList[i].stored = !updatedList[i].stored;
					break;
				}
			}
			setInsightList(updatedList); // Up
		},
		[insightList],
	);
	const onTrashClick = useCallback(
		(id: number) => {
			setInsightList((prevList: Insights[]) => {
				const updatedList = prevList.filter((insight) => insight.id !== id);
				return updatedList;
			});
		},
		[insightList],
	);
	useEffect(() => {
		setFilteredList(
			insightList.filter((insight) => insight.title.indexOf(search) !== -1),
		);
		return () => {};
	}, [search, insightList]);
	return (
		<Insight
			insightList={insightList}
			setInsightList={setInsightList}
			displayedColor={displayedColor}
			onDisplayedClick={onDisplayedClick}
			storedColor={storedColor}
			onStoredClick={onStoredClick}
			search={search}
			onSetSearch={onSetSearch}
			stored={stored}
			filteredList={filteredList}
			onStoredisplayClick={onStoredisplayClick}
			onTrashClick={onTrashClick}
		/>
	);
};

export default InsightContainer;
