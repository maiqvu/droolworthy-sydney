import React from 'react';
import './Explore.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class LeftNav extends React.Component {
  render() {
    return (
    <div className="left-nav">
    {
      this.props.neighborhoodsList.map(n => 
        (
        <ListItem key={Math.random()}>
          <a onClick={() => this.props.handleClick(n)} className={ n === this.props.currentNeighborhood ? 'red' : '' }>
            <ListItemText primary={ n } disableTypography />
          </a>
        </ListItem>
        )
      )
    }
    </div>
    );
  }   // end of render()
}

export default LeftNav;