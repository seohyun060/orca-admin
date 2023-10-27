import React, { useCallback, useEffect, useState } from 'react';
import Dashboard from '../Dashboard';
import * as XLSX from 'xlsx';
import { StatisticsList } from '@typedef/types';
import { getGraph, getStatistic, getTable } from 'src/api/DashboardAPI';

type Props = {};

const DashboardContainer = (props: Props) => {
	const [statisticsList, setStatisticsList] = useState<StatisticsList>();
	const [dayList, setDayList] = useState([]);
	const [graphList, setGraphList] = useState<any[]>([]);
	const [range, setRange] = useState('month');
	const [webData, setWebData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
	const [mobileData, setMobileData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
	const tempWeb = [0, 0, 0, 0, 0, 0, 0, 0];
	const tempMob = [0, 0, 0, 0, 0, 0, 0, 0];

	const downloadStatisticsAsExcel = () => {
		// CSV 데이터 생성
		const graphLabel: string[] = [''];
		const graphWebValue: string[] = [''];
		const graphMobileValue: string[] = [''];
		for (let i = 0; i < graphList.length; i++) {
			graphLabel.push(graphList[i].date);
			graphWebValue.push(graphList[i].web);
			graphMobileValue.push(graphList[i].mobile);
		}
		console.log(graphList);
		const csvData = [
			graphLabel,
			graphWebValue,
			graphMobileValue,
			['', '', ''],
			['', 'Web', 'Mobile'],
			['Today', webData[0], mobileData[0]],
			['Yesterday', webData[1], mobileData[1]],
			['Last 7 days', webData[2], mobileData[2]],
			['Last 30 days', webData[3], mobileData[3]],
			['Last 60 days', webData[4], mobileData[4]],
			['Last 90 days', webData[5], mobileData[5]],
			['Last 12 months', webData[6], mobileData[6]],
			['This year', webData[7], mobileData[7]],
			['', '', ''],
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
	const onRangeClick = useCallback(() => {
		if (range === 'month') {
			setRange('week');
		} else {
			setRange('month');
		}
	}, [range]);
	const onGraphReload = useCallback(() => {
		getGraph(range).then((data) => {
			const monthNames = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];

			// 각 요소를 수정하여 날짜 부분을 변경
			const modifyMonth = data.data.map((item: any) => {
				const date = item[0];
				const month = parseInt(date.slice(4, 6)); // 월 숫자 추출
				const day = date.slice(6); // 일 추출
				const modifiedDate = monthNames[month - 1] + day; // 월 이름과 일을 합침
				return [modifiedDate, ...item.slice(1)]; // 수정된 날짜와 나머지 부분을 합침
			});
			const convertData = modifyMonth.map((item: any) => ({
				date: item[0],

				web: item[1] == 'web' ? parseInt(item[2]) : 0,
				mobile: item[1] == 'mobile' ? parseInt(item[2]) : 0,
			}));

			setGraphList(convertData);
		});
	}, [range, graphList]);
	const onTableReload = useCallback(() => {
		getStatistic().then((data) => {
			console.log(data.data);
			const updatedList: StatisticsList = {
				researcherNumber: data.data[0][1],
				newsletterNumber: data.data[1][1],
				orcagroupNumber: data.data[2][1],
				projectStatus: {
					active: data.data[3][1],
					completed: data.data[4][1],
					terminated: data.data[5][1],
				},
				eventStatus: {
					lastEvent: data.data[6][1],
					upcomingEvent: data.data[7][1],
				},
			};
			setStatisticsList(updatedList);
		});
	}, [statisticsList]);
	async function setData() {
		setWebData(tempWeb);
		setMobileData(tempMob);
	}
	async function setAfterGet() {
		getTable('today').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						tempWeb[0] = data.data[i][2];
					} else {
						tempMob[0] = data.data[i][2];
					}
				}
			}
		});
		getTable('yesterday').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						tempWeb[1] = data.data[i][2];
					} else {
						tempMob[1] = data.data[i][2];
					}
				}
			}
		});
		getTable('7days').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						tempWeb[2] = data.data[i][2];
					} else {
						tempMob[2] = data.data[i][2];
					}
				}
			}
		});
		getTable('30days').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						tempWeb[3] = data.data[i][2];
					} else {
						tempMob[3] = data.data[i][2];
					}
				}
			}
		});
		getTable('60days').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						tempWeb[4] = data.data[i][2];
					} else {
						tempMob[4] = data.data[i][2];
					}
				}
			}
		});
		getTable('90days').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						tempWeb[5] = data.data[i][2];
					} else {
						tempMob[5] = data.data[i][2];
					}
				}
			}
		});
		getTable('1year').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						tempWeb[6] = data.data[i][2];
					} else {
						tempMob[6] = data.data[i][2];
					}
				}
			}
		});
		getTable('thisYear').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						tempWeb[7] = data.data[i][2];
					} else {
						tempMob[7] = data.data[i][2];
					}
				}
			}
		});
		await setData();
	}
	useEffect(() => {
		setAfterGet();
		return () => {};
	}, []);
	useEffect(() => {
		getGraph(range).then((data) => {
			const monthNames = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];

			// 각 요소를 수정하여 날짜 부분을 변경
			const modifyMonth = data.data.map((item: any) => {
				const date = item[0];
				const month = parseInt(date.slice(4, 6)); // 월 숫자 추출
				const day = date.slice(6); // 일 추출
				const modifiedDate = monthNames[month - 1] + day; // 월 이름과 일을 합침
				return [modifiedDate, ...item.slice(1)]; // 수정된 날짜와 나머지 부분을 합침
			});
			const convertData = modifyMonth.map((item: any) => ({
				date: item[0],

				web: item[1] == 'web' ? parseInt(item[2]) : 0,
				mobile: item[1] == 'mobile' ? parseInt(item[2]) : 0,
			}));

			setGraphList(convertData);
		});

		return () => {};
	}, [range]);
	useEffect(() => {
		getStatistic().then((data) => {
			console.log(data.data);
			const updatedList: StatisticsList = {
				researcherNumber: data.data[0][1],
				newsletterNumber: data.data[1][1],
				orcagroupNumber: data.data[2][1],
				projectStatus: {
					active: data.data[3][1],
					completed: data.data[4][1],
					terminated: data.data[5][1],
				},
				eventStatus: {
					lastEvent: data.data[6][1],
					upcomingEvent: data.data[7][1],
				},
			};
			setStatisticsList(updatedList);
		});

		return () => {};
	}, []);

	return (
		<Dashboard
			statisticsList={statisticsList}
			downloadStatisticsAsExcel={downloadStatisticsAsExcel}
			graphList={graphList}
			onRangeClick={onRangeClick}
			onGraphReload={onGraphReload}
			onTableReload={onTableReload}
			range={range}
			webData={webData}
			mobileData={mobileData}
		/>
	);
};

export default DashboardContainer;
