import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Login from '../Login/Login'
import headers from "../../assets/logo/headers.png"
import {Footer} from '../_Footer/Footer';
import '../../assets/css/fontawesome.min.css'
import '../../assets/css/brands.min.css'
import '../../assets/css/solid.min.css'
import './Home.css';

class Home extends Component {

  constructor(props){
    super(props);
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
      <div className=''>
        <div>
          <a href='https://www.infotsav.in' target="_blank" rel="noopener noreferrer"><img src={headers} className="headim" alt="infotsav logo" /></a>
        </div>
        <div className='f1 b white b'>Trovetrace Image Here</div>
        <Login {...this.props} />
        <Footer />
      </div>
    );
  }
}

export default Home;
