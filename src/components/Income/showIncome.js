import React, { Component } from 'react';
import { Table, Container, Button } from 'reactstrap';
import Footers from '../Footer/footer';
import './income.css';
import { Link } from 'react-router-dom';

class ShowIncome extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <h5>Incomes Reports</h5>
                <hr></hr>
                <Button className=" fas fa-plus btn btn-success"><Link to='/addIncome'>New transaction</Link></Button>
                <div className="showIncomeHeader"><i className="far fa-chart-bar"></i>History of Incomes</div>
                <Container className="showIncome">
                    {/* <h3>History of Income</h3> */}
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Income Name</th>
                                <th>Price (Rs)</th>
                                <th>Category</th>
                                <th>Account</th>
                                <th>Date</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Burger</td>
                                <td>300</td>
                                <td>Food</td>
                                <td>Cash</td>
                                <td>2020-02-11</td>
                                <td>College Breakfast</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Recharge</td>
                                <td>100</td>
                                <td>General expense</td>
                                <td>Cash</td>
                                <td>2020-02-11</td>
                                <td>Recharge of Rs 100</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Jeans Pants</td>
                                <td>2500</td>
                                <td>Clothing</td>
                                <td>Bank</td>
                                <td>2020-02-11</td>
                                <td>Black LVD jeans pants</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
                <Footers />
            </div>
        )
    }
}

export default ShowIncome;