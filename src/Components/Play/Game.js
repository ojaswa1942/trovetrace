import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Loader} from '../_Loader/Loader';
import JMPSBot from '../JMPSBot/JMPSBot';
import HINT from '../../assets/pictures/hint.png'
import Modal from 'react-awesome-modal';

class Play extends Component {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      redirect: false,
      error: false,
      errorMessage: '',
      visibleModal: false,
      hintMessage: ''
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
          <div className='black f5 flex flex-column items-center pa3 bg-near-gray'>
            <div className='mb2 b'>Hint:</div><div className='t mh2'>{userGameInfo.hintMessage}</div>
          </div>
        </Modal>        
        <div className='white f1 b pt6'>
          Q{userGameInfo.qid}. {userGameInfo.question}
        </div>
        <div className='tl'>
          <img className='hintImage mw4 pointer' src={HINT} onClick={this.getHint} />
        </div>
        <JMPSBot {...this.props} hintMessage={this.state.hintMessage} />
      </div>
    );
  }
}

export default Play;
