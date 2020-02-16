import React, { Component } from 'react';
import { Table, Container, Button } from 'reactstrap';
import Footers from '../Footer/footer';
import './income.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class ShowIncome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            incomes: [],
            token: '',
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('user_token')}` }
            }

        }
    }

    deleteHandler = (incomeid) => {
        console.log(incomeid);
        var cdelete = confirm("You want to delete?");
        if (cdelete) {
            Axios.delete('http://localhost:3003/incomes/' + incomeid);
            alert("Income delete successfully!!")
        } else {
            return false;
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:3003/incomes', this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    incomes: response.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className="incomeTop">
                <h5>Incomes Reports</h5>
                <hr></hr>
                <Button className=" fas fa-plus btn btn-success"><Link to='/addIncome'>New transaction</Link></Button>
                <div className="showIncomeHeader"><i className="far fa-chart-bar"></i>History of Incomes</div>
                <div className="table-responsive">
                    <Table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Income Name</th>
                                <th>Price (Rs)</th>
                                <th>Category</th>
                                <th>Account</th>
                                <th>Date</th>
                                <th>Note</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {this.state.incomes.map((income) => {
                            return<tbody key={income.id}>
                               <tr key={income.id}>
                                    <td>{income.incomeName}</td>
                                    <td>{income.incomePrice}</td>
                                    <td>{income.incomeCategory}</td>
                                    <td>{income.incomeAccount}</td>
                                    <td>{income.incomeDate}</td>
                                    <td>{income.incomeNote}</td>
                                    <td><Button outline color="danger" onClick={() => this.deleteHandler(income._id)}>Delete</Button>
                                    <Button outline color="info"><Link to={`/editincome/myincome/${income._id}`}>Edit</Link></Button></td>
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

export default ShowIncome;