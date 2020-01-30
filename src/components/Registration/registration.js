import React from 'react';
import Axios from 'axios';
import {
	Form, Button, Label, Input
} from 'react-bootstrap';

class Registration extends React.Component{
	constructor(){
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
		this.setState({firstName: event.target.value});
		if(event.target.value.length < 2){
			this.setState({validationMessageFirstName: "First name must be more than 2 character!"});
		}else{
			this.setState({validationMessageFirstName: "First name is valid!"});
		}
	}

	lastNameChangeHandler = (event) => {
		this.setState({lastName: event.target.value});
		if(event.target.value.length < 2){
			this.setState({validationMessageLastName: "Last name must be more than 2 character!"});
		}else{
			this.setState({validationMessageLastName: "Last name is valid!"});
		}
	}

	mobileNumberChangeHandler = (event) => {
		this.setState({mobileNumber: event.target.value});
		if(event.target.value.length < 9){
			this.setState({validationMessageMobileNumber: "Mobile Number must be more than 9 character!"});
		}else{
			this.setState({validationMessageMobileNumber: "Mobile Number is valid!"});
		}
	}

	emailChangeHandler = (event) => {
		this.setState({email: event.target.value});
		if(event.target.value.length < 2){
			this.setState({validationMessageEmail: "Email must be more than 2 character!"});
		}else{
			this.setState({validationMessageEmail: "Email is valid!"});
		}
	}

	passwordChangeHandler = (event) => {
		this.setState({password: event.target.value});
		if(event.target.value.length < 4){
			this.setState({passwordChangeHandler: "Password must be more than 4 character!"});
		}else{
			this.setState({validationMessagePassword: "Password is valid!"});
		}
	}

	cpasswordChangeHandler = (event) => {
		this.setState({cpassword: event.target.value});
		if(event.target.value !==  this.state.password){
			this.setState({validationMessageConfirmPassword: "Password doesnot match!"});
		}else{
			this.setState({validationMessageConfirmPassword: "Password is valid!"});
		}
	}

	SubmitHandler = (event) => {
		event.preventDefault()
		var headers = {
			'Content-Type' : 'application/json'
		}

		var data = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			mobileNumber: this.state.mobileNumber,
			email: this.state.email,
			password: this.state.password
		}

		Axios.post('http://localhost:3000/users',data, headers)
		.then((response) => {
			console.log(response.data.status);
			if(res.status === 201){
				this.setState({redirect: true});
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}

	render(){
		return(
			<form onSubmit={this.SubmitHandler}>
				  <div class="form-row">
				    <div class="form-group col-md-6">
				      <label>First Name</label>
				      <input type="text" placeholder="Enter First Name" value={this.state.firstName} onChange={this.firstNameChangeHandler} />
				      <p>{this.state.validationMessageFirstName}</p>
				    </div>
				    <div class="form-group col-md-6">
				      <label>Last Name</label>
				      <input type="text" placeholder="Enter Last Name" value={this.state.lastName} onchange={this.lastNameChangeHandler} />
				      <p>{this.state.validationMessageLastName}</p>
				    </div>
				  </div>
				  <div class="form-group">
				    <label>Mobile Number</label>
				    <input type="text" placeholder="Enter mobile number" value={this.state.mobileNumber} onChange={this.mobileNumberChangeHandler} />
				    <p>{this.state.validationMessageMobileNumber}</p>
				  </div>
				  <div class="form-group">
				    <label>Email</label>
				    <input type="email" placeholder="Enter email" value={this.state.email} onchange={this.emailChangeHandler} />
				    <p>{this.state.validationMessageEmail} </p>
				  </div>
				  <div class="form-group">
				    <label>Password</label>
				    <input type="text" placeholder="Enter password" value={this.state.password} onChange={this.passwordChangeHandler} />
				    <p>{this.state.validationMessagePassword}</p>
				  </div>
				  <div class="form-group">
				    <label>Confirm Password</label>
				    <input type="text" placeholder="Re-type password" value={this.state.cpassword} onChange={this.cpasswordChangeHandler} />
				    <p>{this.state.validationMessageConfirmPassword}</p>
				  </div>
				  <button type="submit" class="btn btn-primary">Register</button>
				</form>

		)
	}
}

export default Registration