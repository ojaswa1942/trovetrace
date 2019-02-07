import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Loader} from '../_Loader/Loader';
import JMPSBot from '../JMPSBot/JMPSBot';
import HINT from '../../assets/pictures/hint.png'
import Modal from 'react-awesome-modal';
import Countdown from 'react-countdown-now';

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
      updated3Res: false
    }
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

  render() {
    console.log(this.props);
    const { loading, redirect } = this.state;
    const {userGameInfo} = this.props;
    let i=0, j=0;
    if(userGameInfo.qid === 3 && !this.state.updated3 && !i){
      i++;
      this.updateLink();
    }
    if(userGameInfo.qid === 3 && !this.state.updated3Res && this.props.match.params.value==='6' && !j){
      j++;
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
              <div className='white f2 b pt6'>
                Q{userGameInfo.qid}. {userGameInfo.question}
              </div>
              :
              <div className='white f1 b pt6'>
                Q{userGameInfo.qid}. {userGameInfo.question}
              </div>
            :
            <div>
              <div className='mw6 tc bg-white-40'>
                <img alt='Ques' src={userGameInfo.quesImageURL} />
                <br />

              </div>

            </div>
          }
        </div>
        <div className='tl'>
          <img className='hintImage mw4 pointer' src={HINT} onClick={this.getHint} />
        </div>
        <JMPSBot {...this.props} updated3Res={this.state.updated3Res} />
      </div>
    );
  }
}

export default Play;
