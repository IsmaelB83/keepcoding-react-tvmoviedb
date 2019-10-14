// Node imports
import React, { Component } from 'react';
// CSS imports
import './Form.css';


export default class Form extends Component {
  
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
        <input type="number" name="year" placeholder="year..." onChange={this.handleSubmit} min="1900" />
      </form>
    );
  }

  handleSubmit = (ev) => {
    // En caso de llegar por un submit cancelo el submit
    ev.preventDefault();
    // Actualizo el name y year según aplique
    this.setState({
      [ev.target.name]: ev.target.value
    }, () =>{
      this.props.onSubmit(this.state.name, this.state.year);
    })
  }
}