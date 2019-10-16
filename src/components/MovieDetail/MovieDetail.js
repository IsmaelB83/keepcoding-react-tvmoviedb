// Node imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Own imports
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MovieCard from '../MovieCard/MovieCard';
import MovieDbAPI from '../../services/MovieDbAPI';
import UserConsumer from '../../context/UserContext';
// CSS imports
import './MovieDetail.css';
// Assets imports
import logo from '../../assets/images/spinner.gif';

/**
 * Componente movie detail
 */
export default class MovieDetail extends Component {

  static contextType = UserConsumer;

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      api: new MovieDbAPI(this.props.API_KEY)
    }
  }

  componentDidMount() {
    // Chequeo sesion del contexto, si no existe redirijo a register
    const session = this.context.session
    if (!session) {
      return this.props.history.push('/register');
    } 
    // Get movie
    this.state.api.getMovie(this.props.match.params.id)
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
      <React.Fragment>
        <Header/>
        <section className="section">
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
                          overview={`${this.state.movie.overview.substring(0,250)}...`}
                          image={`https://image.tmdb.org/t/p/w500${this.state.movie.poster_path}`} 
                          release={this.state.movie.release_date}
                          popularity={this.state.movie.popularity} 
                          vote_average={this.state.movie.vote_average} 
                          vote_count={this.state.movie.vote_count} 
              />
              <Link className='back-link' to='/'>Volver</Link>
              </div>
            }
          </div>
        </section>
        <Footer/>
      </React.Fragment>
    );
  }
}