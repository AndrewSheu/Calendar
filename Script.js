// DOM
const months_name = ["January", "Fedurary", "Murch", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"]

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"]

// show css
const calendar = document.querySelector('#calendar')

// Leap Year Calculate
isLeapyear = (year) => {
    return (( year % 100 === 0) ? ( year % 400 === 0 ) : ( year % 4 === 0 ))
} 
// 另一個寫法 
// const isLeapYear = year => (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);

// if month is Feduary
getFeduaryDay = (year) => {
    return isLeapyear(year) ? 29 : 28
} 

let month_list = document.querySelector('.monthslist')

months_name.forEach((e, index) => {

    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

month_picker = document.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

// Year, Month get
generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('#calendar-days')
    let calendar_year = document.querySelector('#year-display')
    
    let days_of_month = [31, getFeduaryDay(year), 31, 30, 31, 30, 31, 31, 30 ,31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()

    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    month_picker.innerHTML = months_name[month]
    calendar_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    // the loop will create the day space for every month, it will count the month of the days and the start day is which day 
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

        let day = document.createElement('div')

        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1 // add the day number

            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr_date') // add today date the class='curr'date'
            }
        }
        calendar_days.appendChild(day)
    }
}

let currDate = new Date()

let event_date = document.querySelector('#event-date')
event_date.innerHTML =`${weekdays[currDate.getDay()]}  ` + `${currDate.getDate()} ` + `${months_name[currDate.getMonth()]} ` + `${currDate.getFullYear()} `

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#today_button').onclick = () => {
    let currDate = new Date()

    let curr_month = { value: currDate.getMonth() }
    let curr_year = { value: currDate.getFullYear() }

    generateCalendar(curr_month.value, curr_year.value)
}

// Create Event

