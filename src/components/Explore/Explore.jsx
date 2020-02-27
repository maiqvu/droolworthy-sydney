import React from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import LeftNav from './LeftNav';
import RightNav from './RightNav';

import './Explore.css';


class Explore extends React.Component {
  state = {
    restaurants: [],
    neighborhoods: [],
    currentNeighborhood: 'Surry Hills'
  };

  async componentDidMount() {
    await this.props.firebase.getRestos((restos) => {
      const response = restos[0];

      let restosState = [];
      for (let i = 0; i < response.length; i++) {
        restosState.push(...response[i].restaurants);
      }
      this.setState({ restaurants: restosState });

      let neighborhoodsState = restosState.map(r => {
        return (r.restaurant.location.locality);
      });
      neighborhoodsState = [...new Set(neighborhoodsState)];
      this.setState({ neighborhoods: neighborhoodsState });
    });
  }   // end of componentDidMount()

  handleSuburbClick = (suburb) => {
    this.setState({ currentNeighborhood: suburb });
    this.props.handleSuburbChange('/' + suburb);
  }

  render() {
    const currentBgImage = 'https://www.lucasfilm.com/app/uploads/sydney-marquee-1.jpg';

    return (
      <div className="explore-container" style={{ backgroundImage: `url(${currentBgImage})` }}>
        <div className="dark-overlay"></div>

        <LeftNav neighborhoodsList={ this.state.neighborhoods }
        currentNeighborhood={ this.state.currentNeighborhood } 
        handleClick={ this.handleSuburbClick } />

        <RightNav restosList={ this.state.restaurants }
        currentNeighborhood={ this.state.currentNeighborhood } />
      </div>
    );
  }   // end of render()
}

const ExplorePage = compose(withFirebase)(Explore);

export default ExplorePage;