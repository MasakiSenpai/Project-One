var quoteApi = "https://api.goprogram.ai/inspiration";
var quoteElement = document.getElementById("quote-box");
var calendarContainerEl = document.getElementById("calendar-container");
var dayNamesEl = document.getElementById("day-names");
var dayRowContainerEl = document.getElementById("day-row-container");
var daysContainer = document.getElementById("days");
var currentMonth = document.getElementById('month')

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
        var day = (daysInPrevMonth - x);
        button.textContent = day;
        dayRowContainerEl.appendChild(button);
    }

    // make days of current month
    for (var y = 0; y < daysInCurrentMonth; y++) {
        var button = document.createElement('button');
        button.textContent = y + 1;
        dayRowContainerEl.appendChild(button);
    }

    // make days of next month
    for (var z = 1; z <= 7- nextMonthFirstDay; z++) {
        var button = document.createElement('button');
        button.setAttribute('class', 'text-secondary');
        button.textContent = z;
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
    
}

getQuote();
makeDays();
getLocation();