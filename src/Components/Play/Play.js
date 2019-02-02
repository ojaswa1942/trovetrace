import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Play.css';

class Play extends Component {

  constructor(){
    super();
    this.state={
      deadUser: ''
    }
  }
  onPress = (event) =>{
    const deadUser = event.target.getAttribute('value');
    this.setState({deadUser});
    fetch('/api/lost', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        user: deadUser
      })
    })
    .then(response => response.json())
    .then(res => console.log(res))
    .catch(console.log);
  }

  render() {
    return (
      <div className='bg-yellow min-vh-100'>
      </div>
    );
  }
}

export default Play;
