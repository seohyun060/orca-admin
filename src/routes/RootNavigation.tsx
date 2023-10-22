import HomeContainer from '../pages/Home/containers/HomeContainer';
import DashboardContainer from 'src/pages/Dashboard/containers/DashboardContainer';
import ResearcherContainer from 'src/pages/Researcher/containers/ResearcherContainer';
import Project from 'src/pages/Projects/Projects';
import ProjectDetail from 'src/pages/Projects/ProjectDetail';
import NewsletterContainer from 'src/pages/Newsletter/containers/NewsletterContainer';
import Events from 'src/pages/Events/Events';
import GnbContainer from 'src/pages/Gnb/containers/GnbContainer';
import ResearcherInfoContainer from 'src/pages/ResearcherInfo/containers/ResearcherInfoContainer';
import React, { useEffect, useState } from 'react';
import InsightContainer from 'src/pages/Insight/containers/InsightContainer';
import OrcagroupContainer from 'src/pages/Orcagroup/containers/OrcagroupContainer';
import InsightInfoContainer from 'src/pages/InsightInfo/containers/InsightInfoContainer';
import images from 'src/assets/images';
import { getResearchers } from 'src/api/ResearcherAPI';
import {
	BrowserRouter as Router,
	useLocation,
	Route,
	Routes,
} from 'react-router-dom';
import { ResearcherList, Researchers } from '@typedef/types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/rootnavigation.style.css';
import { Insights } from '@typedef/types';
import HelmetHoc from './helmet/HelmetHoc';

// /* eslint no-restricted-globals: ["off"] */
const RootNavigation = () => {
	const [key, setkey] = useState('');
	//const [researcherList, setResearcherList] = useState<ResearcherList>([]);
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
	// useEffect(() => {
	// 	getResearchers().then((data) => {
	// 		//console.log(data.data); // 나옴
	// 		const updatedList: ResearcherList = [];
	// 		data.data.map((d: any) => {
	// 			const tempData: Researchers = {
	// 				id: d.id,
	// 				name: d.name,
	// 				profile: d.image ? d.image : images.orcagroup,
	// 				location: d.locationNumber,
	// 				department: d.affiliation,
	// 				project: d.projectType,
	// 				stored: false,
	// 				link: 'https://ca70-221-166-133-218.ngrok-free.app',
	// 				twitter: `twitter`,
	// 				biography: 'Biography of researcher',
	// 				publications: [
	// 					{
	// 						link: 'www.bodybuilding.com',
	// 						title: 'Olympia',
	// 						author: 'Chris, Bumstead',
	// 						year: '2023',
	// 						journal: 'Classic',
	// 						conference: 'Physique',
	// 						ho: 'Grand Prix',
	// 						editable: false,
	// 					},
	// 				],
	// 			};
	// 			updatedList.push(tempData);
	// 		});
	// 		setResearcherList(updatedList);
	// 		//console.log(researcherList); // 안나옴
	// 	});
	// 	//console.log(researcherList); // 안나옴
	// }, [location]);
	// useEffect(() => {
	// 	console.log(researcherList);
	// 	const updatedList = [];
	// 	for (let j = 0; j < 20; j++) {
	// 		const researcher: Researchers = {
	// 			id: j + 1,
	// 			name: `${j}Name`,
	// 			department: 'Radiology Department',
	// 			project: 'CadAI-B projects',
	// 			stored: j >= 16, // Set stored based on the condition
	// 			location: j >= 16 ? 10 : 15, // Set location based on the condition
	// 			profile: `${j}profile.png`,
	// 			link: 'https://ca70-221-166-133-218.ngrok-free.app',
	// 			twitter: `${j}twitter`,
	// 			biography: 'Biography of researcher',
	// 			publications: [
	// 				{
	// 					link: 'www.bodybuilding.com',
	// 					title: 'Olympia',
	// 					author: 'Chris, Bumstead',
	// 					year: '2023',
	// 					journal: 'Classic',
	// 					conference: 'Physique',
	// 					ho: 'Grand Prix',
	// 					editable: false,
	// 				},
	// 			],
	// 		};
	// 		updatedList.push(researcher);
	// 	}
	// 	setResearcherList(updatedList);
	// 	console.log(researcherList);
	// 	return () => {};
	// }, []);

	return (
		<>
			<GnbContainer location={location.pathname} />
			<Routes location={location}>
				<Route path='/dashboard' element={<DashboardContainer />} />
				<Route
					path='/'
					element={
						//<HelmetHoc title='Portfolio | 움직이는네모'>
						<HomeContainer />
					}
				/>

				<Route path='/researcher' element={<ResearcherContainer />} />

				<Route
					path='/researcherinfo/:id'
					element={
						<ResearcherInfoContainer
						// researcherList={researcherList}
						// setResearcherList={setResearcherList}
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
				<Route path='/project' element={<Project />} />
				<Route path='/project/default' element={<ProjectDetail />} />
				<Route path='/event' element={<Events />} />
				<Route
					path='/insightinfo'
					element={
						<InsightInfoContainer
							insightList={insightList}
							setInsightList={setInsightList}
						/>
					}
				/>
				<Route path='/newsletter' element={<NewsletterContainer />} />
				<Route path='/orcagroup' element={<OrcagroupContainer />} />
			</Routes>
		</>
	);
};

export default RootNavigation;
