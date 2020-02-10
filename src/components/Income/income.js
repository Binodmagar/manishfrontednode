import React from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {
    Form, FormGroup, Label, Input, Container
} from 'reactstrap';
import './income.css';
// import "react-datepicker/dist/react-datepicdescriptionker.css";
import Footer from '../Footer/footer';


class Income extends React.Component {
    constructor() {
        super()

        this.state = {
            incomeName: '',
            incomePrice: '',
            incomeValueCategory: '',
            incomeValueAccount: '',
            incomeDate: '',
            incomeNote: '',
            incomeNameChangeHandler: '',
            incomePriceChangeHandler: '',
            incomeCategoryChangeHandler: '',
            incomeAccountChangeHandler: '',
            incomeDateChangeHandler: '',
            incomeNoteChangeHandler: '',
            redirect: false
        }
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
        this.setState({ incomeValueCategory: event.target.value });
    }
    incomeAccountChangeHandler = (event) => {
        this.setState({ incomeValueAccount: event.target.value });
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

    SubmitHandler = (event) => {
        event.preventDefault();

        var headers = {
            'Content-Type': 'application/json'
        }
        var data = {
            incomeName: this.state.incomeName,
            incomePrice: this.state.incomePrice,
            incomeValueCategory: this.state.incomeValueCategory,
            incomeValueAccount: this.state.incomeValueAccount,
            incomeDate: this.state.incomeDate,
            incomeNote: this.state.incomeNote
        }
        Axios.post('http://localhost:3002/incomes', data, headers)
            .then((res) => {
                console.log(res.data.status);
                if (res.status === 201) {
                    this.setState({ redirect: true })
                }

            })
            .catch((err) => {
                console.log(err);

            })
    }

    render() {
        return (
            <Container>
                <div className="income-form">
                    <Form onSubmit={this.SubmitHandler} className="incomeForm">
                        <h2>
                            <strong>Add Income</strong>
                        </h2>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type="text" placeholder="Enter name" value={this.state.incomeName} onChange={this.incomeNameChangeHandler} />
                            <p>{this.state.validationMessagName}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label>Price</Label>
                            <Input type="Number" placeholder="Enter price" value={this.state.incomePrice} onChange={this.incomePriceChangeHandler} />
                            <p>{this.state.validationMessagePrice} </p>
                        </FormGroup>
                        <Label>Category:</Label><br />
                        <select value={this.state.incomeValueCategory} onChange={this.incomeCategoryChangeHandler} className="test">
                            <option value="Salary">Food</option>
                            <option value="Bonus">Health</option>
                            <option value="Allowance">General Expense</option>
                        </select>

                        <br />
                        <label>Acount:</label><br />
                        <select value={this.state.incomeValueAccount} onChange={this.incomeAccountChangeHandler}>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Bank">Bank</option>
                        </select><br />

                        <p>Please select date</p>
                        <Input label="Date of expense" value={this.state.incomeDate} onChange={this.incomeDateChangeHandler} type="date" />
                        <FormGroup>

                            <Label>Note</Label>
                            <Input type="text" placeholder="Enter Note" value={this.state.incomeNote} onChange={this.incomeNoteChangeHandler} />
                            <p>{this.state.validationMessageNote}</p>
                        </FormGroup>
                        <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 design" type="submit">Add Income</button>
                    </Form>
                </div>
                <Footer />
            </Container>
        )
    }
}

export default Income