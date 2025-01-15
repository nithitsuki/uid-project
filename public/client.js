// Function to fetch branches from the API and populate the select list
fetch("http://localhost:3000/api/Branches")
  .then((response) => response.json()) // Parse the JSON response
  .then((branches) => {
    const selectElement = document.getElementById("Branch-selector");
    selectElement.innerHTML = "";
    branches.forEach((branch) => {
      const option = document.createElement("option");
      option.value = branch;
      option.textContent = branch;
      selectElement.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching branches:", error); // Handle any errors
  });

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

function toggleForm(formToShow) {
  loginContainer.style.display = "none";
  registerContainer.style.display = "none";
  document.getElementById("darkener").style.display = "block";
  formToShow.style.display = "block";
}

// Form Closers
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
  // Log the current selected value
  // console.log(FirstSelectionList.value);

  // First fetch: Get list of halls
  fetch(
    "http://localhost:3000/api/Branches/" +
      FirstSelectionList.value +
      "/list_of_halls"
  )
    .then((response) => response.json())
    .then((names_of_halls) => {
      const selectElement = document.getElementById("Hall-selector");
      selectElement.innerHTML = "";
      names_of_halls.forEach((name_of_hall) => {
        const option = document.createElement("option");
        option.value = name_of_hall;
        option.textContent = name_of_hall;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching branches:", error); // Handle any errors from the first fetch
    });

  // Second fetch: Get Google Maps link
  fetch(
    "http://localhost:3000/api/Branches/" +
      FirstSelectionList.value +
      "/gmap_link"
  )
    .then((response) => response.json()) // Parse the JSON response
    .then((gmap_link) => {
      const list = document.getElementById("gmap-info");
      list.innerHTML = ""; // Clear previous content
      const link = document.createElement("a");
      link.href = gmap_link;
      link.textContent = "Click for Directions to Campus";
      list.appendChild(link); // Append the link to the list
    })
    .catch((error) => {
      console.error("Error fetching Google Maps link:", error); // Handle any errors from the second fetch
    });
});

SecondSelectionList.addEventListener("change", function () {
  fetch(
    "http://localhost:3000/api/Branches/" +
      FirstSelectionList.value +
      "/" +
      SecondSelectionList.value +
      "/hall_info"
  )
    .then((response) => response.json())
    .then((X) => {
      // console.log(X);
      const list = document.getElementById("Hall-info");
      list.innerHTML = ""; // Clear previous content
      const hall_name = document.createElement("li");
      const capcity = document.createElement("li");
      hall_name.innerHTML = "<b>Name of the HALL: </b>"+SecondSelectionList.value;
      capcity.innerHTML = "<b>CAPACITY: </b>"+X["Capacity"];
      list.appendChild(hall_name);
      list.appendChild(document.createElement("br"));
      list.appendChild(capcity);
    });
});
