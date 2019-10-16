// Node imports
import React, { Component } from 'react';
// Own imports
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// CSS imports
// Assets imports
import Image404 from '../../assets/images/404.jpg';

export default class Error404 extends Component {

    render() {
      return (
        <React.Fragment>
          <Header/>
          <section className="section">
            <div className="card-container">
              <div>
                <img src={Image404} alt="404 not foundloading..." />
              </div>
            </div>
          </section>
          <Footer/>
        </React.Fragment>
        
      );
    }
  }