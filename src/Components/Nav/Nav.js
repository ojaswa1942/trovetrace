import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';

class Nav extends Component {

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
      <header id='navBar' className="white tc pv4 avenir">

        <nav className="bb tc w-70-ns center mt4 dib">
          <NavLink exact activeStyle={{background: '#9EEBCF', color: 'black'}} className="f6 f5-l link bg-animate white hover-bg-light-green hover-black dib pa3 ph4-l " to="/">Home</NavLink>
          <NavLink exact activeStyle={{background: '#9EEBCF', color: 'black'}} className="f6 f5-l link bg-animate white hover-bg-light-green hover-black dib pa3 ph4-l" to="/about">About</NavLink>
          <NavLink exact activeStyle={{background: '#9EEBCF', color: 'black'}} className="f6 f5-l link bg-animate white hover-bg-light-green hover-black dib pa3 ph4-l " to="/rules">Rules</NavLink>
          <NavLink exact activeStyle={{background: '#9EEBCF', color: 'black'}} className="f6 f5-l link bg-animate white hover-bg-light-green hover-black dib pa3 ph4-l " to="/score">Score</NavLink>
          <NavLink exact activeStyle={{background: '#9EEBCF', color: 'black'}} className="f6 f5-l link bg-animate white hover-bg-light-green hover-black dib pa3 ph4-l " to="/contact">Contact</NavLink>
          {(this.props.isLoggedIn)?
            <span onClick={this.props.logOut} className='f6 f5-l link bg-animate white hover-bg-light-green hover-black dib pa3 ph4-l pointer'>Logout</span>
          : null }
        </nav>
      </header>
    );
  }
}

export default Nav;
