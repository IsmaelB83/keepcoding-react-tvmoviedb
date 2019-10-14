// Node imports
import React, { Component } from 'react';
// CSS imports
// Assets imports
import Image404 from '../../assets/images/404.jpg';

export default class Error404 extends Component {

    render() {
      return (
        <div className="card-container">
          <div>
            <img src={Image404} alt="404 not foundloading..." />
          </div>
        </div>
      );
    }
  }