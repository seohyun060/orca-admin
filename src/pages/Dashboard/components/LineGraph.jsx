import React, { useEffect, useState, useCallback } from 'react';
import { getGraph } from 'src/api/DashboardAPI';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

const LineGraph = () => {
	const [graphList, setGraphList] = useState([]);
	const [maxRange, setMaxRange] = useState(0);
	const [range, setRange] = useState('month');
	const [chartWidth, setChartWidth] = useState(calculateChartWidth);

	function calculateChartWidth() {
		if (window.innerWidth > 1400) {
			return 1050;
		} else {
			return 650;
		}
	}
	const handleResize = useCallback(() => {
		setChartWidth(calculateChartWidth());
	}, []);
	const onRangeClick = useCallback(() => {
		if (range === 'month') {
			setRange('week');
		} else {
			setRange('month');
		}
	}, [range]);

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
			const modifyMonth = data.data.map((item) => {
				const date = item[0];
				const month = parseInt(date.slice(4, 6)); // 월 숫자 추출
				const day = date.slice(6); // 일 추출
				const modifiedDate = monthNames[month - 1] + day; // 월 이름과 일을 합침
				return [modifiedDate, ...item.slice(1)]; // 수정된 날짜와 나머지 부분을 합침
			});
			const convertData = modifyMonth.map((item) => ({
				date: item[0],

				web: item[1] == 'web' ? parseInt(item[2]) : 0,
				mobile: item[1] == 'mobile' ? parseInt(item[2]) : 0,
			}));

			setGraphList(convertData);
		});

		return () => {};
	}, [range]);
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	console.log(graphList);
	return (
		<div className='chart-container'>
			<div className='range' onClick={onRangeClick}>
				<div
					className='range-month'
					style={{
						color: range == 'month' ? '#fff' : '#9e9e9e',
						backgroundColor: range == 'month' ? '#000' : '#f0f0f0',
					}}
				>
					달
				</div>
				<div
					className='range-week'
					style={{
						color: range == 'week' ? '#fff' : '#9e9e9e',
						backgroundColor: range == 'week' ? '#000' : '#f0f0f0',
					}}
				>
					주
				</div>
			</div>
			<LineChart
				width={chartWidth}
				height={400}
				data={graphList}
				className='linechart'
			>
				<XAxis
					dataKey='date'
					width={chartWidth}
					tick={{ dy: 15, fontSize: 10, dx: -10 }}
					interval={0}
				/>
				<YAxis
					domain={[
						0,
						Math.max(
							...graphList.map((item) => Math.max(item.web, item.mobile)),
						) +
							(10 -
								(Math.max(
									...graphList.map((item) => Math.max(item.web, item.mobile)),
								) %
									10)),
					]}
					tick={{ dx: -10 }}
				/>
				<CartesianGrid strokeDasharray='3 3' />
				<Tooltip />
				<Legend align='right' verticalAlign='top' />
				<Line
					type='monotone'
					dataKey='web'
					stroke='rgba(0, 0, 0, 0.30)'
					activeDot={{ r: 8 }}
				/>
				<Line
					type='monotone'
					dataKey='mobile'
					stroke='rgba(13, 86, 153, 0.50)'
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</div>
	);
};

export default LineGraph;
