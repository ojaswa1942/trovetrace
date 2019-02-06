import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Widget, addResponseMessage, addLinkSnippet } from 'react-chat-widget';
import arcreactor from '../../assets/pictures/arcreactor.png'
import 'react-chat-widget/lib/styles.css';
import './JMPSBot.css';

class JMPSBot extends Component {

  constructor(props){
    super(props);
    this.state={
    }
  }
  componentDidMount(){
  }

  handleMessage = (message) =>{
    if(message.toLowerCase().includes('fuck'))
      setTimeout(() => {addResponseMessage('What the fuck?');}, 1000);
    else if(message.toLowerCase().includes('sex'))
      setTimeout(() => {addResponseMessage('I want to get laid!');}, 1000);
    else if(message.toLowerCase().includes('infotsav'))
      setTimeout(() => {
        addResponseMessage('Infotsav is the techno-managerial fest of ABV-IIITM, Gwalior. You can know more about Infotsav here:');
        addLinkSnippet({title: `Infotsav'19`, link: `https://www.infotsav.in`, target: `_blank`})
      }, 1000);
    else {
      // this.requestMessageResponse(message);
      setTimeout(() => {addResponseMessage(message);}, 3000)
    }
  }

  requestMessageResponse = (message) => {
    
  }

  render() {
    let {badge} = this.props;
    return (
      <div>
        <Widget 
          handleNewUserMessage={this.handleMessage}
          title='JMPS'
          subtitle=''
          profileAvatar={arcreactor}
         />
      </div>
    );
  }
}

export default JMPSBot;
