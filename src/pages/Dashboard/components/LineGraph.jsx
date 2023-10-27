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

const LineGraph = (props) => {
	const { graphList, onRangeClick, range } = props;
	const [maxRange, setMaxRange] = useState(0);
	//const [range, setRange] = useState('month');
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

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

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
							...graphList.map((item) => Math.max(item.desktop, item.mobile)),
						) +
							(10 -
								(Math.max(
									...graphList.map((item) =>
										Math.max(item.desktop, item.mobile),
									),
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
					dataKey='desktop'
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
