import React, { useCallback, useEffect, useState } from 'react';
import Insight from '../Insight';
import { Insights, ResearcherList } from '@typedef/types';
import { EChange } from '@typedef/types';
import { useNavigate } from 'react-router-dom';
type Props = {
	insightList: Insights[];
	setInsightList: any;
};

const InsightContainer = ({ insightList, setInsightList }: Props) => {
	const navigate = useNavigate();
	const [displayedColor, setDisplayedColor] = useState(1);
	const [storedColor, setStoredColor] = useState(0.3);
	const [stored, setStored] = useState(false);
	const [edit, setEdit] = useState(0);
	const [search, setSearch] = useState('');
	const [filteredList, setFilteredList] = useState<Insights[]>(insightList);

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
	const onEditClicked = useCallback(
		(
			edit: boolean,
			id: number,
			type: string,
			pdfList: string[],
			title: string,
		) => {
			navigate('/insightinfo', {
				state: {
					Edit: edit,
					Id: id,
					Type: type,
					PdfList: pdfList,
					Title: title,
				},
			});
			window.scrollTo(0, 0);
		},
		[edit],
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
			onEditClicked={onEditClicked}
		/>
	);
};

export default InsightContainer;
