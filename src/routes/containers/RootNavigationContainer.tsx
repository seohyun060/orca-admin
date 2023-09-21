import RootNavigation from '@routes/RootNavigation';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
const RootNavigationContainer = () => {
  return (
    <Router>
      <RootNavigation />
    </Router>
  );
};

export default RootNavigationContainer;
