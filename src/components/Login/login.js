import React from 'react';
import Axios from 'axios';
import {
	Button, Form, FormGroup, Label, Input, Container, FormText
} from 'reactstrap';
import './login.css';
import Registration from '../Registration/registration.js'
import { Link, Redirect } from 'react-router-dom';
import Footers from '../Footer/footer';


class Login extends React.Component {
	constructor() {
		super()

		this.state = {
			email: '',
			password: '',
			validationEmail: '',
			validationPassword: '',
			redirect: false

		}
	}

	emailChangeHandler = (event) => {
		this.setState({ email: event.target.value });
		if (event.target.value.length < 2) {
			this.setState({ validationEmail: "Email must be more than two character!" });
		} else {
			this.setState({ validationEmail: "Email is valid" });
		}
	}

	passwordChangeHandler = (event) => {
		this.setState({ password: event.target.value });
		if (event.target.value.length < 4) {
			this.setState({ validationPassword: "Password must be more than 4 character" });
		}else{
			this.setState({ validationPassword: "Password is valid"});
		}
	}

	SubmitHandler = (event) => {
		event.preventDefault();

		var headers = {
			'Content-Type': 'application/json'
		}
		var data = {
			email: this.state.email,
			password: this.state.password
		}

		Axios.post('http://localhost:3003/users/login', data, headers)
			.then((response) => {
				console.log(response.data);
				localStorage.setItem("user_token", response.data.token);
				this.setState({redirect:true});
			})
			.catch((err) => {
				console.log(err);
				alert("Email or password not match!");
			})
	}

	render() {
		if(this.state.redirect){
			return(
				<Redirect to='/home' />
			)
		}
		return (
			<Container>
			<div className="login-form">
				<form onSubmit={this.SubmitHandler}>
					<h2>Login Here</h2>
					<FormGroup className="design">
						<Label>Email</Label>
						<Input type="email" placeholder="Email ....." value={this.state.email} onChange={this.emailChangeHandler} autoFocus required/>
						<p>{this.state.validationEmail} </p>
					</FormGroup>
					<FormGroup className="design">
						<Label>Password</Label>
						<Input type="password" placeholder="Password ...." value={this.state.password} onChange={this.passwordChangeHandler} required/>
						<p>{this.state.validationPassword} </p>
					</FormGroup>
					<button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 design" type="submit">Login</button>
					{/* <p>Don't have account?<Link to='/register'>Register Here</Link></p> */}
				</form>
				<div className="text-center">Don't have an account? <Link to='/register'>Register Here</Link></div>
			</div>
			<Footers />
			</Container>
		);
	}
}

export default Login