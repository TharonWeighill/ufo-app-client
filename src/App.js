import { Component } from "react";

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
    console.log(this.state);
    return (
      <div>
        {this.state.sightings.map((sighting) => {
          return (
            <div key={sighting.id}>
              <p>{sighting.city}, {sighting.state}, {sighting.country}</p>
            </div>
          );
        })}
      </div>
    );
  };
};

export default App;
