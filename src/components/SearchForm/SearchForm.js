// Node imports
import React, { Component } from 'react';
// CSS imports
import './SearchForm.css';

/**
 * Componente form
 */
export default class SearchForm extends Component {
  
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      year: '',
    };
  }

  render() {
    return (
      <form className="form-cards" type='POST' onSubmit={this.handleSubmit}>
        <p>Criterios de filtrado</p>
        <input type="text" name="name" placeholder="movie name..." onChange={this.handleSubmit}/>
        <input type="number" name="year" placeholder="year..." onChange={this.handleNumber} min="1900" value={this.props.year}/>
      </form>
    );
  }

  handleNumber = (ev) => {
    // Actualizo el name y year según aplique
    this.setState({
      year: parseInt(ev.target.value)
    }, () =>{
      if (this.state.year && this.state.year >= 1900) {
        this.props.onSubmit(this.state.name, this.state.year);
      }
    })
  }
  
  handleSubmit = (ev) => {
    // En caso de llegar por un submit cancelo el submit
    ev.preventDefault();
    // Actualizo el name y year según aplique
    this.setState({name: ev.target.value
    }, () =>{
      this.props.onSubmit(this.state.name, this.state.year);
    })
  }
}