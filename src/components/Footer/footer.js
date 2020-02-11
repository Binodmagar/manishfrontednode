import React from 'react';
import { Footer } from 'react-bootstrap';
import './footer.css';
class Footers extends React.Component{
    constructor(){
        super()

    }

    render(){
        return(
            <div className="d-flex flex-column">
            <footer className="footer">
                <div>
                <a href="https://binodmagar.com">BinodRana</a>
                <span> copyright &copy; 2020 Expense Manager | All right Reserved</span>
                </div>
                <div className="ml-auto">
                <span>Powered by </span>
                <a href="https://binodmagar.com">BinodM@gar</a>
                </div>
            </footer>
            </div>
        )
    }
}

export default Footers