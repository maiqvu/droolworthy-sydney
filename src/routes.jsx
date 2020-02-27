import React, { useState } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import MapView from './components/Mapview/MapView';

const Routes = () => {

  const [suburb, setSuburb] = useState('');

  return (
    <Router>
      <nav className="nav-bar">      
        <Link to="/" className="dark-link">Home</Link>
        <Link to="/explore" className="dark-link">Explore</Link>
        <Link to={`/mapview${suburb}`} className="dark-link">Map View</Link>
      </nav>

      <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/explore" render={() => <Explore handleSuburbChange={setSuburb}/>} />
          <Route exact path="/mapview" component={ MapView } />
          <Route exact path="/mapview/:suburb" component={ MapView } />
      </Switch>
    </Router>
  )

};

export default Routes;