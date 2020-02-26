import React from 'react';

import LeftNav from './LeftNav';
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

  render() {
    const currentBgImage = 'https://www.lucasfilm.com/app/uploads/sydney-marquee-1.jpg';

    return (
      <div className="explore-container" style={{ backgroundImage: `url(${currentBgImage})` }}>
        {/* <div className="bg-image" ></div> */}

        <div className="dark-overlay"></div>

        <LeftNav />
        <RightNav />
      </div>
    );
  }   // end of render()
}

export default Explore;