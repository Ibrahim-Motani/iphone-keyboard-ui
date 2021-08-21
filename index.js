// getting hold of all keys on the keyboard
const keys = [...document.getElementsByClassName('key')];
const row1Keys = [...document.getElementsByClassName("row1-change")];
const row2Keys = [...document.getElementsByClassName("row2-change")];
const row3Keys = [...document.getElementsByClassName("row3-change")];
// this handler is for the keys that will be removed in row3 when user is viewing symbols or numbers
const keysToBeRemoved = [...document.getElementsByClassName('remove')];

// handler for 3rd row to dynamically add and remove layout classes for alignment in symbols and numbers mode
const row3 = document.getElementById("change");

// handler for keys that will switch case, numbers and symbols
const caseSwitch = document.getElementById('caseSwitch');
const numberSwitch = document.getElementById('numberSwitch');

// variable to know case of letters 
let currentCase = 'upper';

const turnToUpperCase = () => {
    keys.forEach(key => {
        key.className = `key upper`;
    });
    currentCase = "upper";
};

const turnToLowerCase = () => {
    keys.forEach(key => {
        key.className = `key lower`;
    });
    currentCase = "lower";
};

// functions to change keys in different modes
const rowKeysChange = (rowNumber, index) => {
    if (rowNumber === 1) {
      row1Keys.forEach(key => {
        key.innerHTML = key.id[index];
      });
    } else if (rowNumber === 2) {
        // condition check for lesser than sign because '<' sign was not allowed in html id
        row2Keys.forEach(key => {
            if (key.id[index] === "l" ) {
              key.innerHTML = "<";
            } else {
              key.innerHTML = key.id[index];
            }
      });
    } else   {
      row3Keys.forEach(key => {
        key.innerHTML = key.id[index];
      });
    }
}

const setAlphabets = () => {
    // row keys will change
    rowKeysChange(1, 0);
    rowKeysChange(2, 0);

    // following code is to set changes in row3 based on what is clicked and what should be shown now
    keysToBeRemoved.forEach(element => {
      element.style.display = "inline";
    });
    row3.className = `row3`;
    rowKeysChange(3, 0);
    numberSwitch.innerHTML = "123";
    caseSwitch.innerHTML = `<i class="far fa-arrow-alt-circle-up"></i></i>`;
    caseSwitch.style.fontSize = '1rem';
};

const setNumbers = () => {
  // row keys will change
  rowKeysChange(1, 1);
    rowKeysChange(2, 1);
    
  // following code is to set changes in row3 based on what is clicked and what should be shown now
  keysToBeRemoved.forEach(element => {
    element.style.display = "none";
  });
  row3.className = `row3-numbers`;
  rowKeysChange(3, 1);
  numberSwitch.innerHTML = "ABC";
  caseSwitch.innerHTML = "#+=";
  caseSwitch.style.fontSize = "0.8rem";
};

const setSymbols = () => {
    rowKeysChange(1, 2);
    rowKeysChange(2, 2);
    caseSwitch.innerHTML = "123";
    caseSwitch.style.fontSize = "1rem";
};

// event listener for switching the case of the keys on the keyboard
caseSwitch.addEventListener('click', (event) => {
    if (event.target.className.includes("far")) {
      if (currentCase === "upper") {
        turnToLowerCase();
      } else {
        turnToUpperCase();
      }
    } else if (event.target.innerHTML === "123") {
      setNumbers();
    } else {
      setSymbols();
    }
});

// event listener for listening on keys on numberSwitch 
numberSwitch.addEventListener("click", event => {
  if (event.target.innerHTML === "123") {
      setNumbers();
  } else if (event.target.innerHTML.toLowerCase() === "abc") {
      setAlphabets();
  } else {
    setSymbols();
  }
});