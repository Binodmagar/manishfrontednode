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

    deleteHandler = (incomeid) => {
        console.log(incomeid);
        var cdelete = confirm("You want to delete?");
        if(cdelete){
            Axios.delete('http://localhost:3003/incomes/' + incomeid);
            // location.reload();
        }else{
            return false;
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:3003/incomes', { headers: { Authorization: 'Bearer ' + this.state.token } })
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
        // const{incomes} = this.state
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
                        <tbody>
                            {
                                this.state.incomes.map(income => (<tr key={income.id}>
                                     <td>{income.incomeName}</td>
                                        <td>{income.incomePrice}</td>
                                        <td>{income.incomeCategory}</td>
                                        <td>{income.incomeAccount}</td>
                                        <td>{income.incomeDate}</td>
                                        <td>{income.incomeNote}</td>
                                        <td><Button varient="primary" onClick={() => this.deleteHandler(income._id)}>Delete</Button></td>
                                </tr>))
                            }
                        </tbody>
                    </Table>
                </div>
                <Footers />
            </div>
        )
    }
}

export default ShowIncome;