import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Lost from './Components/Lost/Lost'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import About from './Components/About/About'
import Rules from './Components/Rules/Rules'
import Contact from './Components/Contact/Contact'
import Rank from './Components/Rank/Rank'
import Nav from './Components/Nav/Nav'
import Footer from './Components/_Footer/Footer'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="App min-vh-100">
        <Nav />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/about" exact component={About} />
          <Route path="/rules" exact component={Rules} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/rank" exact component={Rank} />
          <Route component={Lost} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
