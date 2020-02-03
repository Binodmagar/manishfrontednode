import React from 'react';
import Axios from 'axios';
import {
	Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import './login.css';
import Registration from '../Registration/registration.js'
import { Link } from 'react-router-dom';


class Login extends React.Component {
	constructor() {
		super()

		this.state = {
			email: '',
			password: '',
			validationEmail: '',
			validationPassword: ''

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
				localStorage.setIteam("user_token", response.data.userToken);
			})
			.catch((err) => {
				console.log(err);
			})
	}

	render() {
		return (
			<div className="signup-form">
				<form className="form">
					<h2>Register Here</h2>
					<FormGroup className="design">
						<Label for="exampleEmail">Email</Label>
						<Input type="email" placeholder="Email ....." value={this.state.email} onChange={this.emailChangeHandler} />
						<p>{this.state.validationEmail} </p>
					</FormGroup>
					<FormGroup className="design">
						<Label for="examplePassword">Password</Label>
						<Input type="password" placeholder="Password ...." value={this.state.password} onChange={this.passwordChangeHandler} />
						<p>{this.state.validationPassword} </p>
					</FormGroup>
					<button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 design" type="submit">Login</button>
					{/* <p>Don't have account?<Link to='/register'>Register Here</Link></p> */}
				</form>
				<div className="text-center">Don't have an account? <Link to='/register'>Register Here</Link></div>
			</div>
		);
	}
}

export default Login