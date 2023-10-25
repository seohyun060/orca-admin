import React, { useEffect, useState, useCallback } from 'react';
import { getTable } from 'src/api/DashboardAPI';
const Table = () => {
	const [today, setToday] = useState([0, 0]);
	const [yesterday, setYesterday] = useState([0, 0]);
	const [lastWeek, setLastWeek] = useState([0, 0]);
	const [day7, setDay7] = useState([0, 0]);
	const [day30, setDay30] = useState([0, 0]);
	const [day60, setDay60] = useState([0, 0]);
	const [day90, setDay90] = useState([0, 0]);
	const [year1, setYear1] = useState([0, 0]);
	const [thisYear, setThisYear] = useState([0, 0]);
	const [webData, setWebData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
	const [mobileData, setMobileData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
	useEffect(() => {
		getTable('today').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						const updatedData = [...today];
						updatedData[0] = data.data[i][2];
						setToday(updatedData);
					} else {
						const updatedData = [...today];
						updatedData[1] = data.data[i][2];
						setToday(updatedData);
					}
				}
			}
		});
		getTable('yesterday').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						const updatedData = [...yesterday];
						updatedData[0] = data.data[i][2];
						setYesterday(updatedData);
					} else {
						const updatedData = [...yesterday];
						updatedData[1] = data.data[i][2];
						setYesterday(updatedData);
					}
				}
			}
		});
		getTable('7days').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						const updatedData = [...day7];
						updatedData[0] = data.data[i][2];
						setDay7(updatedData);
					} else {
						const updatedData = [...day7];
						updatedData[1] = data.data[i][2];
						setDay7(updatedData);
					}
				}
			}
		});
		getTable('30days').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						const updatedData = [...day30];
						updatedData[0] = data.data[i][2];
						setDay30(updatedData);
					} else {
						const updatedData = [...day30];
						updatedData[1] = data.data[i][2];
						setDay30(updatedData);
					}
				}
			}
		});
		getTable('60days').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						const updatedData = [...day60];
						updatedData[0] = data.data[i][2];
						setDay60(updatedData);
					} else {
						const updatedData = [...day60];
						updatedData[1] = data.data[i][2];
						setDay60(updatedData);
					}
				}
			}
		});
		getTable('90days').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						const updatedData = [...day90];
						updatedData[0] = data.data[i][2];
						setDay90(updatedData);
					} else {
						const updatedData = [...day90];
						updatedData[1] = data.data[i][2];
						setDay90(updatedData);
					}
				}
			}
		});
		getTable('1year').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						const updatedData = [...year1];
						updatedData[0] = data.data[i][2];
						setYear1(updatedData);
					} else {
						const updatedData = [...year1];
						updatedData[1] = data.data[i][2];
						setYear1(updatedData);
					}
				}
			}
		});
		getTable('thisYear').then((data) => {
			if (data.data.length != 0) {
				for (let i = 0; i < data.data.length; i++) {
					if (data.data[i][1] == 'web') {
						const updatedData = [...thisYear];
						updatedData[0] = data.data[i][2];
						setThisYear(updatedData);
					} else {
						const updatedData = [...thisYear];
						updatedData[1] = data.data[i][2];
						setThisYear(updatedData);
					}
				}
			}
		});

		return () => {};
	}, []);
	console.log(today, yesterday, year1, day30, day7);

	return (
		<div className='table'>
			<div className='table-head'>
				<div className='attr-w'>Web</div>
				<div className='attr-m'>Mobile</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Today</div>
				<div className='value-w'>{today[0]}</div>
				<div className='value-m'>{today[1]}</div>
			</div>
			<div className='table-gray'>
				<div className='attr'>Yesterday</div>
				<div className='value-w'>{yesterday[0]}</div>
				<div className='value-m'>{yesterday[1]}</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Last 7 days</div>
				<div className='value-w'>{day7[0]}</div>
				<div className='value-m'>{day7[1]}</div>
			</div>
			<div className='table-gray'>
				<div className='attr'>Last 30 days</div>
				<div className='value-w'>{day30[0]}</div>
				<div className='value-m'>{day30[1]}</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Last 60 days</div>
				<div className='value-w'>{day60[0]}</div>
				<div className='value-m'>{day60[1]}</div>
			</div>
			<div className='table-gray'>
				<div className='attr'>Last 90 days</div>
				<div className='value-w'>{day90[0]}</div>
				<div className='value-m'>{day90[1]}</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Last 12 months</div>
				<div className='value-w'>{year1[0]}</div>
				<div className='value-m'>{year1[1]}</div>
			</div>
			<div className='table-gray'>
				<div className='attr'>{`This year (Jan-Today)`}</div>
				<div className='value-w'>{thisYear[0]}</div>
				<div className='value-m'>{thisYear[1]}</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Total</div>
				<div className='value-w'>{year1[0]}</div>
				<div className='value-m'>{year1[1]}</div>
			</div>
		</div>
	);
};

export default Table;
