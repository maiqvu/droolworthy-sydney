import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
  map: {
    position: 'absolute',
    height: '100vh',
    width: '100%'
  }
};

const sydney = {
  lat: -33.8688,
  lng: 151.2093
};

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }

  loadMap() {
    if ( this.props && this.props.google ) {
      // Check if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // Reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );

      // maps.Map() is the constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }   // end of loadMap()

  // recenterMap() only gets called when the currentLocation in the component’s state is updated and uses the .panTo() method on the google.maps.Map instance to change the map's center.
  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if ( map ) {
      let center = new maps.LatLng( current.lat, current.lng );
      map.panTo( center );
    }
  }   // end of recenterMap()

  componentDidMount() {
    if ( this.props.centerAroundCurrentLocation ) {
      if ( navigator && navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition( pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }   // end of componentDidMount()

  componentDidUpdate(prevProps, prevState) {
    if ( prevProps.google !== this.props.google ) {
      this.loadMap();
    }
    if ( prevState.currentLocation !== this.state.currentLocation ) {
      this.recenterMap();
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }   // end of renderChildren()

  render() {
    const style = Object.assign( {}, mapStyles.map );
    
    return (
      <div>
        <div style={ style } ref="map">Loading map...</div>
        { this.renderChildren() }
      </div>
    );
  }   // end of render()
}

export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 12,
  initialCenter: sydney,
  centerAroundCurrentLocation: false,
  visible: true
};