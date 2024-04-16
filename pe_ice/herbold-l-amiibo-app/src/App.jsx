import { useState } from "react";
import './App.css'

// app "globals" and utils
const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

const loadXHR = (url, callback) => {
  // set up the connection
  const xhr = new XMLHttpRequest;
  // when the data loads, invoke the callback function and pass it the `xhr` object
  xhr.onload = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    callback(xhr);
  }
  xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
  xhr.open("GET", url);
  xhr.send();
};

const searchAmiibo = (name, callback) => {
  loadXHR(`${baseurl}${name}`, callback);
};

const parseAmiiboResult = xhr => {
  // get the `.responseText` string
  let text = xhr.responseText;
  // declare a json variable
  let json;
  // try to parse the string into a json object
  try {
    json = JSON.parse(text);
  }
  catch {
    console.log("Parse fail");
    return;
  }
  // log out number of results (length of `json.amiibo`)
  console.log(`Number of results=${json.amiibo.length}`);

  // loop through `json.amiibo` and log out the character name
  for (let i = 0; i < json.amiibo.length; i++) {
    console.log(json.amiibo[i].name);
  }
};

function GetNewSearch{
  const [searchterm, setNewItem] = useState("");
}

const App = () => {
  return <>
    <header>
      <h1>Amiibo Finder</h1>
    </header>
    <hr />
    <main>
      <button>Search</button>
      <label>
        Name:
        <input
          value={searchTerm}
          onChange={e => setNewItem(e.target.value)}
          type="text"
          id="item" />
      </label>
    </main>
    <hr />
    <footer>
      <p>&copy; 2023 Ace Coder</p>
    </footer>
  </>;
};



export default App;