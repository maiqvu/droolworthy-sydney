import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import MapView from './components/Mapview/MapView';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/mapview" component={ MapView } />
    </Switch>
  </Router>
);

export default Routes;