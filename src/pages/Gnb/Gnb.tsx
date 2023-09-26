import React from 'react';
import './styles/gnb.styles.css';
import { GNBTableTypes } from '@typedef/types';
type Props = {
	tabTable: GNBTableTypes[];
	onTabClicked: (path: string) => void;
};

const Gnb = ({ tabTable, onTabClicked }: Props) => {
	return (
		<div className='gnb'>
			<div className='gnb-tabs'>
				{tabTable.map((tab, idx) => {
					return (
						<div
							key={idx}
							className='gnb-tabs-item'
							onClick={() => {
								onTabClicked(tab.path);
							}}
						>
							<img src={tab.icon} />
							<div className='label'>{tab.label}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Gnb;
