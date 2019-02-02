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

class App extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,

    }
  }

  updateLoginState = (value) =>{
    this.setState({isLoggedIn: value});
  }

  render() {
    return (
      <div className="App min-vh-100">
        <Nav />
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
            />}
          />
          <Route path="/about" exact component={About} />
          <Route path="/rules" exact component={Rules} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/rank" exact component={Rank} />
          <Route component={Lost} />
        </Switch>
      </div>
    );
  }
}

export default App;
