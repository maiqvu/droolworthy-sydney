import React from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import './Explore.css';

class LeftNav extends React.Component {
  state = {
    restos: []
  };

  async componentDidMount() {
    await this.props.firebase.getRestos((restos) => {
      const response = restos[0];

      let restosState = [];

      for (let i = 0; i < response.length; i++) {
        restosState.push(...response[i].restaurants);
      }

      this.setState({ restos: restosState });
      // console.log( this.state.restos );
    });
  }   // end of componentDidMount()

  render() {
    return (
      <div className="left-nav">
        {
          this.state.restos.map(r => (
            <li key={ r.restaurant.id }>
              <strong>{ r.restaurant.name }</strong>
            </li>
          ))
        }
      </div>
    );
  }   // end of render()
}

const LeftNavPage = compose(withFirebase)(LeftNav);

export default LeftNavPage;