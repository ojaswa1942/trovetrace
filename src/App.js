import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Lost from './Components/Lost/Lost'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Rules from './Components/Rules/Rules'
import Contact from './Components/Contact/Contact'
import Rank from './Components/Rank/Rank'
import Nav from './Components/Nav/Nav'
import Play from './Components/Play/Play'
import { addResponseMessage, toggleInputDisabled } from 'react-chat-widget';
import './App.css';

const initialState = {
  user: {
    id: '',
    name: '',
  },
  isLoggedIn: false,
  userGameInfo: {
    qid: 0,
    score: 0,
    hint: 0,
    question: '',
    quesImage: 0,
    quesImageURL: '',
    hintMessage: '',
    hintImage: 0,
    hintImageURL: ''
  },
  badge: 2
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {
        id: '',
        name: '',
      },
      badge: 2,
      isLoggedIn: false,
      userGameInfo: {
        qid: 0,
        score: 0,
        hint: 0,
        question: '',
        quesImage: 0,
        quesImageURL: '',
        hintMessage: '',
        hintImage: 0,
        hintImageURL: ''
      }
    }
  }

  componentDidMount() {
    this.requestData();
  }

  requestData = () =>{
    let err=false;
    fetch('/api/profilex')
    .then(response => {
      if(response.status!==200)
        err=true;
      return response.json();
    })
    .then(res => {
      if(err)
        throw res;
      this.sendWelcomeMessage();
      this.checkForVerification(res.user.confirm);
      this.updateUserGameInfo(res.userGame);
      this.updateUserInfo(res.user);
      this.updateLoginState(true);
    })
    .catch(console.log);
  }
  sendWelcomeMessage = () => {
    addResponseMessage("Hellooo.. Welcome to the game!");
    addResponseMessage(`I'm JMPS! You can interact with me to answer and get hints.`);
  }
  checkForVerification = (value) => {
    if(!value)
      this.logOut();
  }
  updateLoginState = (value) =>{
    this.setState({isLoggedIn: value});
  }
  updateBadge = (value) =>{
    this.setState({badge: value});
  }  
  updateUserGameInfo = (value) =>{
    if(value.qid === 10){
      toggleInputDisabled();
      addResponseMessage(`That's the end, my friend!  
        *Plays See You Again*`);
  }
    this.setState({userGameInfo: {
        qid: value.qid,
        score: value.score,
        hint: value.hint,
        question: value.question,
        quesImage: value.quesImage,
        quesImageURL: value.quesImageURL,
        hintMessage: value.hintMessage,
        hintImage: value.hintImage,
        hintImageURL: value.hintImageURL
      }
    });
  }

  updateUserInfo = (value) =>{
    this.setState({user: {
        id: value.ifid,
        name: value.name
      }
    });
  }
  updateUserQues = (value) =>{
    Object.assign(this.state.userGameInfo, {
      question: value.question,
      qid: value.qid
    });
  }
  updateUserScore = (value) =>{
    Object.assign(this.state.userGameInfo, {
      score: value
    });
  }  
  updateUserHint = (value) =>{
    Object.assign(this.state.userGameInfo, {
      hint: value
    });
  }

  logOut = () =>{
    if(this.state.isLoggedIn){
      fetch('/api/logout')
      .then(res=>{
        if(res.redirected){
          this.setState(initialState);
          // window.location.reload();
          window.location.href='/';
        }
        throw(res.error)
      })
      .catch(console.log)
    }
  }
  render() {
    console.log(this.state);
    return (
      <div className="App min-vh-100">
        <Route exact path={['/', '/play/:value?', '/about', '/rules', '/contact', '/score']} render={(props) =>
          <Nav {...props} 
            isLoggedIn={this.state.isLoggedIn}
            updateLoginState={this.updateLoginState} 
            logOut={this.logOut}
          />}
        />
        <Switch>
          <Route path="/" exact render={(props) =>
            <Home {...props} 
              isLoggedIn={this.state.isLoggedIn}
              updateLoginState={this.updateLoginState} 
              updateUserGameInfo={this.updateUserGameInfo}
              updateUserInfo={this.updateUserInfo}
            />}
          />
          <Route path="/play/:value?" exact render={(props) =>
            <Play {...props} 
              isLoggedIn={this.state.isLoggedIn}
              updateLoginState={this.updateLoginState}
              userInfo={this.state.user}
              userGameInfo={this.state.userGameInfo}
              updateUserGameInfo={this.updateUserGameInfo}
              updateUserScore={this.updateUserScore}
              updateUserHint={this.updateUserHint}
              badge={this.state.badge}
              updateBadge={this.updateBadge}
              updateUserQues={this.updateUserQues}
            />}
          />
          <Route path="/about" exact component={About} />
          <Route path="/rules" exact component={Rules} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/score" exact render={(props) =>
           <Rank {...props}
              isLoggedIn={this.state.isLoggedIn}
              userScore={this.state.userGameInfo.score}
           />}
          />
          <Route component={Lost} />
        </Switch>
      </div>
    );
  }
}

export default App;
