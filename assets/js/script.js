var quoteApi = "https://api.goprogram.ai/inspiration";
var quoteElement = document.getElementById("quote-box");
var calendarContainerEl = document.getElementById("calendar-container");
var dayNamesEl = document.getElementById("day-names");
var dayRowContainerEl = document.getElementById("day-row-container");

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

function getRows() {
    var dayRows = dayRowContainerEl.children
    // gets all rows
    console.log(dayRows);
    // gets the children of the first row

    // get each row
    for (var i = 0; i < dayRows.length; i++) {
        console.log('children of row ' + i)
        // get each day in each row
        getDays(i);
    }
}

function getDays(i) {
    var dayRows = dayRowContainerEl.children
    var row = dayRows[i].children
    console.log('summary' + row)
    // console.log each child of each row
    for (var d = 0; d < row.length; d++) {
        console.log(row[d]);
        row[d].textContent = d + 1
    }
}
// getQuote();
getRows();