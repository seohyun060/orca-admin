import HomeContainer from '../pages/Home/containers/HomeContainer';
import ResearcherContainer from 'src/pages/Researcher/containers/ResearcherContainer';
import GnbContainer from 'src/pages/Gnb/containers/GnbContainer';
import ResearcherInfoContainer from 'src/pages/ResearcherInfo/containers/ResearcherInfoContainer';
import React, { useEffect, useState } from 'react';
import InsightContainer from 'src/pages/Insight/containers/InsightContainer';
import InsightInfoContainer from 'src/pages/InsightInfo/containers/InsightInfoContainer';
import {
	BrowserRouter as Router,
	useLocation,
	Route,
	Routes,
} from 'react-router-dom';
import { ResearcherList } from '@typedef/types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/rootnavigation.style.css';
import { Insights } from '@typedef/types';
import HelmetHoc from './helmet/HelmetHoc';

// /* eslint no-restricted-globals: ["off"] */
const RootNavigation = () => {
	const [key, setkey] = useState('');
	const [researcherList, setResearcherList] = useState<ResearcherList>([]);
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
				pdfList: [],
				text: 'this is my insight',
				stored: i < 12 ? false : true,
			};
			updatedInsights.push(insight);
		}
		setInsightList(updatedInsights);
	}, [key]);
	const location = useLocation();
	useEffect(() => {
		console.log(researcherList);
		const updatedList = [];
		for (let j = 0; j < 20; j++) {
			const researcher = {
				id: j + 1,
				name: `${j}Name`,
				department: 'Radiology Department',
				project: 'CadAI-B projects',
				stored: j >= 16, // Set stored based on the condition
				location: j >= 16 ? 10 : 15, // Set location based on the condition
				profile: `${j}profile.png`,
				link: 'https://ca70-221-166-133-218.ngrok-free.app',
				twitter: `${j}twitter`,
				biography: 'Biography of researcher',
				publications: ['Publication1', 'Publication2', 'Publication3'],
			};
			updatedList.push(researcher);
		}
		setResearcherList(updatedList);
		console.log(researcherList);
		return () => {};
	}, []);

	return (
		<>
			<GnbContainer location={location.pathname} />
			<Routes location={location}>
				<Route
					path='/'
					element={
						//<HelmetHoc title='Portfolio | 움직이는네모'>
						<HomeContainer />
					}
				/>
				<Route
					path='/researcher'
					element={
						<ResearcherContainer
							researcherList={researcherList}
							setResearcherList={setResearcherList}
						/>
					}
				/>

				<Route
					path='/researcherinfo'
					element={
						<ResearcherInfoContainer
							researcherList={researcherList}
							setResearcherList={setResearcherList}
						/>
					}
				/>
				<Route
					path='/insight'
					element={
						<InsightContainer
							insightList={insightList}
							setInsightList={setInsightList}
						/>
					}
				/>
				<Route
					path='/insightinfo'
					element={
						<InsightInfoContainer
							insightList={insightList}
							setInsightList={setInsightList}
						/>
					}
				/>
			</Routes>
		</>
	);
};

export default RootNavigation;
