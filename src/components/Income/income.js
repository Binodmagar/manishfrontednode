import React from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {
    Form, FormGroup, Label, Input, Container, Button
} from 'reactstrap';
import './income.css';
// import "react-datepicker/dist/react-datepicdescriptionker.css";
import Footer from '../Footer/footer';


class Income extends React.Component {
    constructor() {
        super()

        this.state = {
            token: '',
            incomeName: '',
            incomePrice: '',
            incomeCategory: '',
            incomeAccount: '',
            incomeDate: '',
            incomeNote: '',
            incomeNameChangeHandler: '',
            incomePriceChangeHandler: '',
            incomeCategoryChangeHandler: '',
            incomeAccountChangeHandler: '',
            incomeDateChangeHandler: '',
            incomeNoteChangeHandler: '',
            notLoggedIn: false
        }
    }

    clearData = () =>{
        this.setState({
            incomeName: '',
            incomePrice: '',
            incomeCategory: '',
            incomeAccount: '',
            incomeDate: '',
            incomeNote: '',
        })
    }
    incomeNameChangeHandler = (event) => {
        this.setState({ incomeName: event.target.value });
        if (event.target.value.length < 4) {
            this.setState({ validationMessagName: "Income name must be more than 4 character" });
        } else {
            this.setState({ validationMessagName: "Valid name" });
        }
    }
    incomePriceChangeHandler = (event) => {
        this.setState({ incomePrice: event.target.value });
        if (event.target.value.length < 1) {
            this.setState({ validationMessagePrice: "Price cannot be Zero" });
        } else {
            this.setState({ validationMessagePrice: "Valid price" });
        }
    }
    incomeCategoryChangeHandler = (event) => {
        this.setState({ incomeCategory: event.target.value });
    }
    incomeAccountChangeHandler = (event) => {
        this.setState({ incomeAccount: event.target.value });
    }
    incomeDateChangeHandler = (event) => {
        this.setState({ incomeDate: event.target.value });
    }
    incomeNoteChangeHandler = (event) => {
        this.setState({ incomeNote: event.target.value });
        if (event.target.value.length < 4) {
            this.setState({ validationMessageNote: "Note must be more than 4 character" });
        } else {
            this.setState({ validationMessageNote: "Valid note" });
        }
    }

    incomeSubmitHandler = (event) => {
        event.preventDefault();
        var data = {
            incomeName: this.state.incomeName,
            incomePrice: this.state.incomePrice,
            incomeCategory: this.state.incomeCategory,
            incomeAccount: this.state.incomeAccount,
            incomeDate: this.state.incomeDate,
            incomeNote: this.state.incomeNote
        }
        Axios.post('http://localhost:3003/incomes', data, { headers: { Authorization: 'Bearer ' + this.state.token } })
            .then((response) => {
                console.log(response.data.status);
                if (response.status === 201) {
                    alert("Income added successfully!!")
                    this.clearData();
                    this.setState({ redirect: true })
                }

            })
            .catch((err) => {
                console.log(err);

            })
    }

    componentWillMount() {
        if (localStorage.getItem('user_token')) {
            this.setState({ token: localStorage.getItem('user_token') });
        } else {
            this.setState({ notLoggedIn: true });
        }
    }

    render() {
        return (
            <Container  className="income">
                <h5>Transaction</h5>
                <hr></hr>
                <div className="income-form">
                    <Form onSubmit={this.incomeSubmitHandler} className="incomeForm">
                        <h2>
                            <strong>Add Income</strong>
                        </h2>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type="text"
                                placeholder="Enter name"
                                value={this.state.incomeName}
                                onChange={this.incomeNameChangeHandler} autoFocus required/>
                            <p>{this.state.validationMessagName}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label>Price</Label>
                            <Input
                                type="Number"
                                placeholder="Enter price"
                                value={this.state.incomePrice}
                                onChange={this.incomePriceChangeHandler} required />
                            <p>{this.state.validationMessagePrice} </p>
                        </FormGroup>

                        <Label>Category:</Label><br />
                        <select value={this.state.incomeCategory} onChange={this.incomeCategoryChangeHandler} className="test">
                        <option>Please select income category</option>
                            <option value="Salary">Salary</option>
                            <option value="Bonus">Bonus</option>
                            <option value="Allowance">Allowance</option>
                        </select>
                        <br />

                        <label>Acount:</label><br />
                        <select value={this.state.incomeAccount} onChange={this.incomeAccountChangeHandler}>
                        <option>Please select account</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Bank">Bank</option>
                        </select><br />

                        <p>Please select date</p>
                        <Input
                            label="Date of expense"
                            value={this.state.incomeDate}
                            onChange={this.incomeDateChangeHandler}
                            type="date" />

                        <FormGroup>
                            <Label>Note</Label>
                            <Input
                                type="text"
                                placeholder="Enter Note"
                                value={this.state.incomeNote}
                                onChange={this.incomeNoteChangeHandler} required/>
                            <p>{this.state.validationMessageNote}</p>
                        </FormGroup>

                        <button className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0 design" type="submit">Add Income</button>
                    </Form>
                </div>
                <Footer />
            </Container>
        )
    }
}

export default Income