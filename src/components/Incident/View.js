import React, { Component } from 'react';
import daysAgo from '../../lib/date-formatter.js';

import './View.css';

class IncidentView extends Component {

  generateSlug(label) {
    return label.replace(/\W/g, '-');
  }

  render() {
    return (
      <article
        className={`incident ${this.props.color} ${this.props.description.length > 50 ? 'long' : ''}`}
        id={this.generateSlug(this.props.description)}
      >
        <a className="details" href={`#${this.generateSlug(this.props.description)}`}>
          <span className="label">
            {this.props.description}:
          </span>

          <time className="timestamp" dateTime={this.props.date}>
            {daysAgo(this.props.date)}
          </time>
        </a>
      </article>
    );
  }

}

export default IncidentView;
