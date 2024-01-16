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

localStorage.clear()

// Year, Month get
generateCalendar = (month, year) => {
    // localStorage.clear()
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
                EventList()

            });
        }
        calendar_days.appendChild(day)
    }
}



function EventList(){
    // Create Event List
    var text_input = document.querySelector('#text')
    var add_input = document.querySelector('#add')
    var list_ul = document.querySelector('#eventlist')

    var dataBase = JSON.parse(localStorage.getItem(gobal_selectDate)) || []
    var addtext = []


    text_input.addEventListener('keyup', function(event) {
        if (event.key === "Enter"){
            addData()
        }
    });
    add_input.addEventListener('click', addData)
    list_ul.addEventListener('click', deleteData)

    updateList()


    function addData() {
        if (localStorage.getItem(gobal_selectDate) !== null){
            const previousList = JSON.parse(localStorage.getItem(gobal_selectDate))
            console.log(previousList)
            for (let i = 0; i < previousList.length; i++) {
                var toaddprevious = {
                    content: previousList[i].content
                }
                addtext.push(toaddprevious)
                console.log(toaddprevious)
            }
        }
        
        console.log(addtext)
        var txt = text_input.value

        if (txt.trim() === ""){
            console.log('alert')
            //alert('need to type some!')
            return;
        }

        var todo = {
            content: txt
        }

        addtext.push(todo)
        console.log(addData)

        localStorage.setItem(gobal_selectDate, JSON.stringify(addtext))
        console.log(addtext)

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

        console.log(gobal_selectDate)
        if (isKeyInLocalStorage(gobal_selectDate)){}
    }

    function isKeyInLocalStorage(key) {
        let list = ''
        console.log(key)
        const storedData = localStorage.getItem(key)
        console.log(storedData)
        if(storedData === null ){
            list_ul.innerHTML = '' // clear the list
            return false;
        }
        else{
            // console.log(storedData)
            const value = JSON.parse(storedData)
            console.log(value)

            for (let i = 0; i < value.length; i++) {
                list += '<li><a href="#" data-num='+ i +'>Del </a>' + value[i].content +'</li>'
            }
            console.log(list)
            list_ul.innerHTML = list
            return true;
        }
    }

    // for (let i = 0; i < localStorage.length; i++) {
    //     const key = localStorage.key(i);
    //     const value = localStorage.getItem(key);
    
    //     console.log(`Key: ${key}, Value: ${value}`);
    // }
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