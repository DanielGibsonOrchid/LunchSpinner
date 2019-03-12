$(document).ready(function() {
    
    let tableDiv = document.getElementById('tableDiv');
    let buttonDiv = document.getElementById('buttonDiv');
    let fieldDiv = document.getElementById('fieldDiv');

/*****************
Generate Table
*****************/
    tableDiv.innerHTML = `
    <table>
        <thead>
            <th>#</th>
            <th>Lunch Place Name</th>

            </thead>
            <tbody id="tableBody">
            </tbody>
        </table>
    `;
            /*** Optional extra Column Headings:
            <th>Distance from Orchid (in minutes)</th>
            <th>Price Rating (out of 5)</th>
            <th>Orchid's Rating (out of 5)</th> ***/
    
    let tableBody = document.getElementById('tableBody');

/*****************
Fetch Data from Google Sheets using Sheetsu 
*****************/
    function fetchData(url){
        return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.error("Looks like there was a problem", error))
    };

    function checkStatus(response) {
        if(response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        };
    };

    fetchData("https://sheetsu.com/apis/v1.0su/d92ac6635b02")
        .then(data => {
            generateHTMLTable(data);
            randomSelection(data);
    });

/*****************
Generate Table Elements
*****************/
    function generateHTMLTable(data){
        let rows = data.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.place}</td>
            </tr>`    

                /*** Optional Extra Column Data:
                <td>${item.distance}</td>
                <td>${item.price}</td>
                <td>${item.rating}</td> ***/

        ).join('');
        tableBody.innerHTML = rows;
    };

/*****************
Button to randomly select an item
*****************/
    buttonDiv.innerHTML = `
        <button id="button">Random Lunch Picker</button>
    `;
    let button = document.getElementById('button');
    
    fieldDiv.innerHTML = `
        <ul id=field>
        </ul>
    `;
    let field = document.getElementById('field');

    function randomSelection(data){
        button.addEventListener("click", () => {
            let randomNumber = Math.floor(Math.random() * data.length);
            field.innerHTML = data[randomNumber].place;
        });
    };
    
}) //End ready