import * as storage from "./storage.js"
let items = [];


// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
const showItems = () => {
  // loop though items and stick each array element into an <li>
  // use array.map()!
  // update the innerHTML of the <ol> already on the page

  let storageItems = storage.readFromLocalStorage("list");
  let html = "";
  if (Array.isArray(storageItems)) {
    items = storageItems;
    html = storageItems.map(w => `<li> ${w}</li>`).join("");
  }


  document.querySelector("#list-html").innerHTML = html;
};

// II. declare and implement addItem(str)
// - this will add `str` to the `items` array (so long as `str` is length greater than 0)
const addItem = str => {
  if (str != "") {
    items.push(str);
    // console.log("Adding to list: " + str);

    // console.log("Current items in list: ")
    // for (let i = 0; i < items.length; i++) {
    //   console.log(items[i])
    // }

    storage.writeToLocalStorage("list", items)
    showItems();
  }
};


// Also:
// - call `addItem()`` when the button is clicked, and also clear out the <input>
// - and be sure to update .localStorage by calling `writeToLocalStorage("items",items)`
const UI = () => {
  const addButton = document.querySelector("#btn-add");
  const clearButton = document.querySelector("#btn-clear");

  const textBox = document.querySelector("#thing-text");

  addButton.addEventListener("click", () => { addItem(textBox.value) });
  clearButton.addEventListener("click", () => { clearItems() });
}

const init = () => {
  showItems();
  UI();
}

// When the page loads:
// - load in the `items` array from storage.js and display the current items
// you might want to double-check that you loaded an array ...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// ... and if you didn't, set `items` to an empty array

// Got it working? 
// - Add a "Clear List" button that empties the items array

const clearItems = () => {
  items = [];
  storage.writeToLocalStorage("list", []);
  showItems();
}
init();