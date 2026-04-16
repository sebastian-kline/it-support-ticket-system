const form = document.getElementById("ticketForm"); // Grabs ticket form

const loadTicketsBtn = document.getElementById("loadTicketsBtn"); // Grabs load tickets button
const ticketList = document.getElementById("ticketList"); // Grabs the ticket list div

const submitBtn = document.getElementById("submitBtn"); // Grabs the submit button - used for switching text if in edit mode
const formTitle = document.getElementById("formTitle"); // Grabs the form title - used for switching text if in edit mode

let editingTicketId = null; // Used for edit logic

form.addEventListener("submit", function (event) { // Listens for form submission
    event.preventDefault(); // Stops page refresh

    // Get the value of each parameter
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const submittedBy = document.getElementById("submittedBy").value;
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;

    // Puts the data into JSON format for app to read and turn into object
    const ticket = {
      title: title,
      description: description,
      submittedBy: submittedBy,
      status: status,
      priority: priority
    };

    let url = "/tickets"; // Sets URL to default POST
    let method = "POST"; // Sets method to POST
    if(editingTicketId !== null) { // If in edit...
        url = `/tickets/${editingTicketId}`; // Sets URL to edit selected ticket
        method = "PUT"; // Sets method to PUT to allow edit of selected ticket
    }

    submitBtn.disabled = true;

    fetch(url, { // Calls backend
        method: method, // Create data
        headers: {
            "Content-Type": "application/json" // Lets program know the body is JSON
        },
        body: JSON.stringify(ticket) // turn JS object into JSON text
        })
        .then(response => {
            // Checks if request was successful
            if (!response.ok) {
                throw new Error("Failed Request");
            }
            return response.json(); // When the response comes back -> convert it to JSON
        })
        .then(data => {
            submitBtn.disabled = false; // Re-enable button after successful request
            console.log("Saved ticket:", data);
            form.reset();
            editingTicketId = null; // Sets back to non-edit form
            submitBtn.textContent = "Create Ticket"; // Sets submit button back to Create Ticket after editing
            formTitle.textContent = "Create Ticket"; // Sets form title back to Create Ticket after editing
            loadTickets();
        })
        .catch(error => {
            console.error(error); // Logs error in console
            alert("Something went wrong");
            submitBtn.disabled = false; // Re-enable button if request fails
    });

    console.log("form submitted"); // Proves submit works
});

loadTicketsBtn.addEventListener("click", loadTickets);

loadTickets(); // Loads previous tickets on script load

// ----- FUNCTIONS -----

// Bring in tickets function
function loadTickets() {
    fetch("/tickets")
        .then(response => response.json())
        .then(data => {
            ticketList.innerHTML = ""; // Resets div to prevent the same ticket appearing every time tickets are loaded in
            data.forEach(function (ticket) { // For each ticket in DB...
                const ticketDiv = document.createElement("div"); // Creates a div element -> where the tickets will be held

                ticketDiv.classList.add("ticket"); // Every ticket needs its own style box - each ticketDiv gets this class

                // Backticks allow multi-line strings - ${} is for inserting values into the string
                ticketDiv.innerHTML = `
                    <h3>${ticket.title}</h3>
                    <p>${ticket.description}</p>
                    <small>
                        Submitted by: ${ticket.submittedBy} <br>
                        Created on: ${new Date(ticket.createdDate).toLocaleString()}
                    </small>
                    <div class="ticket-footer">
                        <div class="left">
                            <span class="status ${ticket.status}">${ticket.status.split("_").join(" ")}</span>
                            <span class="priority ${ticket.priority}">${ticket.priority}</span>
                        </div>
                    
                        <div class="right">
                            <button class="delete-btn" data-id="${ticket.id}">Delete</button>
                            <button class="edit-btn" data-id="${ticket.id}">Edit</button>
                        </div>
                    </div>
               `;

                ticketList.appendChild(ticketDiv);

                // Delete ticket logic
                const deleteBtn = ticketDiv.querySelector(".delete-btn");

                deleteBtn.addEventListener("click", function() {
                   const ticketId = deleteBtn.dataset.id;

                   //Delete confirmation
                   if(confirm("Are you sure you want to delete this ticket?")) {
                       fetch(`/tickets/${ticket.id}`, {
                           method: "DELETE"
                       })
                           .then(() => {
                               loadTickets();
                       });
                   }
                });

                // Edit button logic
                const editButton = ticketDiv.querySelector(".edit-btn");

                // Get all values for the ticket that is being edited
                editButton.addEventListener("click", function () {
                    document.getElementById("title").value = ticket.title;
                    document.getElementById("description").value = ticket.description;
                    document.getElementById("submittedBy").value = ticket.submittedBy;
                    document.getElementById("status").value = ticket.status;
                    document.getElementById("priority").value = ticket.priority;

                    editingTicketId = ticket.id;
                    submitBtn.textContent = "Update Ticket"; // When the form is in edit mode, the Submit Button text changes to "Update Ticket"
                    formTitle.textContent = "Update Ticket"; //When the form is in edit mode, the Title text changes to "Update Ticket"

                });

            });
        });
}