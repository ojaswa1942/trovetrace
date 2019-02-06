import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import headers from "../../assets/logo/headers.png"
import {Footer} from '../_Footer/Footer';
import {Loader} from '../_Loader/Loader';
import JMPSBot from '../JMPSBot/JMPSBot';
import './Play.css';

class Play extends Component {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      redirect: false,
      error: false,
      errorMessage: ''
    }
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

  render() {
    const { loading, redirect } = this.state;
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
              <JMPSBot {...this.props}  />
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
