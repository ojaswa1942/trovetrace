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
import './App.css';

const initialState = {
  user: {
    id: '',
    name: '',
    email: '',
    college: '',
    mobile: '',
  },
  isLoggedIn: false,
  userScore: 0
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {
        id: '',
        name: '',
        email: '',
        college: '',
        mobile: '',
      },
      isLoggedIn: false,
      userGameInfo: {
        qid: 1,
        score: 0,
        hint: 0,
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
      // this.updateUser(res.user);
      // this.updateEvent(res.userEventReg);
      // this.updateEventTeams(res.userTeams);
      // this.updateUserScore(res.userScore)
      this.updateLoginState(true);
    })
    .catch(console.log);
  }

  updateLoginState = (value) =>{
    this.setState({isLoggedIn: value});
  }
  updateUserInfo = (value) =>{
    this.setState(Object.assign(this.state.userGameInfo, {
      qid: value.qid,
      score: value.score,
      hint: value.hint,
    }));
  }
  updateUserScore = (value) =>{
    this.setState(Object.assign(this.state.userGameInfo, {
      score: score
    }));
  }  
  updateUserHint = (value) =>{
    this.setState(Object.assign(this.state.userGameInfo, {
      hint: hint
    }));
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
    return (
      <div className="App bg-red min-vh-100">
        <Route exact path={['/', '/play', '/about', '/rules', '/contact', '/score']} render={(props) =>
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
            />}
          />
          <Route path="/play" exact render={(props) =>
            <Play {...props} 
              isLoggedIn={this.state.isLoggedIn}
              updateLoginState={this.updateLoginState}
              userGameInfo={this.state.userGameInfo}
              updateUserInfo={this.updateUserInfo}
              updateUserScore={this.updateUserScore}
              updateUserHint={this.updateUserHint}
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
