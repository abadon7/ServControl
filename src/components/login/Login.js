
 import React, { Component } from 'react';
 import UserContext, {dateContext} from '../app/contextData'
 

 function  Login(props) {
	// Assign a contextType to read the current theme context.
	// React will find the closest theme Provider above and use its value.
	// In this example, the current theme is "dark".
		return(
			<UserContext.Consumer>
				{({userid, changeUser}) => (
					<div className="w3-section">
						<button
						onClick={changeUser}
						style={{backgroundColor: userid}}>
							Toggle Theme {userid}
						</button>
						{userid == "Henry" ?(
							<button className="w3-button w3-deep-purple w3-margin" onClick={console.log(userid)}>Welcome</button>
						):(
							<button className="w3-button w3-deep-purple w3-margin" onClick={console.log(userid)}>Inicia sesión para usar la aplicación</button>
						)}
						
					</div>
				)}
			</UserContext.Consumer>
			
		)
  }
export default Login