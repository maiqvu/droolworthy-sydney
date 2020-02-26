import React from 'react';
import axios from 'axios';
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
      scaledSize: new this.props.google.maps.Size(60, 60)
  };

  componentDidMount() {
    axios.get( 'https://droolworthy-sydney.firebaseio.com/restos.json?orderBy=%22$key%22&limitToFirst=2&print=pretty' )
      .then( res => {
        console.log(res.data[0].restaurants);
        this.setState({ restaurants: res.data[0].restaurants });
      })
      .catch( err => console.warn(err) );
  }

  // To initially display all markers on map
  displayMarkers = () => {
    return this.state.restaurants.map( (resto, index) => {
      return <Marker key={index} name={ resto.restaurant.name }
        position={{ lat: resto.restaurant.location.latitude, lng: resto.restaurant.location.longitude }}
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
    return (
      <Map google={ this.props.google } zoom={12} initialCenter={ this.sydney } style={ this.mapStyles }>

        { this.displayMarkers() }

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