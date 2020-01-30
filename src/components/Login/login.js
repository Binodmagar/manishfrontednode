import React from 'react';
import Axios from 'axios';
import {
	Form, Button, Label, Input
}from 'react-bootstrap';

import { 
	BrowserRouter as Router, Switch , Link , Route 
} 
from 'react-router-dom';
import Registration from '../Registration/registration.js'

class Login extends React.Component{
	constructor(){
		super()

		this.state = {
			email: '',
			password: '',
			validationEmail: '',
			validationPassword: ''

		}
	}

	emailChangeHandler = (event) => {
		this.setState({email: event.target.value});
		if(event.target.value.length < 2){
			this.setState({validationEmail: "Email must be more than two character!"});
		}else{
			this.setState({validationEmail: "Email is valid"});
		}
	}

	passwordChangeHandler = (event) => {
		this.setState({password: event.target.value});
		if(event.target.value.length < 4){
			this.setState({validationPassword: "Password must be more than 4 character"});
		}
	}

	submitHandler = (event) => {
		event.preventDefault();

		var headers = {
			'Content-Type': 'application/json'
		}
		var data = {
			email: this.state.email,
			password: this.state.password
		}

		Axios.post('http://localhost:3000/users', data, headers)
		.then((response) => {
			console.log(response.data);
			localStorage.setIteam("user_token",response.data.userToken);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	render(){
		return(
			<div class="container">
			    <div class="row">
			      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
			        <div class="card card-signin my-5">
			          <div class="card-body">
			            <h5 class="card-title text-center">Sign In</h5>
			            <form class="form-signin" onSubmit={this.submitHandler}>
			              <div class="form-label-group">
			                <input type="email" value={this.state.email} onChange={this.emailChangeHandler} placeholder="Email address" required autofocus />
			                <label for="inputEmail">Email address</label>
			                <p>{this.state.validationEmail}</p>
			              </div>

			              <div class="form-label-group">
			                <input type="password" value={this.state.password} onChange={this.passwordChangeHandler} placeholder="Password" required autofocus/>
			                <label for="inputPassword">Password</label>
			                <p>{this.state.validationPassword}</p>
			              </div>
			              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
			         
			              <button class="btn btn-lg btn-primary btn-block text-uppercase">Register An Account</button>
			            </form>
			          </div>
			        </div>
			      </div>
			    </div>
			   {/* <Switch>
			    	<Route exact path="/registration"><Registration /></Route>
			    </Switch>*/}
			
			  </div>
			)
	}
}

export default Login