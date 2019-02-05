import React, { Component } from 'react';
// import ChatBot from 'react-simple-chatbot';
import {Link} from 'react-router-dom';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './JMPSBot.css';

class JMPSBot extends Component {

  constructor(props){
    super(props);
    this.state={
      deadUser: ''
    }
  }
  componentDidMount(){
    addResponseMessage('Hey! Interact with me to answer or get hints');
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
        <Widget 
          handleNewUserMessage={console.log}
          title='JMPS'
          subtitle=''
         />
      </div>
    );
  }
}

export default JMPSBot;
