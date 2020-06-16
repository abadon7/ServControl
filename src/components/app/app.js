import React, { useState, useEffect } from 'react'
import './app.css'
import HomePage from '../homepage/Homepage'
import Login from '../login/Login'
import Details from '../details/details'
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import firebase from '../firebase/firebaseInit'
import UserContext, {dateContext} from '../app/contextData'
import { render } from 'react-dom'
//const theme = createMuiTheme()

class App extends React.Component {
	constructor(props) {
		super(props);
	
		this.changeUser = () => {
		  this.setState(state => ({
			userid:
			  state.userid === "Henry"
				? "Carito"
				: "Henry",
		  }));
		};
	
		// State also contains the updater function so it will
		// be passed down into the context provider
		this.state = {
		  userid: "Henry",
		  changeUser: this.changeUser,
		  datequery: "Julio/2020"
		};
	  }
	render(){
		return (
			<UserContext.Provider value={this.state}>
				{this.state.userid == "Henry" ?(
					<HomePage></HomePage>
				):(
					<Login></Login>
				)}
			</UserContext.Provider>
			
		);
	}
}

export default App