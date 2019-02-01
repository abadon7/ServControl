Test Mind

function getDaysInMonth(month, year, data) {
    let date = new Date(year, month, 1);
    let totalHours = [];
    let daysum = 0;
    while (date.getMonth() === month) {
        //console.log(date.getDay());
        daysum = daysum + data[date.getDay()];
        console.log(`${date.getDate()} - ${data[date.getDay()]} - ${daysum}`)
        totalHours.push({
            day: date.getDate(),
            weekday: date.getDay(),
            total: daysum,
        });
        //days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return totalHours;
}
testDaysMonth = getDaysInMonth(9, 2018)
sumDyas = [7, 0, 3, 7, 6, 8, 2]
daysum = 0;
testDaysMonth.map((item) => {
    daysum = daysum + sumDyas[item.getDay()];
    console.log(`${item.getDate()} - ${sumDyas[item.getDay()]} - ${daysum}`)
})

// Function to sort data time
temp1.sort(function (a, b) {
console.log(a);
console.log(b);
  if (a.day > b.day) {
    return 1;
  }
  if (a.day < b.day) {
    return -1;
  }
  // a must be equal to b
  return 0;
});