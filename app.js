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
            <th>Lunch Place Name</th>
            <th>Number of Votes</th>
            </thead>
            <tbody id="tableBody">
            </tbody>
        </table>
    `;
    
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
                <td>${item.place}</td>
                <td>${item.votes}</td>
            </tr>    
        `).join('');
        tableBody.innerHTML = rows;
    };

/*****************
Button to randomly select an item
*****************/
    buttonDiv.innerHTML = `
        <button id="button">Random Pick</button>
    `;
    let button = document.getElementById('button');
    
    let field = document.getElementById('fieldDiv');

    function randomSelection(data){
        button.addEventListener("click", () => {
            let randomNumber = Math.floor(Math.random() * data.length);
            field.innerHTML = data[randomNumber].place;
        });
    };

    //Mouse Hover effect on button
    button.addEventListener("mouseover", (event) => {
        event.target.style.color = "black";
    });
    button.addEventListener("mouseout", (event) => {
        event.target.style.color = "";
    });
    
}) //End ready