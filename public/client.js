// Get references to the buttons and form containers
const showLoginButton = document.getElementById("login-btn");
const showRegisterButton = document.getElementById("register-btn");
const showLoginLink = document.getElementById("login-link");
const showRegisterLink = document.getElementById("register-link");
const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
const close_form = document.getElementById("close-btn");
const close_form2 = document.getElementById("close-btn2");
const FirstSelectionList = document.getElementById("Branch-selector");
const SecondSelectionList = document.getElementById("Hall-selector");

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
      selectElement.value='Bengaluru';
    })
    .catch((error) => {
      console.error("Error fetching branches:", error); // Handle any errors
    });
}
function toggleForm(formToShow) {
  loginContainer.style.display = "none";
  registerContainer.style.display = "none";
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
      link.textContent = "Click for Directions to Campus";
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
    const response = await fetch(`http://localhost:3000/api/Branches/${selectedBranch}/first_hall`);
    const firstHall = await response.json(); // Get the string (first hall)
    fetchHallInfo(selectedBranch,firstHall);
  } catch (error) {
    console.error("Error fetching halls:", error);
  }
}

// EVENT LISTENERS
close_form.addEventListener("click", function () {
  loginContainer.style.display = "none";
  registerContainer.style.display = "none";
  document.getElementById("darkener").style.display = "none";
});
close_form2.addEventListener("click", function () {
  loginContainer.style.display = "none";
  registerContainer.style.display = "none";
  document.getElementById("darkener").style.display = "none";
});
showLoginButton.addEventListener("click", function () {
  toggleForm(loginContainer);
});
showLoginLink.addEventListener("click", function () {
  toggleForm(loginContainer);
});
showRegisterButton.addEventListener("click", function () {
  toggleForm(registerContainer);
});
showRegisterLink.addEventListener("click", function () {
  toggleForm(registerContainer);
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
fetchHalls('Bengaluru');
fetchGmapLink('Bengaluru');
fetchHallInfo('Bengaluru','Amriteswari Hall');

flatpickr("#datepicker", {
  dateFormat: "Y-m-d",
  minDate: "today",  // Disable past dates
});

flatpickr("#timepicker", {
  enableTime: true,            // Enable time picker
  noCalendar: true,            // Disable date calendar
  dateFormat: "H:i",           // Time format (24-hour)
  time_24hr: true,             // 24-hour format
  minuteIncrement: 15,         // Select minutes in 15-minute intervals
});