var quoteApi = "https://api.goprogram.ai/inspiration";
var quoteElement = document.getElementById("quote-box");
var calendarContainerEl = document.getElementById("calendar-container");
var dayNamesEl = document.getElementById("day-names");
var dayRowContainerEl = document.getElementById("day-row-container");
var daysContainer = document.getElementById("days");
var currentMonth = document.getElementById('month')
var navText = document.getElementById('navText');
var daysInCurrentMonth = dayjs().daysInMonth(); //returns number of days in current month
var currentMonthFirstDay = dayjs().startOf('month').get('d'); //returns day of week as index

var daysInPrevMonth = dayjs().startOf('month').subtract(1, 'month').daysInMonth(); // returns number of days in previous month

var daysInNextMonth = dayjs().startOf('month').add(1, 'month').daysInMonth(); // returns number of days in next month
var nextMonthFirstDay = dayjs().startOf('month').add(1, 'month').get('d'); //returns day of week as index

// console.log(nextMonthFirstDay)

function getQuote() {
    fetch(quoteApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            var author = data.author;
            var quote = data.quote;
            var authorEl = document.createElement("p");
            var quoteEl = document.createElement("p");


            authorEl.textContent = author;
            quoteEl.textContent = quote;
            quoteElement.appendChild(quoteEl);
            quoteElement.appendChild(authorEl);
        })
}

// makes elements based on the number of days in the current month
function makeDays() {
    // dipslays current month
    currentMonth.textContent = dayjs().format('MMMM');

    // make days of previous month
    for (var x = currentMonthFirstDay; x > 0; x--) {
        var button = document.createElement('button');
        button.setAttribute('class', 'text-secondary');
        var year = dayjs().subtract(1, "month").format("YYYY");
        var month = dayjs().subtract(1, "month").format("MM");
        var day = (daysInPrevMonth - x);
        var date = year + "-" + month + "-" + day;
        button.setAttribute("data-date", date);
        button.textContent = day;
        dayRowContainerEl.appendChild(button);
    }

    // make days of current month
    for (var y = 0; y < daysInCurrentMonth; y++) {
        var button = document.createElement('button');
        var year = dayjs().format("YYYY");
        var month = dayjs().format("MM");
        var day = y + 1;
        var dayString = "0" + day.toString();
        var date = year + "-" + month + "-" + dayString.slice(-2);
        button.setAttribute("data-date", date);
        button.textContent = y + 1;
        dayRowContainerEl.appendChild(button);
    }

    // make days of next month
    for (var z = 1; z <= 7 - nextMonthFirstDay; z++) {
        var button = document.createElement('button');
        var year = dayjs().add(1, "month").format("YYYY");
        var month = dayjs().add(1, "month").format("MM");
        button.setAttribute('class', 'text-secondary');
        button.textContent = z;
        var dayString = "0" + z.toString();
        var date = year + "-" + month + "-" + dayString.slice(-2);
        button.setAttribute("data-date", date);
        dayRowContainerEl.appendChild(button);
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
        " Longitude: " + position.coords.longitude);
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    getWeather(lat, long);
}

function getWeather(lat, long) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=1ff1b9e8930bbe84b844222ea3d5a398&units=imperial'
    fetch(url).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data);
        var location = data.name;
        var high = data.main.temp_max;
        var low = data.main.temp_min;
        var icon = data.weather[0].icon;
        // console.log(icon);
        var navWeather = document.createElement('div');
        navWeather.textContent = location + ' ' + high + '°F' + ' / ' + low + '°F';
        var img = document.createElement('img');
        img.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '@2x.png')
        // img.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png')
        img.setAttribute('style', 'width: 20%')
        navText.appendChild(navWeather);
        navText.appendChild(img);

    })
}

getQuote();
makeDays();
getLocation();

function addEventPopup(event) {
    var date = event.target.getAttribute("data-date");
    console.log(date);
    document.getElementById("startDate").removeAttribute("value");
    document.getElementById("startDate").setAttribute("value", date);
    var showPopup = document.getElementById("addEvent");
    if (showPopup.style.visibility == 'hidden') {
        showPopup.style.visibility = 'visible';
    } else {
        showPopup.style.visibility = 'hidden';
    }

}

function cancelEvent() {
    var hidePopup = document.getElementById("addEvent");
    hidePopup.style.visibility = 'hidden';

}

function createEvent() {

}

dayRowContainerEl.addEventListener("dblclick", addEventPopup);