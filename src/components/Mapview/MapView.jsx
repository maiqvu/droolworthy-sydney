import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';


export class MapView extends React.Component {
  state = {
    showingInfoWindow: false,
    selectedMarker: {},   // show the active marker upon click
    selectedPlace: {},   // show InfoWindow for the selected place
    restaurants: []
  };

  mapStyles = { width: '100vw', height: '100vh' };
  sydney = { lat: -33.8688, lng: 151.2093 };
  defaultMarker = {
    url: 'https://cdn0.iconfinder.com/data/icons/travel-vacation/290/travel-transport-hotel-vacation-holidays-tourist-tourism-travelling-traveling_149-512.png',
    scaledSize: new this.props.google.maps.Size(20, 20)
  };
  colorMarker = {
      url: 'https://www.hentiesbaytourism.com/wp-content/uploads/2016/06/restaurant_marker.png',
      scaledSize: new this.props.google.maps.Size(50, 50)
  };

  async componentDidMount() {
    await this.props.firebase.getRestos((restos) => {
      const response = restos[0];
      let restosState = [];

      for (let i = 0; i < response.length; i++) {
        restosState.push(...response[i].restaurants);
      }

      restosState = restosState.filter(r => {
        return r.restaurant.location.locality === this.props.match.params.suburb
      });

      this.setState({ restaurants: restosState });
    })
  }   // end of componentDidMount()

  // To initially display all markers on map
  displayMarkers = () => {
    return this.state.restaurants.map( (r, index) => {
      return <Marker key={index} name={ r.restaurant.name }
        position={{ lat: r.restaurant.location.latitude, lng: r.restaurant.location.longitude }}
        address={ r.restaurant.location.address }
        url={ r.restaurant.url }
        onClick={ this.handleMarkerClick }
        icon={ this.colorMarker } />
    });
  };

  // To change state of the clicked marker and display the popup InfoWindow component
  handleMarkerClick = (props, marker) => {
    this.setState({
      showingInfoWindow: true,
      selectedMarker: marker,
      selectedPlace: props
    });
  };

  // To close the InfoWindow
  handleClose = () => {
    if ( this.state.showingInfoWindow ) {
      this.setState({
        showingInfoWindow: false,
        selectedMarker: null
      });
    }
  };

  getCoords = () => {
    console.log(this.props.match.params.suburb);
  };

  render() {
    return (
      <Map google={ this.props.google } zoom={14} initialCenter={ this.sydney } style={ this.mapStyles }>

        { this.displayMarkers() }

        <InfoWindow visible={ this.state.showingInfoWindow }
                  onClose={ this.handleClose }
                  marker={ this.state.selectedMarker } >
          <div>
            <h3><a href={ this.state.selectedPlace.url } target="_blank" style={{ color: 'orangered' }}>
              { this.state.selectedPlace.name }
            </a></h3>
            <p>{ this.state.selectedPlace.address }</p>
          </div>
        </InfoWindow>

      </Map>
    );
  }   // end of render()
}   // end of class MapView


const MapViewPage = compose(withFirebase)(MapView);

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY })( MapViewPage );