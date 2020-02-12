import React, { Component } from 'react';
import { Table, Container, Button } from 'reactstrap';
import Footers from '../Footer/footer';
import './expense.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class ShowExpense extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expenses: [],
            token: ''
            
        }
    }

    componentWillMount() {
        if (localStorage.getItem('user_token')) {
            this.setState({ token: localStorage.getItem('user_token') });
        } else {
            this.setState({ notLoggedIn: true });
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3003/expenses', { headers: { Authorization: 'Bearer ' + this.state.token } })
            .then((response) => {
                console.log(response.data);
                
                this.setState({
                    expenses: response.data
                })              
            })
            .catch((err) => {
                console.log(err);
            })
    }
    

    render() {
        return (
            <div>
                <h5>Expense Reports</h5>
                <hr></hr>
                <Button className=" fas fa-minus btn btn-danger"><Link to='/addExpense'>New transaction</Link></Button>
                <div className="showExpenseHeader"><i className="far fa-chart-bar"></i>History of Expense</div>
                <Container className="showExpense">
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Expense Name</th>
                                <th>Price (Rs)</th>
                                <th>Category</th>
                                <th>Account</th>
                                <th>Date</th>
                                <th>Note</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.expenses.map((expense) => {
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{expense.expenseName}</td>
                                        <td>{expense.expensePrice}</td>
                                        <td>{expense.expenseCategory}</td>
                                        <td>{expense.expenseAccount}</td>
                                        <td>{expense.expenseDate}</td>
                                        <td>{expense.expenseNote}</td>
                                        <td><Button varient="primary" type="submit" id={expense.id} onclick={this.deleteHandler}>Delete</Button></td>
			                            <td><Button varient="danger" type="submit" id={expense.id} onclick={this.deleteHandler}>Edit</Button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
                <Footers />
            </div>
        )
    }
}

export default ShowExpense;