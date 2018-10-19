import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebaseInit.js';
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            APP_USERS: '',
            planHours: [0,0,0,0,0,0,0]
        }
        this._handleChangeH = this._handleChangeH.bind(this);
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
    _handleChangeH(e){
        console.log('Setting planning hours');
        let hoursValues = this.state.planHours;
        hoursValues[e.target.name] = e.target.value; 
        this.setState({
            [e.target.planHours]: hoursValues
        });
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
                        <label>Hours for each day</label>
                        <ul className="w3-ul w3-row-padding">
                            <li className="w3-third">
                                <label>Sunday</label>
                                <input className="w3-input" type="number" name="0" value={this.state.planHours[0]} placeholder="0" onChange={this._handleChangeH} />
                            </li>
                            <li className="w3-third">
                                <label>Monday</label>
                                <input className="w3-input" type="number" name="1" value={this.state.planHours[1]} placeholder="0" onChange={this._handleChangeH} />
                            </li>
                            <li className="w3-third">
                                <label>Tuesday</label>
                                <input className="w3-input" type="number" name="2" value={this.state.planHours[2]} placeholder="0" onChange={this._handleChangeH} />
                            </li>
                            <li className="w3-third">
                                <label>Wednesday</label>
                                <input className="w3-input" type="number" name="3" value={this.state.planHours[3]} placeholder="0" onChange={this._handleChangeH} />
                            </li>
                            <li className="w3-third">
                                <label>Thursday</label>
                                <input className="w3-input" type="number" name="4" value={this.state.planHours[4]} placeholder="0" onChange={this._handleChangeH} />
                            </li>
                            <li className="w3-third">
                                <label>Friday</label>
                                <input className="w3-input" type="number" name="5" value={this.state.planHours[5]} placeholder="0" onChange={this._handleChangeH} />
                            </li>
                            <li className="w3-third">
                                <label>Saturday</label>
                                <input className="w3-input" type="number" name="6" value={this.state.planHours[6]} placeholder="0" onChange={this._handleChangeH} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Settings;