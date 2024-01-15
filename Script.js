// DOM
const months_name = ["January", "Fedurary", "Murch", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"]

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"]

var gobal_selectDate;

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
    localStorage.clear()
    let calendar_days = document.querySelector('#calendar-days')
    let calendar_year = document.querySelector('#year-display')
    let event_date = document.querySelector('#event-date')

    let days_of_month = [31, getFeduaryDay(year), 31, 30, 31, 30, 31, 31, 30 ,31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()

    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    month_picker.innerHTML = months_name[month]
    calendar_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    let today_display = `${weekdays[first_day.getDay()]} ${currDate.getDate()} ${months_name[month]} ${year}`

    event_date.innerHTML = today_display

    gobal_selectDate = today_display

    // the loop will create the day space for every month, it will count the month of the days and the start day is which day 
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

        let day = document.createElement('div')

        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1 // add the day number

            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr_date') // add today date the class='curr'date'
            }

            day.addEventListener('click', function () {
                // 清除之前選擇的日期的樣式
                document.querySelectorAll('.selected-date').forEach(element => {
                    element.classList.remove('selected-date');
                });
    
                // 添加選擇日期的樣式
                this.classList.add('selected-date');
    
                // 在這裡你可以執行其他相關的操作，例如顯示所選日期

                let select_date = `${weekdays[first_day.getDay()]} ${i - first_day.getDay() + 1} ${months_name[month]} ${year}`

                gobal_selectDate = select_date

                event_date.innerHTML = select_date

            });
        }
        calendar_days.appendChild(day)
    }
    EventList()
}



function EventList(){
    // Create Event List
    updateList()
    var text_input = document.querySelector('#text')
    var add_input = document.querySelector('#add')
    var list_ul = document.querySelector('.eventlist')

    var dataBase = JSON.parse(localStorage.getItem(gobal_selectDate)) || []

    text_input.addEventListener('keyup', function(event) {
        if (event.key === "Enter"){
            addData()
        }
    });
    add_input.addEventListener('click', addData)
    list_ul.addEventListener('click', deleteData)

    function addData() {
        var txt = text_input.value

        if (txt.trim() === ""){
            alert('need to type some!')
            return;
        }

        var todo = {
            content: txt
        }

        dataBase.push(todo)

        localStorage.setItem(gobal_selectDate, JSON.stringify(dataBase))

        text_input.value = ''
        updateList()

    }

    function deleteData(e){
        e.preventDefault();
        if (e.target.nodeName !== 'A'){return;};

        var num = e.target.dataset.num;
        dataBase.splice(num, 1);

        localStorage.setItem(gobal_selectDate, JSON.stringify(dataBase));
        updateList();

    }

    function updateList(){
        // let list = ''
        // for (let i = 0; i < dataBase.length; i++) {
        //     list += '<li><a href="#" data-num='+ i +'>Del </a>' + dataBase[i].content +'</li>'
        // }
        // list_ul.innerHTML = list

        function isKeyInLocalStorage(gobal_selectDate) {
            if( localStorage.getItem(gobal_selectDate) !== null ){
                return false;
            }
            else{
                
            }
        }
        

        for (let i = 0; i < localStorage.length; i++) {
            if (gobal_selectDate === localStorage.key(i)){
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                let list = ''

                for (let i = 0; i < parsedValue.length; i++) {
                    list += '<li><a href="#" data-num='+ i +'>Del </a>' + parsedValue[i].content +'</li>'
                }
                list_ul.innerHTML = list
            }
        }
        // for (let i = 0; i < localStorage.length; i++) {
        //     const key = localStorage.key(i);
        //     const value = localStorage.getItem(key);
        
        //     console.log(`Key: ${key}, Value: ${value}`);
        // }
    }
}

let currDate = new Date()

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