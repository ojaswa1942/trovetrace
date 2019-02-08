import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Loader} from '../_Loader/Loader';
import JMPSBot from '../JMPSBot/JMPSBot';
import HINT from '../../assets/pictures/hint.png'
import Modal from 'react-awesome-modal';

let i=0, j=0;

class Play extends Component {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      redirect: false,
      error: false,
      errorMessage: '',
      visibleModal: false,
      updated3: false,
      updated3Res: false,
      seconds: 10,
      countdownStatus: false,
      funct: false
    }
  }
  componentDidMount(){
    // if(this.props.userGameInfo.qid === 3)
    //   this.startCountdown();
  }
  componentWillUnmount(){
    this.stopCountdown();
  }
  getHint = () =>{
    this.setState({visibleModal: true});
  }

  updateLink= () =>{
    this.setState({updated3: true});
    this.props.history.push('/play/861793485');
  }
  updateAnswer = () =>{
    this.setState({updated3Res: true});
    console.log('Done');
    this.props.history.push('/play');
  }
  startCountdown = () =>{
    if(this.props.userGameInfo.qid === 3 && !this.state.countdownStatus){
      this.interval = setInterval(() => {
        if(this.state.seconds === 7)
          this.setState({seconds: 5});
        else if(this.state.seconds === 0)
          this.setState({seconds: 10});
        else this.setState(prevState => ({seconds: prevState.seconds-1}));
      }, 700);
    }
  }
  stopCountdown = () => {
    clearInterval(this.interval);
    this.setState({countdownStatus: false});
  }
  startFuncLog = () => {
    window.question = (me) => {
      if(me===('JMPSisTheBest')){
        console.log('A.B.V. - I.I.I.T. GWALIOR');
      }
      else console.log('JMPSisTheBest');
    }
  }

  render() {
    // const { loading, redirect } = this.state;
    const {userGameInfo} = this.props;
    if(userGameInfo.qid === 3 && !this.state.updated3 && !i){
      i++;
      this.updateLink();
    }
    if(userGameInfo.qid === 3 && !this.state.countdownStatus){
      this.setState({countdownStatus: true});
      this.startCountdown();
    }
    if(userGameInfo.qid === 8 && !this.state.funct){
      this.setState({funct: true});
      this.startFuncLog();
    }
    if(userGameInfo.qid === 3 && !this.state.updated3Res && this.props.match.params.value==='6' && !j){
      j++;
      this.stopCountdown();
      this.updateAnswer();
    }
    return (
      <div>
        <Modal 
          visible={this.state.visibleModal}
          effect="fadeInUp"
          onClickAway={() => this.setState({visibleModal: false})}
        >
          <div className='black f5 flex flex-column items-center pa2 bg-near-gray'>
            <div className='mb2 b'>Hint:</div>
            {(!userGameInfo.hintImage)?
              <div className='t mh2'>{userGameInfo.hintMessage}</div>
              :
              <div className='t mh2 mw7'><img alt='Hint' src={userGameInfo.hintImageURL} /></div>
            }
          </div>
        </Modal>        
        <div className='white tc flex flex-column items-center'>
          {(!userGameInfo.quesImage)?
            (userGameInfo.question.length >150)?
              <div className='white f2 b pt3 mh6-l'>
                Q{userGameInfo.qid} {userGameInfo.question}
              </div>
              :
              <div className='white f1 b pt6'>
                Q{userGameInfo.qid} {userGameInfo.question}
              </div>
            :
            <div>
              <div className='mw6 tc'>
                <img alt='Ques' src={userGameInfo.quesImageURL} />
              </div>
              {(userGameInfo.qid === 3)?
                <div className='f1 b'>
                  {this.state.seconds}
                </div>
              : null
              }
            </div>
          }
        </div>
        <div className='tl'>
          <img className='hintImage mw4 pointer' src={HINT} alt='getHint' onClick={this.getHint} />
        </div>
        <JMPSBot {...this.props} updated3Res={this.state.updated3Res} />
      </div>
    );
  }
}

export default Play;
