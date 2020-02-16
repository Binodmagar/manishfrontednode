import React from 'react';
import Axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import './home.css';
import Expense from '../Expense/expense.js';
import ShowExpense from '../Expense/showExpense.js';
import UpdateExpense from '../Expense/updateExpense.js';
import UpdateIncome from '../Income/updateIncome';
import Income from '../Income/income.js';
import Profile from '../Profile/profile.js';
import ShowIncome from '../Income/showIncome.js';
// import Dashboard from '../Dashboard/dashboard.js';



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            expensesPrice: [],
            newPrice:[]
        }
    }
    expensePriceChangeHandler = (event) =>{
        this.setState({expensesPrice: event.target.value});
        console.log(expensesPrice);
    }

    UNSAFE_componentWillMount(){
        if(localStorage.getItem('user_token')){
            this.setState({token: localStorage.getItem('user_token')})
        }else{

        }
    }

    componentDidMount(){
        Axios.get('http://localhost:3003/expenses', {headers: { Authorization : 'Bearer ' + this.state.token}})
        .then((response) => {
            console.log(response.data);
            this.setState({
                // expenses: response.data,
                expensesPrice: response.data
            })
            console.log(this.state.expensesPrice);
            
        })
        .catch((err) => {
            console.log(err);
        })
    }
    render() {
        // const {newPrice}=this.state.newPrice
        return (
       
            <div>
            <Router>
                    <div className="nav-side-menu">
                    <div className="brand">Expense Manager</div>
                        <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                        <div className="menu-list">
                            <ul id="menu-content" className="menu-content collapse out">
                                <li>
                                <Link to='/home'>
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
                                <Link to='/showExpense'>
                                    <i className="fas fa-minus-circle"></i> Show Expense
                                </Link>
                                </li>
                                <li>
                                <Link to='/showIncome'>
                                    <i className="fas fa-donate"></i> Show Income
                                </Link>
                                </li>
                                <li>
                                <Link to='/showProfile'>
                                    <i className="fas fa-user-tie fa-lg"></i> Profile
                                </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path='/addExpense'><Expense /></Route>
                        <Route exact path='/showExpense'><ShowExpense /></Route>
                        <Route exact path='/addIncome'><Income /></Route>
                        <Route exact path='/showIncome'><ShowIncome /></Route>
                        <Route exact path='/showProfile'><Profile /></Route>
                        <Route exact path='/editexpense/my/:id'><UpdateExpense /></Route>
                        <Route exact path='/editincome/myincome/:id'><UpdateIncome /></Route>
                        <Profile />
            </Switch>
            </Router>
            </div>
        );
    }
}

export default Home