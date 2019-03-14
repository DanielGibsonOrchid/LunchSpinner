$(document).ready(function() {
    
    let buttonDiv = document.getElementById('buttonDiv');
    let field = document.getElementById('fieldDiv');
    let hasVotes = false;

/*****************
Fetch Data from Google Sheets using TableTop.js 
*****************/
    let tabletop = Tabletop.init({ 
        key: 'https://docs.google.com/spreadsheets/d/1oLkyuty7b9fHUxWYUtmuV2v_UZcYR3WsWiSoV3b3BoE/edit?usp=sharing', 
        callback: showData,
        simpleSheet: true 
    });
    function showData(data, tabletop) {
        generateHTMLTable(data);
        randomSelection(data);
    };

/*****************
Button to randomly select an item
*****************/
    buttonDiv.innerHTML = `
        <button id="button">Random Pick</button>
    `;
    let button = document.getElementById('button');

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
                } else {
                    field.innerHTML = ("Ahhh... you first must vote on a lunch place")
                }
            } 
            
            // Random number generator 
            if (storeItemsWithVotes.length !== 0) {
                let randomNumber = Math.floor(Math.random() * storeItemsWithVotes.length);
                field.innerHTML = storeItemsWithVotes[randomNumber].place;
                
                // Style Button on click
                //button.disabled = true;
                button.style.backgroundColor = "grey";
                
                // Style output field on click
                field.style.backgroundColor = "rgb(255, 99, 71, 0.75)"; //Green with transparency 
            }
        });
    };

    // Mouse Hover effect on button
    button.addEventListener("mouseover", (event) => {
        event.target.style.color = "black";
    });
    button.addEventListener("mouseout", (event) => {
        event.target.style.color = "";
    });

    /*****************
    Generate Table if there are votes
    *****************/
    function generateHTMLTable(data) {
        for (i = 0; i < data.length; i++) {
            if (data[i].votes !== '0') {
                hasVotes = true;
            }
        }

        // If at least one place has a vote then generate a table 
        if (hasVotes) {
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
            
            // Loop to check add place name to table div if it has any votes
            for (i = 0; i < data.length; i++) {
                if (data[i].votes !== '0') {
                    tableBody.innerHTML += `
                    <tr>
                        <td>${data[i].place}</td>
                        <td>${data[i].votes}</td>
                    </tr>
                    `;
                }; 
            }; 
        }; 
    }; 
}); // End ready