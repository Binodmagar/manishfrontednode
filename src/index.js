import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';

import Login from './components/Login/login.js'
import Registration from './components/Registration/registration.js'
// import Footer from './components/Footer/footer.js';
import Home from './components/Home/home.js';
import Expense from './components/Expense/expense.js';


class Index extends React.Component {

	constructor() {
		super()
	}
	render() {
		return (
			<Container>
				<div>
					<Router>
						{/* <Home /> */}
						<Switch>
						<Route exact path="/"><Login /></Route>
							<Route exact path="/register" component={Registration}></Route>

							<Route exact path="/home"><Home /></Route>
							{/* <Route exact path="/addExpense"><Expense /></Route> */}
						</Switch>
					</Router>
				</div>
			</Container>
		)
	}
}

ReactDOM.render(<Index />, document.getElementById('root'))