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
import LoginContainer from 'src/pages/Login/containers/LoginContainer';
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

const RootNavigation = () => {
	const location = useLocation();

	return (
		<>
			<GnbContainer location={location.pathname} />
			<Routes location={location}>
				<Route path='/' element={<LoginContainer />} />
				<Route path='/dashboard' element={<DashboardContainer />} />
				<Route path='/home' element={<HomeContainer />} />

				<Route path='/researcher' element={<ResearcherContainer />} />

				<Route
					path='/researcherinfo/:id'
					element={<ResearcherInfoContainer />}
				/>
				<Route path='/insight' element={<InsightContainer />} />
				<Route path='/project' element={<Project />} />
				<Route path='/project/:id' element={<ProjectDetail />} />
				<Route path='/event' element={<Events />} />
				<Route path='/insightinfo/:id' element={<InsightInfoContainer />} />
				<Route path='/newsletter' element={<NewsletterContainer />} />
				<Route path='/orcagroup' element={<OrcagroupContainer />} />
				<Route path='*' element={<DashboardContainer />} />
			</Routes>
		</>
	);
};

export default RootNavigation;
