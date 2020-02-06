import React from 'react';
import Axios from 'axios';
import {
    Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import Registration from '../Registration/registration.js'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import './home.css';
import Expense from '../Expense/expense.js';



class Home extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
            <Router>
                    <div className="nav-side-menu">
                        <div className="brand">Expense Manager</div>
                        <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                        <div className="menu-list">
                            <ul id="menu-content" className="menu-content collapse out">
                                <li>
                                <Link to='/addExpense'>
                                        <i></i> Dashboard
                                    </Link>
                                </li>
                                <li data-toggle="collapse" data-target="#products" className="collapsed active">
                                    <i className="fas fa-chart-line"></i> Transaction <span className="arrow"></span>
                                </li>
                                <ul className="sub-menu collapse" id="products">
                                    <li><Link to='/addExpense'>Add Expense</Link></li>
                                    <li><Link to='/addIncome'>Add Income</Link></li>
                                </ul>
                                <li>
                                <Link to=''>
                                    <i className="fas fa-minus-circle"></i> Expense
                                </Link>
                                </li>
                                <li>
                                <Link to=''>
                                    <i className="fas fa-donate"></i> Income
                                </Link>
                                </li>
                                <li>
                                <Link to=''>
                                    <i className="fas fa-user-tie fa-lg"></i> Profile
                                </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path='/addExpense'><Expense /></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Home