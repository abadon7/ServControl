import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebaseInit.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import './addinfo.css';

import '../../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../../../node_modules/rc-time-picker/assets/index.css';
import { APP_USERS, P_NAME } from '../../timeInformation.js';
const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
class Addinfo extends React.Component {
    constructor(props) {
        super(props);
        //this.myRef = React.createRef();
        var today = this.props.dateInfo.today;
        var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        /*var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNamesEs = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", " Noviembre", "Diciembre"
        ];
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var currentDay = weekday[today.getDay()];
        var currentMonth = monthNames[today.getMonth()];
        const currentYear = today.getFullYear();
        const monthDays = new Date(today.getDay(), today.getMonth() + 1, 0).getDate();
        const currentDate = { day: currentDay, month: currentMonth, year: currentYear, days: monthDays, dayNum: today.getDate() };
 */
        this.state = {
            publications: "",
            videos: "",
            horas: 0,
            returnvisits: "",
            estudios: "",
            itemsControl: [],
            totalHoras: 0,
            dateInit: date,
            username: localStorage.getItem('PioneerName'),
            dateString: this.props.dateInfo,
            addDate: "",
            startDate: moment(),
            myName: '',
            rrinfotext:''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        
    }
    /*componentWillMount() {
        this.setState({
            isChecked: this.props.isChecked,
            itemIdSw: this.props.itemIdSw
        });
    }*/
    handleChange(date) {
        console.log(date);
        console.log(date._d.getMonth());
        this.setState({
            startDate: date
        });
    }
    handleTimeChange(time) {
        console.log(time && time.format(str));
        this.setState({
            horas: time.format(str)
        });
    }
    getFirebaseInfo() {
        this.setState({
            username: localStorage.getItem('PioneerName'),
        })
    }
    testdate = (e) => {
        console.log(e.target.value);
        let formatDate = moment(e.target.value);
        console.log(formatDate);
        console.log(new Date(e.target.value));
        this.setState({
            startDate: formatDate
        });
    };

    _handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if(e.target.name === 'returnvisits'){
            console.log(`You are addind ${e.target.value} return visits`);
            this.setState({
                rrinfotext: `You are addind ${e.target.value} return visits`
            });
            
        }
    }
    addinfo = (e) => {
        e.preventDefault();
        console.log('Checking info');
        console.time("Info");
        let dateToAdd = this.state.dateInit; // !This line could be useless 
        let customDate = this.state.addDate;
        const addWeekDay = this.state.startDate._d.getDay();
        const addDay = this.state.startDate._d.getDate();
        const addMonth = this.state.startDate._d.getMonth() + 1;
        const addYear = this.state.startDate._d.getFullYear();
        if (customDate !== "") {
            dateToAdd = customDate;
        }
        const item = {
            pubs: this.state.publications,
            vid: this.state.videos,
            horas: this.state.horas,
            rr: this.state.returnvisits,
            est: this.state.estudios,
            date: dateToAdd,
            user: this.state.username,
            month: addMonth,
            year: addYear,
            day: addDay,
            weekday: addWeekDay
        }
        let newState = [];
        newState.push({
            pubs: this.state.publications,
            vid: this.state.videos,
            horas: this.state.horas,
            rr: this.state.returnvisits,
            est: this.state.estudios,
            date: dateToAdd,
            user: this.state.username
        });
        /*  this.setState({
             items: newState
         }); */
        console.log(item);
        const controlref = firebase.database().ref(`control/${this.state.username}/${addYear}/${addMonth}`);
        //controlref.push(item);
        controlref.push(item, function (error) {
            if (error)
                alert("Tuvimos problemnas guardando la información")
            else
                alert('La información se guardó correctamente')
        })
        console.timeEnd("Info")
    }
    render() {
        const { onPress } = this.props;
        return (
            <div className="hours-day">
                <div className="w3-container w3-pink w3-center marging-top-46"><span>Today is {moment().format('LLLL')} </span></div>
                <div className="w3-card-4 add-container marging-bottom-46">
                    <div className="w3-container w3-pink w3-center ">
                        <h6>Agregar Información para {this.state.username}</h6>
                    </div>
                    
                    <form className="w3-container">
                        <p>
                            <label>Fecha</label>
                            <input type="date" className="w3-input" onChange={this.testdate} />
                            {/*<DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                className="w3-input"
                            />*/}
                            {/* <input className="w3-input" required type="date" name="addDate" value={this.state.addDate} onChange={this._handleChange} /> */}
                        </p>
                        <p>
                            <label>Publicaciones</label>
                            <input className="w3-input" type="number" name="publications" value={this.state.publications} placeholder="0" onChange={this._handleChange} />
                        </p>
                        <p>
                            <label>Videos</label>
                            <input className="w3-input" type="number" name="videos" value={this.state.videos} placeholder="0" onChange={this._handleChange} />
                        </p>
                        <p>
                            <label>Horas</label>
                            <TimePicker
                                style={{ width: 100 }}
                                showSecond={false}
                               
                                className="w3-input"
                                onChange={this.handleTimeChange}
                            />,
                            {/* <input className="w3-input" type="time" name="horas" value={this.state.horas} placeholder="0" onChange={this._handleChange} /> */}
                        </p>
                        <p>
                            <label>Revisitas</label>
                            <input className="w3-input" type="number" name="returnvisits" value={this.state.returnvisits} placeholder="0" onChange={this._handleChange} />
                            <label>{this.state.rrinfotext}</label>
                        </p>
                        <p>
                            <label>Estudios</label>
                            <input className="w3-input" type="number" name="estudios" value={this.state.estudios} placeholder="0" onChange={this._handleChange} />
                        </p>
                        <p>
                            <div>
                                <button className="w3-button w3-deep-purple" onClick={this.addinfo}>Agregar</button>
                                <input type="hidden" name="dateInit" value={this.state.dateInit} />
                                <input type="hidden" name="username" defaultValue={this.state.username} />
                            </div>
                        </p>
                    </form>
                </div>
            </div>
        );

    }

}
export default Addinfo;
//React.render(<Switch isChecked={true} />, document.getElementById("page"));
