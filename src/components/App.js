import React, { Component } from 'react';

import './App.css';
import IncidentCollection from './Incident/Collection';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="masthead">
          {/*
            It would be cool to have this fade between light/dark colors based
            on the background it was displaying over.
          */}
          <h1><a href="/">Days Since Mike...</a></h1>
        </header>

        <IncidentCollection />
      </div>
    );
  }
}

export default App;
