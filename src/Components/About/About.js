import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import headers from "../../assets/logo/headers.png"
import {Footer} from '../_Footer/Footer';
import './About.css';
import TROVETRACE from '../../TROVTRACE.png'

class About extends Component {

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
        <div>
          <img src={TROVETRACE} class="trove" />
        </div>
        <div className="Text">
          <p>
            TROVE TRACE IS AN ONLINE QUEST-ORIENTED PUZZLING CONTEST TO BE ORGANIZED UNDER INFOTSAV 2019 WHERE YOU ARE EXPECTED TO CROSS THE HURDLES OF SOME BRAIN CRACKING PROBLEMS OF SUBSEQUENT TOUGHNESS TO EMERGE AS THE WINNER. IT'S ONE OF THE BEST BRAIN TEASING GAME. IF SOLVING CLUES TO UNRAVEL A MYSTERY GIVE YOU A RUSH, THEN CHALLENGE YOURSELF IN A BATTLE OF WIT AND COMMON SENSE AND FOLLOW THE INSTRUCTIONS AND CLUES FROM ONE LINK TO THE NEXT TO SOLVE A SERIES OF MIND BOGGLING QUESTIONS.
            <br /><br />
            THIS TIME WE HAVE AN EXCITING BLEND OF ONLINE HUNT, SUSPENSE AND THRILL.
            <br /><br />
            IF YOU THINK THAT YOU HAVE GOT IT IN YOU TO GO TO ANY LENGTH TO GET THE THING THAT ENTICES YOU, THEN THIS IS THE PLACE WAITING FOR YOU
          </p>
        </div>
        <Footer />      
      </div>
    );
  }
}

export default About;
