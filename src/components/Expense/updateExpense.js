import React from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {
	Form, FormGroup, Label, Input, Container
} from 'reactstrap';
import './expense.css';
import Footer from '../Footer/footer';

class UpdateExpense extends React.Component {
	constructor(props) {
		super(props)

		let pageURL = window.location.href;
		let lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1)
		this.state = {
			expenseId: lastURLSegment,
			expenses: '',
			expenseName: '',
			expensePrice: '',
			expenseCategory: '',
			expenseAccount: '',
			expenseDate: '',
			expenseNote: '',
			expenseNameChangeHandler: '',
			expensePriceChangeHandler: '',
			expenseCategoryChangeHandler: '',
			expenseAccountChangeHandler: '',
			expenseDateChangeHandler: '',
			expenseNoteChangeHandler: '',
			redirect: false
		}
	}


	expenseNameChangeHandler = (event) => {
		this.setState({ expenseName: event.target.value });
		if (event.target.value.length < 4) {
			this.setState({ validationMessageExpenseName: "Expense name must be more than 4 character" });
		} else {
			this.setState({ validationMessageExpenseName: "Valid name" });
		}
	}
	expensePriceChangeHandler = (event) => {
		this.setState({ expensePrice: event.target.value });
		if (event.target.value.length < 1) {
			this.setState({ validationMessagePrice: "Price cannot be Zero" });
		} else {
			this.setState({ validationMessagePrice: "Valid price" });
		}
	}
	expenseCategoryChangeHandler = (event) => {
		this.setState({ expenseCategory: event.target.value });
	}
	expenseAccountChangeHandler = (event) => {
		this.setState({ expenseAccount: event.target.value });
	}
	expenseDateChangeHandler = (event) => {
		this.setState({ expenseDate: event.target.value });
	}
	expenseNoteChangeHandler = (event) => {
		this.setState({ expenseNote: event.target.value });
		if (event.target.value.length < 4) {
			this.setState({ validationMessageDescription: "Note must be more than 4 character" });
		} else {
			this.setState({ validationMessageDescription: "Valid note" });
		}
	}

	componentWillMount() {
		if (localStorage.getItem('user_token')) {
			this.setState({ token: localStorage.getItem('user_token') });
		} else {
		}

		Axios.get('http://localhost:3003/my/' + this.state.expenseId)
			.then((response) => {
				console.log(response.data);
				this.setState({
					expenses: response.data,
					expenseName: response.data.expenseName,
					expensePrice: response.data.expensePrice,
					expenseCategory: response.data.expenseCategory,
					expenseAccount: response.data.expenseAccount,
					expenseDate: response.data.expenseDate,
					expenseNote: response.data.expenseNote
				})
			})
	}

	expenseSubmitHandler = (event) => {
		event.preventDefault();
		var data = {
			expenseName: this.state.expenseName,
			expensePrice: this.state.expensePrice,
			expenseCategory: this.state.expenseCategory,
			expenseAccount: this.state.expenseAccount,
			expenseDate: this.state.expenseDate,
			expenseNote: this.state.expenseNote
		}
		var updateExpense = confirm("Are you sure want to update!!")
		if(updateExpense){
			Axios.put('http://localhost:3003/expenses/' + this.state.expenseId, data, { headers: { Authorization: 'Bearer ' + this.state.token } })
			.then((res) => {
				console.log(res.data.status);
				if (res.status === 200) {
					alert('Expense update successfully!')
					this.setState({ redirect: true })
				}

			})
			.catch((err) => {
				console.log(err);

			})
		}

	}

	render() {
		if(this.state.redirect){
			return(
				<Redirect to='/showExpense' />
			)
		}
		return (
			<Container className="expense">
				<h5>Transaction</h5>
				<hr></hr>
				<div className="expenseForm">
					<Form onSubmit={this.expenseSubmitHandler} className="expenseForm">
						<h2>
							<strong>Update Expense</strong>
						</h2>
						<FormGroup>
							<Label>Name</Label>
							<Input
								type="text"
								placeholder="Enter name"
								value={this.state.expenseName}
								onChange={this.expenseNameChangeHandler} />
							<p>{this.state.validationMessageExpenseName}</p>
						</FormGroup>

						<FormGroup>
							<Label>Price</Label>
							<Input
								type="Number"
								placeholder="Enter price"
								value={this.state.expensePrice}
								onChange={this.expensePriceChangeHandler} />
							<p>{this.state.validationMessagePrice} </p>
						</FormGroup>

						<label>Category:</label><br />
						<select
							value={this.state.expenseCategory}
							onChange={this.expenseCategoryChangeHandler}>
							<option>Please select expense category</option>
							<option value="food">Food</option>
							<option value="health">Health</option>
							<option value="general">General Expense</option>
						</select>
						<br />

						<label>Acount:</label><br />
						<select value={this.state.expenseAccount} onChange={this.expenseAccountChangeHandler}>
							<option>Please select account</option>
							<option value="Cash">Cash</option>
							<option value="Cheque">Cheque</option>
							<option value="Bank">Bank</option>
						</select><br />
						<p>Please select date</p>

						<Input
							label="Date of expense"
							value={this.state.expenseDate}
							onChange={this.expenseDateChangeHandler}
							type="date" />

						<FormGroup>
							<Label>Note</Label>
							<Input
								type="text"
								placeholder="Enter Note"
								value={this.state.expenseNote}
								onChange={this.expenseNoteChangeHandler} />
							<p>{this.state.validationMessageDescription}</p>
						</FormGroup>

						<button className="btn btn-outline-danger btn-rounded btn-block my-4 waves-effect z-depth-0 design" type="submit">update Expense</button>
					</Form>
				</div>
				<Footer />
			</Container>
		)
	}
}

export default UpdateExpense