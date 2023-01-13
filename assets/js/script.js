var quoteApi = "https://api.goprogram.ai/inspiration";
var quoteElement = document.getElementById("quote-box");
var calendarContainerEl = document.getElementById("calendar-container");
var dayNamesEl = document.getElementById("day-names");
var dayRowContainerEl = document.getElementById("day-row-container");
var daysContainer = document.getElementById("days");

var daysInMonth = dayjs().daysInMonth()

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

function makeDays() {
    for (var i = 0; i < daysInMonth; i++) {
        var button = document.createElement('button')
        button.setAttribute('id', 'day-button');
        // button.setAttribute('class', 'col p-5');
        // button.setAttribute('style', 'height: 100%')
        // button.setAttribute('style', 'width: 14%')
        button.textContent = i + 1;
        dayRowContainerEl.appendChild(button);
    }
}

function displayMonth() {
    var dayString = dayjs('2023-09-01').format('dddd MMMM M YYYY').toString()
    daySplit = dayString.split(' ')
    console.log(daySplit[0]);

    if (daySplit[0] == 'Sunday') {
        makeDays()
        return;
    } else if (daySplit[0] == 'Monday') {
        for (var i = 0; i < 1; i++) {
            var button = document.createElement('button');
            dayRowContainerEl.appendChild(button);
        }
    } else if (daySplit[0] == 'Tuesday') {
        for (var i = 0; i < 2; i++) {
            var button = document.createElement('button');
            dayRowContainerEl.appendChild(button);
        }
    } else if (daySplit[0] == 'Wednesday') {
        for (var i = 0; i < 3; i++) {
            var button = document.createElement('button');
            dayRowContainerEl.appendChild(button);
        }
    } else if (daySplit[0] == 'Thursday') {
        for (var i = 0; i < 4; i++) {
            var button = document.createElement('button');
            dayRowContainerEl.appendChild(button);
        }
    } else if (daySplit[0] == 'Friday') {
        for (var i = 0; i < 5; i++) {
            var button = document.createElement('button');
            dayRowContainerEl.appendChild(button);
        }
    } else {
        for (var i = 0; i < 6; i++) {
            var button = document.createElement('button');
            dayRowContainerEl.appendChild(button);
        }
    }
    
    makeDays();

}

// function getRows() {
//     var dayRows = dayRowContainerEl.children
//     // gets all rows
//     console.log(dayRows);
//     // gets the children of the first row

//     // get each row
//     for (var i = 0; i < dayRows.length; i++) {
//         console.log('children of row ' + i)
//         // get each day in each row
//         getDays(i);
//     }
// }

// function getDays(i) {
//     var dayRows = dayRowContainerEl.children
//     var row = dayRows[i].children
//     console.log('summary' + row)
//     // console.log each child of each row
//     for (var d = 0; d < row.length; d++) {
//         console.log(row[d]);
//         var num = 1
//         row[d].textContent = num;
//     }
// }
// getQuote();
// getRows();
displayMonth();