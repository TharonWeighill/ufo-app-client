import { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import './App.css';

class App extends Component {
  // the react component lifecyle
  constructor(props) { // this is first
    super(props);
    this.state = {
      sightings: [],
    };
  }
  componentDidMount() { // this is third
    fetch('http://localhost:3031/sightings')
      .then((response) => response.json())
      .then((sightings) => this.setState({
        ...this.state,
        sightings,
      }))
      .catch((error) => console.error(error));
  };
  render() { // this second (but third to getDerivedStateFromProps, which we aren't using)
    return (
      <div className="map-container">
      <MapContainer className="map" center={[0, -0]} zoom={3} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.sightings.map((sighting) => (
          <Marker position={[sighting.latitude, sighting.longitude]} key={sighting.id}>
            <Popup>
              <h2>Information</h2>
              <div>Location: {sighting.city}, {sighting.state} {sighting.country}</div>
              <div>Shape: {sighting.shape}</div>
              <a href="/">Read More</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      </div>
    );
  };
};

export default App;
