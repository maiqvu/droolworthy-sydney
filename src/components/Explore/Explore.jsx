import React from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

// import LeftNav from './LeftNav';
import RightNav from './RightNav';

import './Explore.css';


class Explore extends React.Component {
  state = {
    neighborhoods: [
      'Surry Hills',
      'Newtown',
      'Darlinghurst',
      'Manly',
      'Balmain'
    ],
    restaurants: [],
    searchActive: false,
    searchTerm: ''
  };

  async componentDidMount() {
    await this.props.firebase.getRestos((restos) => {
      const response = restos[0];

      let restosState = [];

      for (let i = 0; i < response.length; i++) {
        restosState.push(...response[i].restaurants);
      }

      this.setState({ restaurants: restosState });
      // console.log('end of componentDidMount inside Explore:', this.state.restaurants );
    });
  }   // end of componentDidMount()

  render() {
    const currentBgImage = 'https://www.lucasfilm.com/app/uploads/sydney-marquee-1.jpg';

    return (
      <div className="explore-container" style={{ backgroundImage: `url(${currentBgImage})` }}>

        <div className="dark-overlay"></div>

        {/* <LeftNav /> */}
        <RightNav restosList={ this.state.restaurants } />
      </div>
    );
  }   // end of render()
}


const ExplorePage = compose(withFirebase)(Explore);

export default ExplorePage;