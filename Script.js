// DOM
const months_name = ["January", "Fedurary", "Murch", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"]
const calendar = document.querySelector('#bot-calendar')

// Leap Year Calculate
isLeapyear = (year) => {
    return (( year % 100 === 0) ? ( year % 400 === 0 ) : ( year % 4 === 0 ));
} 
// 另一個寫法 
// const isLeapYear = year => (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);

// if month is Feduary
getFeduaryDay = (year) => {
    return ( isLeapyear(year) ? 29 : 28 )
} 

// Current time
const currentTime = new Date()
var currentMonth = (months_name[currentTime.getMonth()])
let currentYear = currentTime.getFullYear()
let currentDate = currentTime.getDate()

let first_day = new Date(currentYear, currentMonth, 1)

// Month
month_picker = document.querySelector('#month-display')
month_picker.innerHTML = currentMonth

// Year
year_display = document.querySelector('#year-display')
year_display.innerHTML = currentYear

const previous_year_button = document.querySelector('#year-previous')
previous_year_button.onclick = () => {
    --currentYear
    console.log(currentYear)
    // generateCalender(currentMonth.value, currentYear.value)
}
const next_year_button = document.querySelector('#year-next')
next_year_button.onclick = () => {
    ++currentYear
    console.log(currentYear)
    // generateCalender(currentMonth.value, currentYear.value)
}

// Year, Month get
generateCalender = (months, year) => {
    let calendar_days = calendar.querySelector('#calendar-day')
    //let calendar_year = calendar.querySelector('#year')
    let days_of_month = [31, getFeduaryDay, 31, 30, 31, 30, 31, 31, 30 ,31, 30, 31]
    calendar_days.innerHTML = ''
}

let days_of_month = [31, getFeduaryDay, 31, 30, 31, 30, 31, 31, 30 ,31, 30, 31]

for (let i = 0; i < days_of_month[currentTime.getMonth()]; i++) {
    console.log(i)
}
// Day
    // for (let i = 0; i <= days_of_month[currentMonth] + first_day.getDay() - 1; i++) {
    //     console.log('print1')
    //     let day = document.createElement('div');
    //     if ( i >= first_day.getDay()) {
    //     day.classList.add('calendar-day-hover');
    //     day.innerHTML = i - first_day.getDay() + 1;
    //     day.innerHTML += `<span></span>
    //                         <span></span> 
    //                         <span></span>
    //                         <span></span>`;
    //     if (
    //         i - first_day.getDay() + 1 === currentTime.getDate() &&
    //         year === currentTime.getFullYear() &&
    //         month === currentTime.getMonth()
    //     ) {
    //         day.classList.add('curr-date');
    //     }
    //     }
    // }



function changeMonth(){}

// months list display

month_picker.addEventListener('click', function(e){
    console.log('months_picker work')
 
})

month_picker.onclick = () => {
    month_picker.classList.add('show')
}

months_name.forEach( (e, index) => {
    let month = document.createElement('div')
    // month.querySelector('div').onclick = () => {
    //     month_picker.classList.remove('show')
    //     currentMonth.value = index
    //     //generateCalender(index, currentYear.value)
    // }
    month_picker.appendChild(month)
})