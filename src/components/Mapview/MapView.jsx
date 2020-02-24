import React from 'react';
// import { FirebaseContext } from '../Firebase/index';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
// import CurrentLocation from './MapConfig'; // TODO: recenter map to user's location


export class MapView extends React.Component {
  // TODO: refactor to use hooks
  // const [center, setCenter] = useState( sydney );
  // const [zoom, setZoom] = useState( 12 );

  state = {
    showingInfoWindow: false,
    selectedMarker: {},   // show the active marker upon click
    selectedPlace: {},   // show InfoWindow for the selected place
    restaurants: [
      { lat: -33.8704, lng: 151.2087, name: '1' },
      { lat: -33.8749, lng: 151.2009, name: '2' },
      { lat: -33.8611, lng: 151.2126, name: '3' },
      { lat: -33.8599, lng: 151.2090, name: '4' },
      { lat: -33.8435, lng: 151.2413, name: '5' }
    ]
  };

  mapStyles = { width: '100vw', height: '100vh' };
  sydney = { lat: -33.8688, lng: 151.2093 };
  defaultMarker = {
    url: 'https://cdn0.iconfinder.com/data/icons/travel-vacation/290/travel-transport-hotel-vacation-holidays-tourist-tourism-travelling-traveling_149-512.png',
    scaledSize: new this.props.google.maps.Size(40, 40)
  };
  colorMarker = {
      url: 'https://www.hentiesbaytourism.com/wp-content/uploads/2016/06/restaurant_marker.png',
      scaledSize: new this.props.google.maps.Size(60, 60)
  };

  // To initially display all markers on map
  displayMarkers = () => {
    return this.state.restaurants.map( (restaurant, index) => {
      return <Marker key={index} name={ restaurant.name }
        position={{ lat: restaurant.lat, lng: restaurant.lng }}
        onClick={ this.handleMarkerClick }
        icon={ this.colorMarker } />
    });
  };

  // To change state of the clicked marker and display the popup InfoWindow component
  handleMarkerClick = (props, marker, e) => {
    console.log(marker);
    this.setState({
      showingInfoWindow: true,
      selectedMarker: marker,
      selectedPlace: props
    });
  };

  // To close the InfoWindow
  handleClose = props => {
    if ( this.state.showingInfoWindow ) {
      this.setState({
        showingInfoWindow: false,
        selectedMarker: null
      });
    }
  };

  render() {
    // const displayMarkers = this.state.restaurants.map( (restaurant, index) => {
    //   return <Marker key={index} name={ restaurant.name }
    //     position={{ lat: restaurant.lat, lng: restaurant.lng }}
    //     onClick={ this.handleMarkerClick }
    //     icon={ (!this.state.selectedMarker) ? defaultMarker : selectedMarker } />
    // });

    return (
      <Map google={ this.props.google } zoom={14} initialCenter={ this.sydney } style={ this.mapStyles }>

        { this.displayMarkers() }
        {/* { displayMarkers } */}

        <InfoWindow visible={ this.state.showingInfoWindow }
                  onClose={ this.handleClose }
                  marker={ this.state.selectedMarker } >
          <div><h4>{ this.state.selectedPlace.name }</h4></div>
        </InfoWindow>

      </Map>
    );
  }   // end of render()
}


export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY })( MapView );