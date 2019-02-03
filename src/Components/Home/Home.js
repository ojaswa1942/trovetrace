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
