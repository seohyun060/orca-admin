import HomeContainer from '../pages/Home/containers/HomeContainer';
import ResearcherContainer from 'src/pages/Researcher/containers/ResearcherContainer';
import React, { useEffect, useState } from 'react';
import InsightContainer from 'src/pages/Insight/containers/InsightContainer';
import {
	BrowserRouter as Router,
	useLocation,
	Route,
	Routes,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/rootnavigation.style.css';
import { Insights } from '@typedef/types';
import HelmetHoc from './helmet/HelmetHoc';

// /* eslint no-restricted-globals: ["off"] */
const RootNavigation = () => {
	const [key, setkey] = useState('');
	const [insightList, setInsightList] = useState<Insights[]>([]);

	useEffect(() => {
		setkey(new Date().getSeconds().toString());
		const updatedInsights = [];
		for (let i = 0; i < 18; i++) {
			const insight = {
				id: i + 1,
				type: i < 9 ? 'White paper' : 'News',
				title: `${i}1234sd6879ds4fd`,
				date: '23.09.23',
				pdf: 'https://drive.google.com/file/d/1bmyXFEIM9nUawFC5DGz0s62DtMDpQwXy/view?usp=drive_link',
				text: 'this is my insight',
				stored: i < 12 ? false : true,
			};
			updatedInsights.push(insight);
		}
		setInsightList(updatedInsights);
	}, [key]);
	const location = useLocation();
	return (
		<Routes location={location}>
			<Route
				path='/'
				element={
					//<HelmetHoc title='Portfolio | 움직이는네모'>
					<HomeContainer />
				}
			/>
			<Route path='/researcher' element={<ResearcherContainer />} />
			<Route
				path='/insight'
				element={
					<InsightContainer
						insightList={insightList}
						setInsightList={setInsightList}
					/>
				}
			/>
		</Routes>
	);
};

export default RootNavigation;
