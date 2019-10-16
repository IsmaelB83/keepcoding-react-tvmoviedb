// Node Imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Own imports
import MovieDetail from '../MovieDetail/MovieDetail';
import Home from '../Home/Home';
import Error404 from '../Error404/Error404';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import LocalStorage from '../../utils/Storage';
import { UserProvider } from '../../context/UserContext';

/**
 * Component principal de la app
 */
export default class App extends Component {

  constructor(props) {
    super(props);
    // Intento recuperar la sesión del storage
    const user = LocalStorage.readLocalStorage();
    this.state = {
      session: user
    }
  }

  /**
   * Render
   */
  render() {
    return (
      <UserProvider value={this.state}>
        <Router>
            <Switch>
                <Route path='/movie/:id(\d+)' exact component={MovieDetail}/>
                <Route path={'/profile'} exact component={Profile} />
                <Route path={'/register'} exact component={Register} />
                <Route path={'/'} exact component={Home} />
                <Route component={Error404} />
            </Switch>
        </Router>
      </UserProvider>
    );
  }
}