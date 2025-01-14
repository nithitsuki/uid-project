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

// updateSecondDropdown(){console.log("hellow world");}

// Get references to the buttons and form containers
const showLoginButton = document.getElementById("login-btn");
const showRegisterButton = document.getElementById("register-btn");
const showLoginLink = document.getElementById("login-link");
const showRegisterLink = document.getElementById("register-link");
const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
const close_form = document.getElementById("close-btn");
const close_form2 = document.getElementById("close-btn2");
const FirstSelection = document.getElementById("Branch-selector");

function toggleForm(formToShow) {
  loginContainer.style.display = "none";
  registerContainer.style.display = "none";
  formToShow.style.display = "block";
}

close_form.addEventListener("click",function() {
  loginContainer.style.display = "none";
  registerContainer.style.display = "none";
})
close_form2.addEventListener("click",function() {
  loginContainer.style.display = "none";
  registerContainer.style.display = "none";
})
showLoginButton.addEventListener("click", function() {
  toggleForm(loginContainer);
});
showLoginLink.addEventListener("click", function() {
  toggleForm(loginContainer);
});
showRegisterButton.addEventListener("click", function() {
  toggleForm(registerContainer);
});
showRegisterLink.addEventListener("click", function() {
  toggleForm(registerContainer);
});

FirstSelection.addEventListener('change', function() {
    // Log the current selected value
    // console.log(FirstSelection.value);
    fetch("http://localhost:3000/api/Branches/"+FirstSelection.value+"/list_of_halls")
  .then((response) => response.json()) // Parse the JSON response
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
    console.error("Error fetching branches:", error); // Handle any errors
  });
  
  });