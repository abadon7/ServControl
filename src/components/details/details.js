import React, { Component } from "react";
//import './switch.css';
import firebase, { auth, provider } from "../../firebaseInit.js";
class Details extends React.Component {
    constructor(props) {
        super(props);
        //var DB_PATH = '';
        this.state = {
            username: "",
            itemsControl: [],
            totalHoras: 0,
            DB_PATH: "",
            listDaysMonth: ''
        };
        this.getFirebaseInfo = this.getFirebaseInfo.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
    }
    componentDidMount() {
        this.getFirebaseInfo();
        this.setState({
            listDaysMonth: this.getDaysInMonth(this.props.dateInfo.today.getMonth(), this.props.dateInfo.year),
        });

    }
    getFirebaseInfo() {
        const today = this.props.dateInfo.today;
        //const addDay = today._d.getDate();
        const addMonth = today.getMonth() + 1;
        const addYear = today.getFullYear();
        let DB_PATH = `control/${localStorage.getItem("PioneerName")}/${addYear}/${addMonth}`;
        const itemsRef = firebase.database().ref(DB_PATH);
        itemsRef.on('value', snapshot => {
            let items = snapshot.val();
            console.log(items);
            let newState = [];
            let totalHours = 0;
            let hour = 0;
            let minute = 0;
            //let second = 0;
            for (let item in items) {
                newState.push({
                    id: item,
                    pubs: items[item].pubs,
                    vid: items[item].vid,
                    horas: items[item].horas,
                    rr: items[item].rr,
                    est: items[item].est,
                    user: items[item].user,
                    date: items[item].date,
                    day: items[item].day,
                    weekday: items[item].weekday
                });
                let time1 = items[item].horas;
                console.log(time1);
                let splitTime1 = time1.split(':');
                hour = hour + parseInt(splitTime1[0], 10);
                minute = minute + parseInt(splitTime1[1], 10);
                console.log("hour: " + hour);
                console.log("minute: " + minute);
                //hour = hour + minute/60;
                //minute = minute%60;
                //second = parseInt(splitTime1[2]));
                //minute = minute + second/60;
                //second = second%60;
                //console.log((hour+Math.floor(minute/60))+':'+minute%60);
                //alert('sum of above time= '+hour+':'+minute+':'+second);
                //let addHours = parseInt(items[item].horas);
                totalHours =
                    hour + Math.floor(minute / 60) + ":" + (minute % 60); //totalHours + addHours;
                console.log(totalHours);
            }
            this.setState({
                itemsControl: newState,
                totalHoras: totalHours,
                DB_PATH: DB_PATH,
                username: localStorage.getItem("PioneerName")
            });
        });
    }
    removeItem(itemId) {
        const itemRef = firebase
            .database()
            .ref(`${this.state.DB_PATH}/${itemId}`);
        if (confirm("Are you sure you want to delete this item?")) {
            itemRef.remove();
        }
        //itemRef.remove();
    }
    getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
    render() {
        return (
            <div className="info-container">
                <div>
                    <h4>Información de {this.state.username}</h4>
                </div>
                <div>
                    <button className="w3-btn w3-deep-purple">
                        {this.props.dateInfo.month}-{this.props.dateInfo.year}
                    </button>
                </div>
                <div>
                    <p>
                        <span className="w3-tag w3-pink w3-xlarge">
                            Horas Totales: {this.state.totalHoras}
                        </span>
                    </p>
                </div>
                <div className="w3-responsive w3-card-4">
                    {/* <ul className="w3-ul w3-card-4">
            {this.state.itemsControl.map((item) => {
                console.log(item);
                console.log("Showing information");
                return (
                    <li key={item.id} className="w3-bar">
                    <span onclick="this.parentElement.style.display='none'" className="w3-bar-item w3-button w3-white w3-xlarge w3-right">×</span>
                    <span className="w3-bar-item"><strong>Date</strong><br/>{item.date}</span>
                    <div className="w3-bar-item">
                    <span className="w3-large">Hours</span><br />
                    <span>{item.horas}</span>
                    </div>
                    </li>

                    )
                })}
            </ul> */}
                    <table className="data-table w3-table-all w3-hoverable">
                        <thead>
                            <tr className="w3-pink">
                                <th>Day</th>
                                <th>P</th>
                                <th>V</th>
                                <th>H</th>
                                <th>R</th>
                                <th>E</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {this.state.itemsControl.map(item => {
                            console.log(item);
                            console.log("Showing information");
                            return (
                                <tbody key={item.id}>
                                    <tr>
                                        <td>
                                            {item.day}
                                            {this.props.dateInfo.weekdays[item.weekday]}
                                        </td>
                                        <td>{item.pubs}</td>
                                        <td>{item.vid}</td>
                                        <td>{item.horas}</td>
                                        <td>{item.rr}</td>
                                        <td>{item.est}</td>
                                        <td>
                                            <a className="w3-button no-padding">
                                                <i className="fa fa-edit" />
                                            </a>
                                            <a
                                                className="w3-button no-padding"
                                                /* onClick={() => { if (confirm('Are you sure you want to delete this item?')) { this.removeItem(item.id) }; }} */ onClick={() =>
                                                    this.removeItem(item.id)
                                                }
                                            >
                                                <i className="fa fa-trash-alt" />
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            </div>
        );
    }
}

export default Details;
