// Get references to the buttons and form containers
const showLoginButton = document.getElementById("login-btn");
const showRegisterButton = document.getElementById("register-btn");
const showLoginLink = document.getElementById("login-link");
const showRegisterLink = document.getElementById("register-link");
const login_Container = document.getElementById("login-container");
const register_Container = document.getElementById("register-container");
const ticket_Container = document.getElementById("ticket-container");
const close_form = document.getElementById("close-btn");
const close_form2 = document.getElementById("close-btn2");
const close_form3 = document.getElementById("close-btn3");
const FirstSelectionList = document.getElementById("Branch-selector");
const SecondSelectionList = document.getElementById("Hall-selector");
const bookbutton = document.getElementById("book_button");
// Function to fetch branches from the API and populate the select list
function fetchAndPopulateBranches() {
  fetch("http://localhost:3000/api/Branches")
    .then((response) => response.json()) // Parse the JSON response
    .then((branches) => {
      const selectElement = document.getElementById("Branch-selector");
      selectElement.innerHTML = ""; // Clear previous options
      branches.forEach((branch) => {
        const option = document.createElement("option");
        option.value = branch;
        option.textContent = branch;
        selectElement.appendChild(option);
      });
      selectElement.value = "Bengaluru";
    })
    .catch((error) => {
      console.error("Error fetching branches:", error); // Handle any errors
    });
}
function toggleForm(formToShow) {
  login_Container.style.display = "none";
  register_Container.style.display = "none";
  document.getElementById("darkener").style.display = "block";
  formToShow.style.display = "block";
}
function fetchHalls(branchId) {
  fetch(`http://localhost:3000/api/Branches/${branchId}/list_of_halls`)
    .then((response) => response.json())
    .then((names_of_halls) => {
      const selectElement = document.getElementById("Hall-selector");
      selectElement.innerHTML = ""; // Clear previous options
      names_of_halls.forEach((name_of_hall) => {
        const option = document.createElement("option");
        option.value = name_of_hall;
        option.textContent = name_of_hall;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching halls:", error);
    });
}
function fetchGmapLink(branchId) {
  fetch(`http://localhost:3000/api/Branches/${branchId}/gmap_link`)
    .then((response) => response.json())
    .then((gmap_link) => {
      const list = document.getElementById("gmap-info");
      list.innerHTML = ""; // Clear previous content
      const link = document.createElement("a");
      link.href = gmap_link;
      link.textContent = "Click for Directions to " + branchId + " Campus";
      list.appendChild(link);
    })
    .catch((error) => {
      console.error("Error fetching Google Maps link:", error);
    });
}
function fetchHallInfo(branchId, hallName) {
  fetch(`http://localhost:3000/api/Branches/${branchId}/${hallName}/hall_info`)
    .then((response) => response.json())
    .then((hall_attributes) => {
      const list = document.getElementById("Hall-info");
      list.innerHTML = ""; // Clear previous content
      const hall_name = document.createElement("li");
      const capacity = document.createElement("li");
      const AC = document.createElement("li");
      hall_name.innerHTML = `<b>Name of the Hall: </b><br>${hallName}`;
      capacity.innerHTML = `<b>Seating Capacity: </b><br>${hall_attributes["Capacity"]}`;
      AC.innerHTML = `<b>Air Conditoning: </b><br>${hall_attributes["AC?"]}`;
      list.appendChild(hall_name);
      list.appendChild(document.createElement("br"));
      list.appendChild(capacity);
      list.appendChild(document.createElement("br"));
      list.appendChild(AC);
    })
    .catch((error) => {
      console.error("Error fetching hall info:", error);
    });
}
async function fetchHallInfo_of_FirstHall(selectedBranch) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/Branches/${selectedBranch}/first_hall`
    );
    const firstHall = await response.json(); // Get the string (first hall)
    fetchHallInfo(selectedBranch, firstHall);
  } catch (error) {
    console.error("Error fetching halls:", error);
  }
}

// Event listeners to show forms when buttons or links are clicked
[showLoginButton, showLoginLink].forEach((button) => {
  button.addEventListener("click", () => toggleForm(login_Container));
});
[showRegisterButton, showRegisterLink].forEach((button) => {
  button.addEventListener("click", () => toggleForm(register_Container));
});
[close_form, close_form2, close_form3].forEach((button) => {
  button.addEventListener("click", function () {
    login_Container.style.display = "none";
    register_Container.style.display = "none";
    document.getElementById("darkener").style.display = "none";
  });
});
bookbutton.addEventListener("click", function () {
  const ticket = document.getElementById("ticket-container");
  document.getElementById("darkener").style.display = "block";
  ticket.style.display = "block";
  const ticket_info = document.getElementById("Ticket-info-final");
  ticket_info.innerHTML = ""; // Clear previous content
  const hall_name = document.createElement("li");
  const capacity = document.createElement("li");
  const AC = document.createElement("li");
  const DATE = document.createElement("li");
  const TIME_RANGE = document.createElement("li");
  const hallInfoList = document.getElementById("Hall-info");
  hall_name.innerHTML = `<br><b>Name of the Hall: </b><br>${hallInfoList.children[0].textContent.replace('Name of the Hall: ', '').trim()}`;
  capacity.innerHTML = `<b>Seating Capacity: </b> ${hallInfoList.children[2].textContent.replace('Seating Capacity: ', '').trim()}`;
  AC.innerHTML = `<b>Air Conditoning Available?: </b> ${hallInfoList.children[4].textContent.replace('Air Conditoning: ', '').trim()}`;
  DATE.innerHTML = `<b>Selected Date: </b>${document.getElementById("datepicker").value}`;
  TIME_RANGE.innerHTML = `<b>Selected Time: </b>${document.getElementById("starttimepicker").value} - ${document.getElementById("endtimepicker").value}`;
  ticket_info.appendChild(hall_name);
  ticket_info.appendChild(document.createElement("br"));
  ticket_info.appendChild(capacity);
  ticket_info.appendChild(document.createElement("br"));
  ticket_info.appendChild(AC);
  ticket_info.appendChild(document.createElement("br"));
  ticket_info.appendChild(DATE);
  ticket_info.appendChild(document.createElement("br"));
  ticket_info.appendChild(TIME_RANGE);
});
FirstSelectionList.addEventListener("change", function () {
  const selectedBranch = FirstSelectionList.value;
  const SecondSelector_Hall = SecondSelectionList.value;
  fetchHalls(selectedBranch); // Fetch list of halls
  fetchGmapLink(selectedBranch); // Fetch Google Maps link
  fetchHallInfo_of_FirstHall(selectedBranch);
});

SecondSelectionList.addEventListener("change", function () {
  const selectedBranch = FirstSelectionList.value;
  const selectedHall = SecondSelectionList.value;
  fetchHallInfo(selectedBranch, selectedHall); // Fetch hall information
});

fetchAndPopulateBranches();
fetchHalls("Bengaluru");
fetchGmapLink("Bengaluru");
fetchHallInfo("Bengaluru", "Amriteswari Hall");

flatpickr("#datepicker", {
  dateFormat: "Y-m-d",
  minDate: "today", // Disable past dates
  defaultDate: "today",
  // inline: true,
});

flatpickr("#starttimepicker", {
  enableTime: true, // Enable time picker
  noCalendar: true, // Disable date calendar
  dateFormat: "H:i", // Time format (24-hour)
  time_24hr: true, // 24-hour format
  minuteIncrement: 15, // Select minutes in 15-minute intervals
  defaultDate: new Date(),
});
flatpickr("#endtimepicker", {
  enableTime: true, // Enable time picker
  noCalendar: true, // Disable date calendar
  dateFormat: "H:i", // Time format (24-hour)
  time_24hr: true, // 24-hour format
  minuteIncrement: 15, // Select minutes in 15-minute intervals
  minTime: document.getElementById("starttimepicker").value,
  defaultDate: "16:30",
});
