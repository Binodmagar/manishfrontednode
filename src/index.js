import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch , Link , Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Nav, Container
} from 'react-bootstrap';

import Login from './components/Login/login.js'


class Index extends React.Component {

	constructor(){
		super()
	}
	render (){
		return(
			<Container>
			<div>
			<Login />
			</div>
			</Container>
			)
	}
}

ReactDOM.render(<Index />, document.getElementById('root'))