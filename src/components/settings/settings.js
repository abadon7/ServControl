import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebaseInit.js';
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            APP_USERS: ''
        }
        //const UserContext = React.createContext(['stop', 'Carito', 'Henry']);
    }
    componentDidMount() {
        const userList = ['stop', 'Carito', 'Henry'];
        this.setState({
            APP_USERS: userList
        });
        if (localStorage.getItem('PioneerName')) {
            this.setState({
                username : userList[localStorage.getItem('PioneerName')],
            });
        }
    }
    _handleChange = (e) => {
        /* this.setState({
            [e.target.name]: e.target.value
        }); */
        if (e.target.name === 'myName') {
            localStorage.PioneerName = this.state.APP_USERS[e.target.value];
            this.setState({
                username: this.state.APP_USERS[e.target.value]
            });
            this.props.refresh();
        }
    }
    render() {
        return (
            <div id="id01" className="w3-modal w3-show">
                <div className="w3-modal-content">
                    <header className="w3-container w3-pink">
                        <span onClick={this.props.closefn}
                            className="w3-button w3-display-topright">&times;</span>
                        <h2>Configutation</h2>
                    </header>
                    <div className="w3-container">
                        <p>
                            <label>Select name of pioneer</label>
                            <select className="w3-select" name="myName" onChange={this._handleChange}>
                                <option value="" disabled selected>Choose your Name</option>
                                <option value="1">Carolina</option>
                                <option value="2">Henry</option>
                            </select>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Settings;