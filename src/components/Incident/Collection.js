import React, { Component } from 'react';

import IncidentView from './View';
import randomizeArray from '../../lib/randomize-array.js';

class IncidentCollection extends Component {

  colors = [
    'aqua',
    'pale-pink',
    'salmon',
    'slate',
    'yellow',
  ];

  // The available pool of colors that have not been used yet.
  availableColors = this.colors.slice();

  constructor(props) {
    super(props);

    this.state = {
      incidents: []
    };

    this.loadIncidents();
  }

  async loadIncidents() {
    let request = await fetch('/.netlify/functions/get-incidents');
    let json = await request.json();
    let incidents = json.map( incident => {
      return {
          description: incident.name,
          lastIncidentDate: incident.lastOccurrence
      };
    } );

    this.setState({
      incidents: randomizeArray(incidents)
    });
  }

  renderIncidents() {
    return this.state.incidents.map((incident, index) => {
      return (
        <IncidentView
          key={index}
          color={this.getRandomAvailableColor()}
          date={incident.lastIncidentDate}
          description={incident.description}
        />
      );
    });
  }

  getRandomAvailableColor() {
    if (!this.availableColors.length) {
      this.availableColors = this.colors.slice();
    }

    // TODO: Make sure the new color doesn't match the last color, which can
    //       happen after a reseed.
    let target = Math.floor(Math.random() * this.availableColors.length);
    let color = this.availableColors.splice(target, 1)[0];

    return color;
  }

  render() {
    return (
      <section className="incidents">
        {this.renderIncidents()}
      </section>
    );
  }

}

export default IncidentCollection;
