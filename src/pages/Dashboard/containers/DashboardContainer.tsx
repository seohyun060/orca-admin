import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard';
import * as XLSX from 'xlsx';
import { StatisticsList } from '@typedef/types';

type Props = {};

const DashboardContainer = (props: Props) => {
	const [statisticsList, setStatisticsList] = useState<StatisticsList>();
	const downloadStatisticsAsExcel = () => {
		// CSV 데이터 생성
		const csvData = [
			['Label', 'Value'],
			['Researcher Number', statisticsList?.researcherNumber],
			['Newsletter Number', statisticsList?.newsletterNumber],
			['Orca Group Number', statisticsList?.orcagroupNumber],
			['Project Status - Active', statisticsList?.projectStatus.active],
			['Project Status - Completed', statisticsList?.projectStatus.completed],
			['Project Status - Terminated', statisticsList?.projectStatus.terminated],
			['Event Status - Last Event', statisticsList?.eventStatus.lastEvent],
			[
				'Event Status - Upcoming Event',
				statisticsList?.eventStatus.upcomingEvent,
			],
		];

		// CSV 파일 생성
		const ws = XLSX.utils.aoa_to_sheet(csvData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Statistics');
		XLSX.writeFile(wb, 'statistics.xlsx');
	};
	useEffect(() => {
		const updatedList: StatisticsList = {
			researcherNumber: 14,
			newsletterNumber: 14,
			orcagroupNumber: 14,
			projectStatus: {
				active: 3,
				completed: 2,
				terminated: 0,
			},
			eventStatus: {
				lastEvent: 3,
				upcomingEvent: 2,
			},
		};
		setStatisticsList(updatedList);
		return () => {};
	}, []);

	return (
		<Dashboard
			statisticsList={statisticsList}
			downloadStatisticsAsExcel={downloadStatisticsAsExcel}
		/>
	);
};

export default DashboardContainer;
