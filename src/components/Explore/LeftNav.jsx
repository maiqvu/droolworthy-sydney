import React from 'react';
import './Explore.css';

class LeftNav extends React.Component {

  componentDidUpdate( prevProps ) {
    if (prevProps.currentNeighborhood !== this.props.currentNeighborhood) {
      console.log('i am here', this.props.currentNeighborhood);
    }
  };   // end of componentDidUpdate()

  render() {
    return (
    <div className="left-nav">
    {
      this.props.neighborhoodsList.map(n => 
        (<li key={ Math.random() }>
          <a 
          onClick={() => this.props.handleClick(n)}
          className={ n === this.props.currentNeighborhood ? 'red' : '' }>
            { n }
          </a>
        </li>)
      )
    }
    </div>
    );
  }   // end of render()
}

export default LeftNav;