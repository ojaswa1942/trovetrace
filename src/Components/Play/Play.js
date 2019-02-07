import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import headers from "../../assets/logo/headers.png"
import {Footer} from '../_Footer/Footer';
import {Loader} from '../_Loader/Loader'
import './Play.css';

class Play extends Component {

  constructor(){
    super();
    this.state={
      loading: true,
      redirect: false,
      error: false,
      errorMessage: ''
    }
    this.timeFlag=0;
  }

  render(){
    if(1){
        return(
          <h3>C</h3>
        );
    }
    return(
        <h1>Byeee</h1>
    );
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
    const timeFlag=1;
    const date = new Date(0);
    return (
      <div className=''>
        <div>
          <a href='https://www.infotsav.in' target="_blank" rel="noopener noreferrer"><img src={headers} className="headim" alt="infotsav logo" /></a>
        </div>
        <div>
          {
            (!timeFlag)?
            <div className="timeDisplay">
              <h1>Contest Starts in: </h1>
              <h1 className="timeDisplay"></h1>
            </div>
          :
            <div>
               <div className="button">
                  Enter Contest
               </div>
            </div>
          }

        </div>
       {(!loading)?
          (redirect)?
            <Redirect to='/' />
          :
            <div>
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
