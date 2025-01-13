// Function to update the second dropdown based on the first
function updateSecondDropdown(): void {
    const categorySelector: HTMLSelectElement | null = document.getElementById("category-selector") as HTMLSelectElement;
    const itemSelector: HTMLSelectElement | null = document.getElementById("item-selector") as HTMLSelectElement;
  
    if (!categorySelector || !itemSelector) {
      return;
    }
  
    const category: string = categorySelector.value;
    
    // Clear previous options in the second dropdown
    itemSelector.innerHTML = '<option value="">Select Item</option>';
  
    let items: string[] = [];
  
    // Define the items for each category
    if (category === "technology") {
      items = ["Computer", "Smartphone", "Tablet"];
    } else if (category === "science") {
      items = ["Physics", "Chemistry", "Biology"];
    } else if (category === "arts") {
      items = ["Painting", "Sculpture", "Music"];
    }
  
    // Add new options based on the selected category
    items.forEach((item: string) => {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = item.toLowerCase();
      option.textContent = item;
      itemSelector.appendChild(option);
    });
  }
  