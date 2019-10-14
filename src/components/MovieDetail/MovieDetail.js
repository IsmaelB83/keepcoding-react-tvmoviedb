// Node imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Own imports
import MovieCard from '../MovieCard/MovieCard';
import { getMovie } from '../../services/MovieDbAPI';
// CSS imports
import './MovieDetail.css';
// Assets imports
import logo from '../../assets/images/spinner.gif';


export default class MovieDetail extends Component {

    constructor(props) {
      super(props);
      this.state = { 
        loading: true,
      }
    }

    componentDidMount() {
      getMovie(this.props.match.params.id)
        .then(movie => {
          this.setState({
            loading: false,
            movie 
          });
        }
      )
    }

    render() {
      return (
          <div>
              <div className='card-container'>
              { this.state.loading && 
                <div className='card-container'>
                  <div>
                    <img src={logo} alt='loading...' />
                    <h2>Loading data...</h2>
                  </div>
                </div>
              }
              { !this.state.loading && 
                !this.state.movie && 
                <h1>La película no existe</h1>
              }
              { !this.state.loading && 
                this.state.movie &&
                <div>
                <MovieCard  key={this.state.movie.id} 
                            id={this.state.movie.id} 
                            name={this.state.movie.title} 
                            overview={`${this.state.movie.overview.substring(1,40)}...`}
                            image={`https://image.tmdb.org/t/p/w500${this.state.movie.poster_path}`} 
                            release={this.state.movie.release_date}
                            popularity={this.state.movie.popularity} 
                            vote_average={this.state.movie.vote_average} 
                            vote_count={this.state.movie.vote_count} 
                />
                <Link className='back-link' to='/index'>Volver</Link>
                </div>
              }
            </div>
          </div>
      );
    }
  }