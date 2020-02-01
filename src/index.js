import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch , Link , Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Nav, Container
} from 'react-bootstrap';

import Login from './components/Login/login.js'
import Registration from './components/Registration/registration.js'
import Footer from './components/Footer/footer.js';


class Index extends React.Component {

	constructor(){
		super()
	}
	render (){
		return(
			<Container>
			<div>
			<Router>
				<Registration />
			{/* <Login /> */}
			{/* <Footer /> */}
			<Switch>
			<Route exact path="/register"><Registration /></Route>
			</Switch>
			</Router>
			</div>
			</Container>
			)
	}
}

ReactDOM.render(<Index />, document.getElementById('root'))