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
    }
  }

  getHint = () =>{
    this.setState({visibleModal: true});
  }

  render() {
    const { loading, redirect } = this.state;
    const {userGameInfo} = this.props;
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
        <div className='white f1 b pt6'>
          {(!userGameInfo.quesImage)?
            <div>
              Q{userGameInfo.qid}. {userGameInfo.question}
            </div>
            :
            <div>
              <div className='mw7 tc'>
                <img alt='Ques' src={userGameInfo.quesImageURL} />
                <br />

              </div>

            </div>
          }
        </div>
        <div className='tl'>
          <img className='hintImage mw4 pointer' src={HINT} onClick={this.getHint} />
        </div>
        <JMPSBot {...this.props} />
      </div>
    );
  }
}

export default Play;
