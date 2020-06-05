import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 49.28,
      lng: -123.12
    },
    zoom: 12
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '75%', margin: 'auto' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'API Key' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={49.264012}
            lng={-123.095931}
            text="Dude Chilling Park"
          />

          <AnyReactComponent
            lat={49.2557}
            lng={-123.1351}
            text="Shaughnessy Park"
          />

          <AnyReactComponent
            lat={49.2800}
            lng={-123.1387}
            text="Sunset Beach Park"
          />

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
