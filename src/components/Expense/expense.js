import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {
	Col, Row, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import Calendar from 'react-calendar';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class Expense extends React.Component {
	constructor() {
		super()

		this.state = {
			
		}
	}

	render() {
		return (
			<div className="signup-form">
				<Form onSubmit={this.SubmitHandler} className="registerForm">
					<h2>
						<strong>Add Expense</strong>
					</h2>
					<FormGroup>
						<Label>Name</Label>
						<Input type="text" placeholder="Enter name" value={this.state.mobileNumber} onChange={this.mobileNumberChangeHandler} />
						<p>{this.state.validationMessageMobileNumber}</p>
					</FormGroup>
					<FormGroup>
						<Label>Price</Label>
						<Input type="Number" placeholder="Enter price" value={this.state.email} onChange={this.emailChangeHandler} />
						<p>{this.state.validationMessageEmail} </p>
					</FormGroup>
					<label>
						Category:
						<select value={this.state.value} onChange={this.handleChange}>
							<option value="food">Food</option>
							<option value="health">Health</option>
							<option value="general">General Expense</option>
						</select>
						</label>
						<label>
						<br />
						Acount:
						<select value={this.state.value} onChange={this.handleChange}>
							<option value="Cash">Cash</option>
							<option value="Cheque">Cheque</option>
							<option value="Bank">Bank</option>
						</select>
						</label>
						<ReactDatePicker 	onChangeCalendar={this.onChange}
          				value={this.state.date}>
						</ReactDatePicker>
					<FormGroup>
						<Label>Note</Label>
						<Input type="text" placeholder="Enter description" value={this.state.password} onChange={this.passwordChangeHandler} />
						<p>{this.state.validationMessagePassword}</p>
					</FormGroup>
					<button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 design" type="submit">Add Expense</button>
				</Form>
			</div>
		)
	}
}

export default Expense