import React, { Component } from 'react';
import Incident from './Incident';

class Incidents extends Component {

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
    let request = await fetch('/db.json');
    let json = await request.json();
    let incidents = json.incidents.map( incident => {
        // Sort the dates newest-first.
        incident.occurrences.sort( (a, b) => a < b );
        return {
            description: incident.description,
            lastIncidentDate: incident.occurrences[0]
        };
    } );

    this.setState({
      incidents
    });
  }

  renderIncidents() {
    return this.state.incidents.map((incident, index) => {
      return (
        <Incident
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

export default Incidents;
