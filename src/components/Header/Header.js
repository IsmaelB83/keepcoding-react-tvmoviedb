// Node imports
import React, { Component } from 'react';
// Own imports
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// CSS imports
import './Header.css';

/**
 * Componente home
 */
export default class Home extends Component {

  /**
   * Render del componente
   */
  render() {
    return (
        <React.Fragment>
            <header className="Header">
                <a href="/"><h1>TvMovie DB</h1></a>
                <a href="/profile" className='Header__profile'><AccountCircleIcon/></a>
            </header>
        </React.Fragment>
    );
  }
}