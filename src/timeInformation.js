var today = new Date();
var dateInit = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
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
const currentDate = { today:today, day: currentDay, month: currentMonth, year: currentYear, days: monthDays, dayNum: today.getDate(), weekdays: weekday, monthNames: monthNames  };

export const APP_USERS = ['stop', 'Carito', 'Henry'];
var PioneerName = 'stop';
if (localStorage.getItem('PioneerName')) {
    PioneerName = APP_USERS[localStorage.getItem('PioneerName')];
}
export default currentDate;
export const date = dateInit;
export const P_NAME = PioneerName;