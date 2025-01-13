// Function to update the second dropdown based on the first
function updateSecondDropdown() {
    var categorySelector = document.getElementById("category-selector");
    var itemSelector = document.getElementById("item-selector");
    if (!categorySelector || !itemSelector) {
        return;
    }
    var category = categorySelector.value;
    // Clear previous options in the second dropdown
    itemSelector.innerHTML = '<option value="">Select Item</option>';
    var items = [];
    // Define the items for each category
    if (category === "technology") {
        items = ["Computer", "Smartphone", "Tablet"];
    }
    else if (category === "Bengaluru") {
        items = ["Krishna Hall","Sudhamani Hall"];
    }
    else if (category === "arts") {
        items = ["Painting", "Sculpture", "Music"];
    }
    // Add new options based on the selected category
    items.forEach(function (item) {
        var option = document.createElement("option");
        option.value = item.toLowerCase();
        option.textContent = item;
        itemSelector.appendChild(option);
    });
}
