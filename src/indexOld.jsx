import './app.css';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Addinfo from './components/addinfo/addinfo';
import Details from './components/details/details';
import Returnv from './components/returnv/returnv';
import Header from './components/header/header';
import Switch from './components/switch/switch.js';
import './favicon.ico';
//import firebase from './firebaseInit.js';
import firebase, { auth, provider } from './firebaseInit.js';
import currentDate, { date } from './timeInformation.js';
import './modal.css';
import { Route, NavLink, HashRouter, BrowserRouter } from 'react-router-dom';

class App extends Component {
    constructor() {
        super();
        /* var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(); */
        /* var today = new Date(),
        date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    const currentDate = { day: currentDay, month: currentMonth, year: currentYear, days: monthDays, dayNum: today.getDate() }; */
        this.state = {
            currentItem: '',
            username: '',
            name: '',
            items: [],
            user: null,
            pName: '',
            pCel: '',
            pDir: '',
            pBarrio: '',
            pDesc: '',
            pPub: 0,
            dateInit: date,
            dateBack: '',
            addBox: 'hide',
            editItem: '',
            itemEditID: '',
            dateFullInfo: currentDate
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this); // <-- add this line
        this.logout = this.logout.bind(this);
        this.showAddBox = this.showAddBox.bind(this);
        this.openFormBox = this.openFormBox.bind(this);
        this.closeFormBox = this.closeFormBox.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
        //this.returnToStudy = this.returnToStudy.bind(this);
    }
    componentDidMount() {
        console.log('showing items Did');
        auth.onAuthStateChanged(user => {
            console.log('Loging user');
            if (user) {
                this.setState({
                    user
                });
            }
        });
        /*  const itemsRef = firebase.database().ref('items');
   itemsRef.on('value', (snapshot) => {
       let items = snapshot.val();
       console.log(items);
       let newState = [];
       for (let item in items) {
           newState.push({
               id: item,
               title: items[item].title,
               cel: items[item].pCel,
               dir: items[item].pDir,
               barrio: items[item].pBarrio,
               des: items[item].pDesc,
               user: items[item].user,
               Pub: items[item].pPub,
               dateBack: items[item].dateBack || "",
               dateInit: items[item].dateInit
           });
       }
       this.setState({
           items: newState
       });
   }); */
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    logout() {
        auth.signOut().then(() => {
            this.setState({
                user: null,
                items: []
            });
        });
    }
    login() {
        auth.signInWithPopup(provider).then(result => {
            const user = result.user;
            this.setState({
                user
            });
        });
    }
    showAddBox() {
        if (this.state.addBox === 'hide') {
            this.setState({
                addBox: 'show'
            });
        } else {
            this.setState({
                addBox: 'hide'
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log('Checking form');
        const item = {
            title: this.state.pName,
            pCel: this.state.pCel,
            pDir: this.state.pDir,
            pBarrio: this.state.pBarrio,
            pDesc: this.state.pDesc,
            pPub: this.state.pPub,
            dateBack: this.state.dateBack,
            dateInit: this.state.dateInit,
            user: this.state.user.displayName || this.state.user.email
        };
        if (this.state.editItem === 0) {
            const itemsRef2 = firebase.database().ref('items');
            console.log(item);
            itemsRef2.push(item);
        } else {
            console.log(item);
            console.log('Your editing an item');
            var updates = {};
            updates[`/items/${this.state.itemEditID}`] = item;
            firebase
                .database()
                .ref()
                .update(updates);
        }
        this.cleanStates();
    }
    /*componentWillMount() {
      console.log('showing items1');
      const nameRef = firebase.database().ref().child('object').child('name')
      const Ref2 = firebase.database().ref().child('users')
      window.TestRef = Ref2
      console.log(Ref2)
      nameRef.on('value', (snapshot) => {
          this.setState({
              name: snapshot.val()
          })
      })
  }*/
    updateItem(itemId, itemData) {
        console.log(itemData);
        this.setState({
            currentItem: '',
            username: itemData.user,
            pName: itemData.title,
            title: itemData.title,
            pCel: itemData.cel,
            pDir: itemData.dir,
            pBarrio: itemData.barrio,
            pDesc: itemData.des,
            pPub: itemData.Pub,
            dateBack: itemData.dateBack || '',
            editItem: 1,
            itemEditID: itemId
        });
        this.openFormBox();
        console.log('Editing element');
        //const itemRef = firebase.database().ref(`/items/${itemId}`);
        //updates[`/items/${itemId}`] = movie;
        //console.log(itemRef);
    }
    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
    }
    openFormBox() {
        console.log('clicking in openFormBox');
        window.location = '#modal-one';
        var mainBody = document.getElementById('mainBody');
        mainBody.classList.add('noScroll');
    }
    closeFormBox() {
        var mainBody = document.getElementById('mainBody');
        mainBody.classList.remove('noScroll');
        this.cleanStates();
    }
    cleanStates() {
        this.setState({
            currentItem: '',
            username: '',
            pName: '',
            title: '',
            pCel: '',
            pDir: '',
            pBarrio: '',
            pDesc: '',
            pPub: '',
            dateBack: '',
            editItem: 0,
            itemEditID: ''
        });
        console.log('Form is clean');
    }
    returnToStudy(e) {
        console.log(
            `This return visit ${e.target.value} is a bible study ${
                e.target.checked
            }`
        );
        console.log('Converting return visit in a Bible study');
        /*const node = this.myRef;
  console.log(node);
  this.myRef.current;*/
    }
    forceUpdate(){
        console.log('Calling ForceUpdate');
        console.log(this.refs);
        //this.refs.RefHeader.showText();
        this.refs.details.refs.Details.getFirebaseInfo();
    }
    render() {
        return (
            //<MuiThemeProvider>
            <HashRouter>
                <div className="app">
                    {this.state.user ? (
                        <Header
                            ref="RefHeader"
                            user={1}
                            logOutFn={this.logout}
                            callBack={this.forceUpdate}
                        />
                    ) : (
                        <HashRouter>
                            <Header
                                ref="RefHeader"
                                logIntFn={this.login}
                                callBack={this.forceUpdate}
                            />
                        </HashRouter>
                    )}
                    {/* <button onClick={this.testText}>Test</button> */}
                    <div className="container">
                        {this.state.user ? (
                            <React.Fragment>
                                {/* <Route path="/agregar" component={Addinfo} /> */}
                                {/*  <Route path="/detalles" component={Details} /> */}
                                <Route
                                    path="/agregar"
                                    render={props => (
                                        <Addinfo
                                            {...props}
                                            dateInfo={this.state.dateFullInfo}
                                            ref="Add"
                                        />
                                    )}
                                />
                                <Route
                                    path="/detalles"
                                    render={props => (
                                        <Details
                                            {...props}
                                            dateInfo={this.state.dateFullInfo}
                                            ref="Details"
                                        />
                                    )}
                                    ref="details"
                                />
                                <Route
                                    path="/revisitas"
                                    render={props => (
                                        <Returnv
                                            {...props}
                                            dateInfo={this.state.dateFullInfo}
                                            ref="Returnv"
                                        />
                                    )}
                                />
                                {/* <Addinfo />
                            <Details /> */}
                            {/* <h2>Usa le menú para navegar en la aplicación</h2> */}
                            </React.Fragment>
                        ) : (
                            <div className="w3-section">
                                <button className="w3-button w3-deep-purple w3-margin" onClick={this.login}>Inicia sesión para usar la aplicación</button>
                            </div>
                        )}
                    </div>
                </div>
            </HashRouter>
        );
    }
}
//export default App;
/* ReactDom.render(<App ref={(Details) => { window.Details = Details}} />, document.getElementById('root')) */
ReactDom.render(<App />, document.getElementById('root'));