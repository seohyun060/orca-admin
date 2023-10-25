import React, { useCallback, useEffect, useState } from 'react';
import Insight from '../Insight';
import { Insights, ResearcherList, InsightApi } from '@typedef/types';
import { EChange } from '@typedef/types';
import { useNavigate } from 'react-router-dom';
import { getInsights, deleteInsight, storeInsight } from 'src/api/InsightAPI';
type Props = {};

const InsightContainer = ({}: Props) => {
	const navigate = useNavigate();
	const [displayedColor, setDisplayedColor] = useState(1);
	const [storedColor, setStoredColor] = useState(0.3);
	const [insightList, setInsightList] = useState<InsightApi[]>([]);
	const [stored, setStored] = useState(false);
	const [edit, setEdit] = useState(0);
	const [search, setSearch] = useState('');
	const [filteredList, setFilteredList] = useState<InsightApi[]>(insightList);

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
		(insightList: InsightApi[], id: number) => {
			const updatedList = [...insightList]; // Create a copy of the list
			for (let i = 0; i < updatedList.length; i++) {
				if (updatedList[i].id == id) {
					updatedList[i].isStored = !updatedList[i].isStored;
					storeInsight(id, updatedList[i].isStored).then((data) => {});
					break;
				}
			}
			setInsightList(updatedList); // Up
		},
		[insightList],
	);
	const onTrashClick = useCallback(
		(id: number) => {
			setInsightList((prevList: InsightApi[]) => {
				const updatedList = prevList.filter((insight) => insight.id !== id);
				return updatedList;
			});
			deleteInsight(id).then((data) => {
				//console.log(data.data); // 나옴

				console.log(data);
				//console.log(researcherList); // 안나옴
			});
		},
		[insightList],
	);
	const onEditClicked = useCallback(
		(id: number) => {
			navigate(`/insightinfo/${id}`);
			window.scrollTo(0, 0);
		},
		[edit],
	);
	function formatDate(date: Date) {
		const year = date.getFullYear().toString().substr(-2); // 년도의 마지막 두 자리
		const month = date.getMonth() + 1; // 월을 문자열로 변환
		const day = date.getDate(); // 일

		return `${day}.${month}.${year}`;
	}
	useEffect(() => {
		setTimeout(() => {
			getInsights().then((data) => {
				console.log(data.data); // 나옴
				const updatedList: InsightApi[] = [];
				data.data.map((d: any) => {
					const tempData: InsightApi = {
						id: d.id,
						createDate: new Date(d.createDate),
						category: d.category,
						title: d.title,
						isStored: d.isStored,
					};
					updatedList.push(tempData);
				});
				setInsightList(updatedList);
				console.log(insightList); // 안나옴
			});
		}, 200);

		return () => {};
	}, []);
	useEffect(() => {
		setFilteredList(
			insightList.filter((insight) => insight.title.indexOf(search) !== -1),
		);
		// setTimeout(() => {
		// 	setFilteredList(
		// 		insightList.filter((insight) => insight.title.indexOf(search) !== -1),
		// 	);
		// }, 300);

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
			formatDate={formatDate}
		/>
	);
};

export default InsightContainer;
