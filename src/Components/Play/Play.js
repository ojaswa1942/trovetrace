import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import headers from "../../assets/logo/headers.png"
import {Footer} from '../_Footer/Footer';
import {Loader} from '../_Loader/Loader';
import Game from './Game';
import './Play.css';
import { addResponseMessage } from 'react-chat-widget';

class Play extends Component {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      redirect: false,
      error: false,
      errorMessage: '',
      clicked: false
    }
    this.timeFlag=0;
  }

  componentWillMount(){
    if(!this.props.isLoggedIn){
      fetch('/api/checkToken')
      .then(response => {
        if(response.status!==200)
          throw(response);
          this.setState({ loading: false });
          this.props.updateLoginState(true);
      })
      .catch(() => {this.setState({ loading: false, redirect: true });});
    } else this.setState({loading: false});
  }

  startGame = () => {
    if(!this.state.clicked){
      this.setState({clicked: true});
      let error = false;
      fetch('/api/newGame')
      .then(response => {
        if(response.status!==200)
          error = true;
        return response.json();
      })
      .then((quesInfo) => {
        if(error)
          throw(quesInfo);
        this.props.updateUserQues(quesInfo);
        this.setState({errorMessage: ''});
        addResponseMessage("Hellooo.. Welcome to the game!");
        addResponseMessage(`I'm JMPS! You can interact with me to answer and get hints.`);
})
      .catch(err => {
        this.setState({errorMessage: err});
      })
    }
  }

  render() {
    const { loading, redirect } = this.state;
    const {userGameInfo} = this.props;
    const timeFlag=1;
    const date = new Date(0);
    return (
      <div className=''>
        <div>
          <a href='https://www.infotsav.in' target="_blank" rel="noopener noreferrer"><img src={headers} className="headim" alt="infotsav logo" /></a>
        </div>
       {(!loading)?
          (redirect)?
            <Redirect to='/' />
          :
          <div>
            {
              (!timeFlag)?
              <div className="timeDisplay">
                <h1>Contest Starts in: </h1>
                <h1 className="timeDisplay"></h1>
              </div>
            :
              <div>
                {(!userGameInfo.qid)?
                  <div>
                   <div className="buttonToStart pointer" onClick={this.startGame} >
                      Enter Contest
                   </div>
                   <div className='tc white'>{this.state.errorMessage}</div>
                  </div>
                 :
                  <Game {...this.props} />
                }
              </div>
            }
          </div>
        :
          <Loader />
        }
        <Footer />
      </div>
    );
  }
}

export default Play;
