// Node imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFireAlt, faPoll, faVoteYea } from '@fortawesome/free-solid-svg-icons'
// CSS imports
import './MovieCard.css';

/**
 * Componente movie
 */
export default class MovieCard extends Component {

  render() {
    return (
      <Link to={`/movie/${this.props.id}`}>
        <div className="MovieCard">
          <div className="MovieCard-image">
            <img src={this.props.image} alt="character"></img>
            <div className="MovieCard-title">
              <h1>{this.props.name}</h1>
              <p>{this.props.overview}</p>
            </div>
          </div>
          <div className="MovieCard-body">
            <p>
              <span>Release Date:</span>
              <span>{this.props.release} <FontAwesomeIcon className="fontIcon" icon={faCalendar} />
              </span>
            </p>
            <p>
              <span>Popularity</span>
              <span>{this.props.popularity} <FontAwesomeIcon className="fontIcon" icon={faFireAlt} />
              </span>
            </p>
            <p>
              <span>Vote Avg</span>
              <span>{this.props.vote_average} <FontAwesomeIcon className="fontIcon" icon={faVoteYea} />
              </span>
            </p>
            <p>
              <span>Vote Count</span>
              <span>{this.props.vote_count} <FontAwesomeIcon className="faPoll" icon={faPoll} />      
              </span>
            </p>
          </div>
        </div>
      </Link>
    );
  }
}