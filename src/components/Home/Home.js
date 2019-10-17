// Node imports
import React, { Component } from 'react';
// Own imports
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MovieCard from '../MovieCard/MovieCard';
import MovieDbAPI from '../../services/MovieDbAPI';
import UserConsumer from '../../context/UserContext';
// CSS imports
import './Home.css';
// Assets imports
import logo from '../../assets/images/spinner.gif';

/**
 * Componente home
 */
export default class Home extends Component {

  /**
   * Utilizar el contexto en cualquier metodo del ciclo de vida del component
   */
  static contextType = UserConsumer;

  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      characters: null
    }
  }

  /**
   * Implementar el catch (error boundary)
   * (La buena practica es implementar un componente específico que haga de error boundary,
   * Además ese componente debería proporcionar una "vía de salida" al usuario. Es decir,
   * renderizar algo que le permita continuar con la operativa o saber que ha fallado algo
   * ... "intentelo de nuevo" o similar.
   * )
   * @param {*} error 
   * @param {*} errorInfo 
   */
  componentDidCatch(error, errorInfo) {
    console.log(JSON.stringify(error));
    console.log(JSON.stringify(errorInfo));
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    // Chequeo sesion del contexto, si no existe redirijo a register
    const session = this.context.session
    if (!session) {
      return this.props.history.push('/register');
    } 
    // Si todo ok recupero movies de la API
    this.setState({ 
      api: new MovieDbAPI(session.api_key) 
    }, () => { 
      const birthday = new Date(session.birthday);
      const year = birthday.getFullYear()
      this.setState({year});
      this.discoverMovies(year);
    });
  }
  
  /**
   * Render del componente
   */
  render() {
    return (
      <React.Fragment>
        <Header/>
        <section className="section">
          <SearchForm onSubmit={this.handleFilterMovie} year={this.state.year}/>
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
        </section>
        <Footer/>
      </React.Fragment>
    );
  }

  handleFilterMovie = async (name, year) => {
    // Muestro el spinner
    this.setState({loading: true});
    this.search(name, year);
  }

  /**
   * Llama a la capa de servicios para obtener las películas populares
   */
  discoverMovies = (year) => {
    this.state.api.discoverMovies(year).then(
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
  search = (name, year) => {
    if (name) {
      this.state.api.searchMovies(name, parseInt(year))
      .then(movies => {
          this.setState({ 
            loading: false,
            movies 
          });
        }
      );
    } else {
      this.discoverMovies(year);
    }
  }
}