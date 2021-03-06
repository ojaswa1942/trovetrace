import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './signup.css'
import {registerFunctions} from './LoginFunctions'
import {Loader} from '../_Loader/Loader'

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
	  	questions: [
		  {question:"What's your email?", type: "emaill", pattern: /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,5}$/},
		  {question:"What's your password", type: "password", pattern: /^.{3,36}$/},
	    ],
    	username: '',
    	password: '',
    	gotUserData: false,
    	verification: 0,
    	errorRes: "",
    	loading: true,
    	redirect: false
    }
  }
  componentWillMount(){
  	if(!this.props.isLoggedIn){
		fetch('/api/checkToken')
		.then(response => {
			if(response.status!==200)
				throw(response);
		    this.setState({ loading: false, redirect: true });
		    this.props.updateLoginState(true);
		})
		.catch((errr) => {
			this.setState({ loading: false });
			// console.log(errr);
			registerFunctions(this);
		});
	} else this.setState({loading: false, redirect: true});
  }

  componentDidMount(){
  	// if(!this.props.isLoggedIn && !this.state.loading)
  	// 	registerFunctions(this);
  }
  componentDidUpdate(prevProps, prevState){
  	// if(!this.state.loading && !this.props.isLoggedIn)
  	// 	registerFunctions(this);
  }

  requestLogin = () =>{
  	let error=false;
	fetch('/api/signin', {
		method: 'post',
		headers: {'Content-type': 'application/json'},
		body: JSON.stringify({
			username: this.state.username,
			password: this.state.password
		})
	})
	.then(response => {
		if(response.status!==200)
			error=true;
		return response.json()})
	.then((user) => {
		if(error)
			throw(user);
		this.updateAllData(user);
		this.setState({
			gotUserData: true, 
			verification: user.user.confirm
		})
	})
	.catch(err => this.setState({errorRes: err}));
  }

  updateAllData = (user) => {
  	if(user.user.confirm){
		this.props.updateLoginState(true);
		this.props.updateUserInfo(user.user);
		this.props.updateUserGameInfo(user.userGame);
	}
  }

  render() {
  	const { loading } = this.state;
  	if(this.state.redirect){
  		return <Redirect to='/play' />
  	}

  	if(this.state.username && this.state.password && !this.state.gotUserData){
  		this.requestLogin();
  	}

  	if(this.state.gotUserData && this.state.verification){
  		return <Redirect to='/play' />
  	}
  	if(this.state.errorRes){
  		setTimeout(()=>{
  			window.location.reload();
  		}, 1000);
  	}

    return (
  		
	   	<div className='register-container'>
   		  <div id="progress"></div>
		  <div className="center">
		  	<div id="headdin">
		  		<h1>Login</h1>
		  	</div>
		  	{
	  		(loading)?
	  			<Loader />
  			:
		  		(this.state.gotUserData && !this.state.verification)?
					<div className='f3 white'>
						Please verify your email to continue.
					</div>
				:
					(this.state.errorRes)?
						<div className='f3 white'>
							{this.state.errorRes}
						</div>
					:
					    <div id="register">
					      <i id="progressButton" className="fas fa-arrow-right next"></i>
					      <div id="inputContainer">
					        <input id="inputField" required autoFocus />
					        <label id="inputLabel"></label>
					        <select id="selectBox" className='doNotDisplay'>
					        </select>
					        <div id="inputProgress"></div>
					      </div>
					    </div>
			}
		    <a target="_blank" rel="noopener noreferrer" href="https://www.infotsav.in/resetPass" className='white no-underline'><div id="sendto">Forgot your password?</div></a>
		    <div id="sendto">Don't have an account? <a target="_blank" rel="noopener noreferrer" href="https://www.infotsav.in/register">REGISTER</a></div>
	  	</div>
		</div>
    );
  }
}

export default Login;
