import React from 'react';
import Axios from 'axios';
import './registration.css';
import { Link, Redirect } from 'react-router-dom';
import {
	Col, Row, Form, FormGroup, Label, Input
} from 'reactstrap';
import Footers from '../Footer/footer';


class Registration extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: '',
			lastName: '',
			mobileNumber: '',
			email: '',
			password: '',
			cpassword: '',
			image: '',
			validationMessageFirstName: '',
			validationMessageLastName: '',
			validationMessageMobileNumber: '',
			validationMessageEmail: '',
			validationMessagePassword: '',
			validationMessageConfirmPassword: '',
			redirect: false
		}
	}

	handleFileSelected = (event) => {
		this.setState({ image: event.target.files[0] })
		//for image url
		let reader = new FileReader();
		reader.onloadend = () => {
			this.setState({ imagePreviewUrl: reader.result });
		}
		reader.readAsDataURL(event.target.files[0])
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

		const formdata = new FormData();
		const imageName = this
		.state
		.image
		.name
		.toLowerCase();
		formdata.append('imageFile', this.state.image, imageName);
		Axios
		.post('http://localhost:3003/upload', formdata)
		.then(res => {
			console.log(res);
			var data = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				mobileNumber: this.state.mobileNumber,
				email: this.state.email,
				password: this.state.password,
				image: 'imageFile-' + imageName,
				redirect: false
			}
			
	
			Axios.post('http://localhost:3003/users/register', data, headers)
				.then((response) => {
					console.log(response.data.status);
					if (res.status === "Register successfully!!") {
						this.setState({redirect:true})
					}
				})
				.catch((error) => {
					console.log(error);
				})			
		})
		console.log(this.state);	
	}

	render() {
		if(this.state.redirect === true){
			return(
				<Redirect to="/"></Redirect>
			)
		}
		return (
			<div className="signup-form">
				<Form onSubmit={this.SubmitHandler} className="registerForm">
					<h2>
						<strong>Sign up</strong>
					</h2>
					<p className="hint-text">Create your account. It's free and only takes a minute.</p>
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
					<div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">
                                        Upload
                                    </span>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        inputProps={{
                                            accept: 'image/*'
                                        }}
                                        onChange={this.handleFileSelected}
                                        ref={fileInput => this.fileInput = fileInput}
                                        className="custom-file-input"
                                        id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01"
                                    />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                        Choose file
                                    </label>
                                </div>
                            </div>
					<button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 design" type="submit">Register</button>
				</Form>
				<div className="text-center">Already have an account?<Link to='/'>Sign in</Link></div>
				<Footers />
			</div>
		)
	}
}

export default Registration