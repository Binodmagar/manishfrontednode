import React from 'react';
import Axios from 'axios';
import './registration.css';
import { Link } from 'react-router-dom';
import {
	Col, Row, Form, FormGroup, Label, Input
} from 'reactstrap';


class Registration extends React.Component {
	constructor() {
		super()

		this.state = {
			firstName: '',
			lastName: '',
			mobileNumber: '',
			email: '',
			password: '',
			cpassword: '',
			validationMessageFirstName: '',
			validationMessageLastName: '',
			validationMessageMobileNumber: '',
			validationMessageEmail: '',
			validationMessagePassword: '',
			validationMessageConfirmPassword: '',
			redirect: false
		}
	}

	firstNameChangeHandler = (event) => {
		this.setState({ firstName: event.target.value });
		if (event.target.value.length < 3) {
			this.setState({ validationMessageFirstName: "First name must be more than 2 character!" });
		} else {
			this.setState({ validationMessageFirstName: "First name is valid!" });
		}
	}

	lastNameChangeHandler = (event) => {
		this.setState({ lastName: event.target.value });
		if (event.target.value.length < 2) {
			this.setState({ validationMessageLastName: "Last name must be more than 2 character!" });
		} else {
			this.setState({ validationMessageLastName: "Last name is valid!" });
		}
	}

	mobileNumberChangeHandler = (event) => {
		this.setState({ mobileNumber: event.target.value });
		if (event.target.value.length < 9) {
			this.setState({ validationMessageMobileNumber: "Mobile Number must be of 10 number" });
		} else {
			this.setState({ validationMessageMobileNumber: "Mobile Number is valid!" });
		}
	}

	emailChangeHandler = (event) => {
		this.setState({ email: event.target.value });
		if (event.target.value.length < 2) {
			this.setState({ validationMessageEmail: "Email must be more than 2 character!" });
		} else {
			this.setState({ validationMessageEmail: "Email is valid!" });
		}
	}

	passwordChangeHandler = (event) => {
		this.setState({ password: event.target.value });
		if (event.target.value.length < 5) {
			this.setState({ validationMessagePassword: "Password must be more than 4 character!" });
		} else {
			this.setState({ validationMessagePassword: "Password is valid!" });
		}
	}

	cpasswordChangeHandler = (event) => {
		this.setState({ cpassword: event.target.value });
		if (event.target.value !== this.state.password) {
			this.setState({ validationMessageConfirmPassword: "Password doesnot match!" });
		} else {
			this.setState({ validationMessageConfirmPassword: "Password is valid!" });
		}
	}

	SubmitHandler = (event) => {
		event.preventDefault()
		var headers = {
			'Content-Type': 'application/json'
		}

		var data = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			mobileNumber: this.state.mobileNumber,
			email: this.state.email,
			password: this.state.password
		}

		Axios.post('http://localhost:3000/users', data, headers)
			.then((response) => {
				console.log(response.data.status);
				if (res.status === 201) {
					this.setState({ redirect: true });
				}
			})
			.catch((error) => {
				console.log(error);
			})
	}

	render() {
		return (
			<div className="signup-form">
				<Form onSubmit={this.SubmitHandler} className="registerForm">
					<h2>
						<strong>Sign up</strong>
					</h2>
					<p class="hint-text">Create your account. It's free and only takes a minute.</p>
					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label>First Name</Label>
								<Input type="text" placeholder="Enter First Name" value={this.state.firstName} onChange={this.firstNameChangeHandler} />
								<p>{this.state.validationMessageFirstName}</p>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label>Last Name</Label>
								<Input type="text" placeholder="Enter Last Name" value={this.state.lastName} onChange={this.lastNameChangeHandler} />
								<p>{this.state.validationMessageLastName}</p>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label>Mobile Number</Label>
						<Input type="Number" placeholder="Enter mobile number" value={this.state.mobileNumber} onChange={this.mobileNumberChangeHandler} />
						<p>{this.state.validationMessageMobileNumber}</p>
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input type="email" placeholder="Enter email" value={this.state.email} onChange={this.emailChangeHandler} />
						<p>{this.state.validationMessageEmail} </p>
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input type="password" placeholder="Enter password" value={this.state.password} onChange={this.passwordChangeHandler} />
						<p>{this.state.validationMessagePassword}</p>
					</FormGroup>
					<FormGroup>
						<Label>Confirm Password</Label>
						<Input type="password" placeholder="Confirm password" value={this.state.cpassword} onChange={this.cpasswordChangeHandler} />
						<p>{this.state.validationMessageConfirmPassword}</p>
					</FormGroup>
					<button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 design" type="submit">Register</button>
				</Form>
				<div className="text-center">Already have an account?<Link to='/'>Sign in</Link></div>
			</div>
		)
	}
}

export default Registration