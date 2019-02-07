import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import headers from "../../assets/logo/headers.png"
import {Footer} from '../_Footer/Footer';
import './Rules.css';

class Rules extends Component {

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
        <div className="rules">
          <b >PLEASE READ CAREFULLY</b>
        </div>
        <div className="read">
          <br></br>
          <ul>
            <li>The participant who clears the maximum no of levels earliest would be declared as the winner.</li><br />
            <li>In case of more than one participant solving the equal number of questions, the one who solves earlier would be declared as the winner. </li><br />
            <li>The quiz will be over in 2 hours.</li><br />
            <li>Goodies are for 1st place only</li><br />
            <li>Anyone caught cheating or trying to post answers on any forum would be disqualified.</li><br />
            <li>The discretion & judgement of the organizers is final.</li><br />
            <li>Each question is of 100 marks.</li><br />
          </ul>
        </div>
        <Footer />      
      </div>
    );
  }
}

export default Rules;
