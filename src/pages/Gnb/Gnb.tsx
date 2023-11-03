import React from 'react';
import './styles/gnb.styles.css';
import { GNBTableTypes } from '@typedef/types';
import { removeCookie } from 'src/cookies/cookie';
import { useNavigate } from 'react-router-dom';
type Props = {
	tabTable: GNBTableTypes[];
	onTabClicked: (path: string) => void;
	location: string;
};

const Gnb = ({ tabTable, onTabClicked, location }: Props) => {
	const navigate = useNavigate();
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
							style={{
								backgroundColor:
									location === tab.path ||
									(tab.path !== '/' && location.includes(tab.path))
										? '#3c3c3c'
										: '#000000',
							}}
						>
							<img src={tab.icon} />
							<div className='label'>{tab.label}</div>
						</div>
					);
				})}
				<button
					onClick={() => {
						removeCookie('login');
						navigate('/');
					}}
				>
					로그아웃
				</button>
			</div>
		</div>
	);
};

export default Gnb;
