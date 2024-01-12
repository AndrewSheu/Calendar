// DOM
const months = ["January", "Fedurary", "Murch", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"]
const calendar = document.querySelector('#bot-calendar')

// Eventlistener

/// Function

// Leap Year Calculate
isLeapyear = (year) => {
    return (( year % 100 === 0) ? ( year % 400 === 0 ) : ( year % 4 === 0 ));
} // 另一個寫法 
// const isLeapYear = year => (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);

// if month is Feduary
getFeduaryDay = (year) => {
    return ( isLeapyear(year) ? 29 : 28 )
}

// Year, Month get
generateCalender = (months, year) => {
    let calendar_days = calendar.querySelector('#calendar-day')
    let calendar_year = calendar.querySelector('#year')
    let days_of_month = [31, getFeduaryDay, 31, 30, 31, 30, 31, 31, 30 ,31, 30, 31]
    calendar_days.innerHTML = ''
}