// Node imports
import React, { Component } from 'react';
// Own imports
// CSS imports
import './Footer.css';

/**
 * Componente home
 */
export default class Footer extends Component {

  /**
   * Render del componente
   */
  render() {
    return (
        <React.Fragment>
          <footer className="footer">
            <p> Written in javascript with react </p>
          </footer>
        </React.Fragment>
    );
  }
}