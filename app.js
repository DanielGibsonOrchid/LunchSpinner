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
Fetch Data from Google Sheets using TableTop.js 
*****************/
    let tabletop = Tabletop.init({ 
        key: 'https://docs.google.com/spreadsheets/d/1oLkyuty7b9fHUxWYUtmuV2v_UZcYR3WsWiSoV3b3BoE/edit?usp=sharing', 
        callback: showData,
        simpleSheet: true 
    })
    function showData(data, tabletop) {
        generateHTMLTable(data);
        randomSelection(data);
    }

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

    // When the button is clicked - Loop through Votes column from the spreadsheet
    // - Count each items number of votes and add it that many times to a new array 'storeItemsWithVotes'
    function randomSelection(data){
        button.addEventListener("click", () => {
            let storeItemsWithVotes = [];
            for (i = 0; i < data.length; i++) {
                if (data[i].votes === '1') {
                    storeItemsWithVotes.push(data[i]);
                } else if (data[i].votes === '2') {
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                } else if (data[i].votes === '3') {
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                } else if (data[i].votes === '4') {
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                } else if (data[i].votes === '5') {
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                    storeItemsWithVotes.push(data[i]);
                } 
            } 
            
            // Random number generator 
            let randomNumber = Math.floor(Math.random() * storeItemsWithVotes.length);
            field.innerHTML = storeItemsWithVotes[randomNumber].place;
            
            //button.disabled = true;
            button.style.backgroundColor = "grey";
        });
    };

    // Mouse Hover effect on button
    button.addEventListener("mouseover", (event) => {
        event.target.style.color = "black";
    });
    button.addEventListener("mouseout", (event) => {
        event.target.style.color = "";
    });

}) // End ready