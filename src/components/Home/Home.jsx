import React from 'react';
import { FirebaseContext } from '../Firebase/index';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <FirebaseContext.Consumer>
  {
    firebase => {
      return (
        <div className="home-container">
          <div className="inner">
            <h1>Drool<br/>worthy<br/> Sydney</h1>
            <p>Food diversity is an important part of an ethnically diverse metropolis such as Sydney. This website contains a list of my personal gems as I eat my way through this city's exciting, multicultural foodie scene. Have fun exploring!</p>
            <Link className="discover-link" to="/mapview">
              See on Map
              <span></span>
            </Link>
          </div>
        </div>
      );
    }
  }
  </FirebaseContext.Consumer>
);

export default Home;