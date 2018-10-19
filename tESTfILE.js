Test Mind

function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    daysum = 0;
    while (date.getMonth() === month) {
        //console.log(date.getDay());
        daysum = daysum + sumDyas[date.getDay()];
        console.log(`${date.getDate()} - ${sumDyas[date.getDay()]} - ${daysum}`)
        days.push({
            day: date.getDate(),
            dayName: ${sumDyas[date.getDay()],
            total: daysum,
        });
        //days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}
testDaysMonth = getDaysInMonth(9, 2018)
sumDyas = [7, 0, 3, 7, 6, 8, 2]
daysum = 0;
testDaysMonth.map((item) => {
    daysum = daysum + sumDyas[item.getDay()];
    console.log(`${item.getDate()} - ${sumDyas[item.getDay()]} - ${daysum}`)
})