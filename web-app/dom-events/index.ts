// get element by tag name
document.getElementsByTagName("h1")[0];

//get h1 tag by css selector
document.querySelector("h1");

//create DOM element
const paragraph: HTMLParagraphElement = document.createElement("p");

paragraph.textContent = "This is our created paragraph";

// get element by class name
const addItemsContent: HTMLCollectionOf<Element> =
  document.getElementsByClassName("add-items");
console.log("addItemsContent", addItemsContent);

// append element in the html structure
addItemsContent[0].append(paragraph);

//remove element
const spanEl: HTMLSpanElement = document.getElementsByTagName("span")[0];
spanEl.remove();

//add event listener on keyboard press
document.addEventListener("keypress", (event: KeyboardEvent) => {
  console.log("Key pressed", event.key);
});

// Add and remove list items

const itemInput = document.querySelector("#itemInput") as HTMLInputElement;
const addButton = document.querySelector("#addButton") as HTMLButtonElement;
const list = document.querySelector("#list") as HTMLUListElement;

function addListItem() {
  const listItem: HTMLLIElement = document.createElement("li");
  const listItemValue: string | number = itemInput.value;

  paragraph.remove();

  if (listItemValue !== "" && listItemValue !== " ") {
    // added input value as list item text
    listItem.textContent = listItemValue;
    // display list item on the screen
    list.append(listItem);

    // clear input value after adding it to the list
    itemInput.value = "";
    itemInput.focus();

    const deleteBtn: HTMLButtonElement = document.createElement("button");
    deleteBtn.textContent = "Delete";
    listItem.append(deleteBtn);

    deleteBtn.style.margin = "5px";

    deleteBtn.addEventListener("click", () => {
      listItem.remove();
    });
  }
}

addButton.addEventListener("click", () => addListItem());

itemInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addListItem();
  }
});