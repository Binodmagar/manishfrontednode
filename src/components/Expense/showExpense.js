import React, { Component } from 'react';
import { Table, Container, Button } from 'reactstrap';
import Footers from '../Footer/footer';
import './expense.css';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

class ShowExpense extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expenses: [],
            token: '',
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('user_token')}` }
            },
            redirect: false

        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3003/expenses', this.state.config)
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

    deleteHandler = expenseid => {
        console.log(expenseid);
        var deleteExpense = confirm("You sure want to delete expense?");

        if (deleteExpense) {
            Axios.delete('http://localhost:3003/expenses/' + expenseid);
            alert("Expense delete successfully!!")
            this.setState({redirect: true})
        } else {
            return false;
        }
    }

    render() {
        if(this.state.redirect){
            return(
				<Redirect to='/showExpense' />
			)
        }
        return (
            <div className="expenseTop">
                <h5>Expense Reports</h5>
                <hr></hr>
                <Button className=" fas fa-minus btn btn-danger"><Link to='/addExpense'>New transaction</Link></Button>
                <div className="showExpenseHeader"><i className="far fa-chart-bar"></i>History of Expense</div>
                <div className="table-responsive">
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Expense Name</th>
                                <th>Price (Rs)</th>
                                <th>Category</th>
                                <th>Account</th>
                                <th>Date</th>
                                <th>Note</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {this.state.expenses.map((expense) => {
                            return<tbody key={expense.id}>
                               <tr key={expense.id}>
                                    <td>{expense.expenseName}</td>
                                    <td>{expense.expensePrice}</td>
                                    <td>{expense.expenseCategory}</td>
                                    <td>{expense.expenseAccount}</td>
                                    <td>{expense.expenseDate}</td>
                                    <td>{expense.expenseNote}</td>
                                    <td><Button outline color="danger" onClick={() => this.deleteHandler(expense._id)}>Delete</Button>
                                        <Button outline color="info"><Link to={`/editexpense/my/${expense._id}`}>Edit</Link></Button></td>
                                </tr>
                            </tbody>
                        })}
                    </Table>
                </div>
                <Footers />
            </div>
        )
    }
}

export default ShowExpense;