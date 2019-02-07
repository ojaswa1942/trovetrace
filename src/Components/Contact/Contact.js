import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import headers from "../../assets/logo/headers.png"
import {Footer} from '../_Footer/Footer';
import './Contact.css';

class Contact extends Component {

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
      <div>
        <div>
          <a href='https://www.infotsav.in' target="_blank" rel="noopener noreferrer"><img src={headers} className="headim" alt="infotsav logo" /></a>
        </div>
        <div className="support">
          <h1>ORGANIZERS</h1>
          <h2> Mukul Sikka - 7470485414 <br /><br /> Juhi Tiwari - 8700728483<br /></h2>
           <h1>Technical Support</h1>
          <h2> Prem Sarswat - 9950591608 <br /><br /> Ojaswa Sharma - 9424542227 <br /></h2>
           <h1>For Any Queries Contact :</h1>
          <h2> <a href="mailto:admin@infotsav.in?Subject=TroveTrace" target="_top">admin (admin@infotsav.in)</a> <br /></h2>
        </div>
        <Footer />      
      </div>
    );
  }
}

export default Contact;
