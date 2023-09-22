import HomeContainer from '../pages/Home/containers/HomeContainer';
import ResearcherContainer from 'src/pages/Researcher/containers/ResearcherContainer';
import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	useLocation,
	Route,
	Routes,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/rootnavigation.style.css';
import HelmetHoc from './helmet/HelmetHoc';
// /* eslint no-restricted-globals: ["off"] */

const RootNavigation = () => {
	const [key, setkey] = useState('');
	useEffect(() => {
		setkey(new Date().getSeconds().toString());
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
		</Routes>
	);
};

export default RootNavigation;
