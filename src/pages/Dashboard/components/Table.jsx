import React, { useEffect, useState, useCallback } from 'react';
import { getTable } from 'src/api/DashboardAPI';
const Table = (props) => {
	const { webData, mobileData } = props;

	return (
		<div className='table'>
			<div className='table-head'>
				<div className='attr-w'>Web</div>
				<div className='attr-m'>Mobile</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Today</div>
				<div className='value-w'>{webData[0]}</div>
				<div className='value-m'>{mobileData[0]}</div>
			</div>
			<div className='table-gray'>
				<div className='attr'>Yesterday</div>
				<div className='value-w'>{webData[1]}</div>
				<div className='value-m'>{mobileData[1]}</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Last 7 days</div>
				<div className='value-w'>{webData[2]}</div>
				<div className='value-m'>{mobileData[2]}</div>
			</div>
			<div className='table-gray'>
				<div className='attr'>Last 30 days</div>
				<div className='value-w'>{webData[3]}</div>
				<div className='value-m'>{mobileData[3]}</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Last 60 days</div>
				<div className='value-w'>{webData[4]}</div>
				<div className='value-m'>{mobileData[4]}</div>
			</div>
			<div className='table-gray'>
				<div className='attr'>Last 90 days</div>
				<div className='value-w'>{webData[5]}</div>
				<div className='value-m'>{mobileData[5]}</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Last 12 months</div>
				<div className='value-w'>{webData[6]}</div>
				<div className='value-m'>{mobileData[6]}</div>
			</div>
			<div className='table-gray'>
				<div className='attr'>{`This year (Jan-Today)`}</div>
				<div className='value-w'>{webData[7]}</div>
				<div className='value-m'>{mobileData[7]}</div>
			</div>
			<div className='table-white'>
				<div className='attr'>Total</div>
				<div className='value-w'>{webData[6]}</div>
				<div className='value-m'>{mobileData[6]}</div>
			</div>
		</div>
	);
};

export default Table;
