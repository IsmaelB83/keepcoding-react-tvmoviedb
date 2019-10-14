// Node imports
import React, { Component } from 'react';
// Own imports
import Form from '../Form/Form';
import MovieCard from '../MovieCard/MovieCard';
import { discoverMovies, searchMovies } from '../../services/MovieDbAPI';
// CSS imports
import './App.css';
// Assets imports
import logo from '../../assets/images/spinner.gif';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      characters: null
    }
  }
  
  render() {
    return (
      <div>
        <Form onSubmit={this.handleFilterMovie}/>
        <div className="card-container">
          { this.state.loading && 
              <div className="card-container">
                <div>
                <img src={logo} alt="loading..." />
                <h2>Loading data...</h2>
                </div>
              </div>
          }
          { !this.state.loading && 
            this.state.movies.length > 0 && 
            this.state.movies.map( (m, i) => 
              <MovieCard  key={m.id} 
                          id={m.id} 
                          name={m.title} 
                          overview={`${m.overview.substring(0,125)}...`}
                          image={`https://image.tmdb.org/t/p/w500${m.poster_path}`} 
                          release={m.release_date}
                          popularity={m.popularity} 
                          vote_average={m.vote_average} 
                          vote_count={m.vote_count} 
              />
            )
          }
          { !this.state.loading && 
            this.state.movies.length === 0 && 
              <h1>No hay resultados para los filtros indicados</h1>
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.discoverMovies();
  }

  handleFilterMovie = async (name, year) => {
    // Muestro el spinner
    this.setState({loading: true});
    this.search(name);
  }

  /**
   * Llama a la capa de servicios para obtener las películas populares
   */
  discoverMovies = () => {
    discoverMovies().then(
      movies => {
        this.setState({ 
            loading: false,
            movies 
        }); 
      }
    );
  }

  /**
   * Llama a la capa de servicios para obtener las películas mediante búsqueda
   */
  search = (name) => {
    console.log(name)
    if (name && name.trim().length) {
      searchMovies(name).then(
        movies => {
          this.setState({ 
            loading: false,
            movies 
        });
        }
      )
    } else {
      this.discoverMovies();
    }
  };

}