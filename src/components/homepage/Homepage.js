
 import React, { Component } from 'react';
 import UserContext, {dateContext} from '../app/contextData'
 

 function  Homepage(props) {
	// Assign a contextType to read the current theme context.
	// React will find the closest theme Provider above and use its value.
	// In this example, the current theme is "dark".
		return(
			<UserContext.Consumer>
				{({userid, datequery}) => (
					<div className="w3-section">
						<p>Welcome {userid} in {datequery}</p>
					</div>
				)}
			</UserContext.Consumer>
			
		)
  }
export default Homepage