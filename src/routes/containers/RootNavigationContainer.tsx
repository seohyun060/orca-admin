import RootNavigation from '@routes/RootNavigation';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteChangeTracker from 'src/pages/Dashboard/components/RouteChangeTracker';
const RootNavigationContainer = () => {
	return (
		<Router>
			<RouteChangeTracker />
			<RootNavigation />
		</Router>
	);
};

export default RootNavigationContainer;
