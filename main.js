const inputOne = document.querySelector(".amount-one");
const inputTwo = document.querySelector(".amount-two");
const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const course = document.querySelector(".course");
let result;
let counter;
const apiKey = "1C84qchisV7sxWZW4GgQdh";

const initBase = () => {
  const apiUrlBase = `https://api.forexapi.eu/v2/live?base=${currencyOne.value}&counter=${currencyTwo.value}&apikey=${apiKey}`;
  fetch(apiUrlBase)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response not ok");
      }
      return response.json();
    })
    .then((json) => {
      counter = json;
      if (currencyOne.value !== currencyTwo.value) {
        course.textContent = `1 ${currencyOne.value} = ${
          counter.quotes[currencyTwo.value].mid
        } ${currencyTwo.value} `;
      } else {
        course.textContent = `1 ${currencyOne.value} =  1 ${currencyTwo.value} `;
      }
    });

  initCounter();
};

const initCounter = () => {
  const apiUrl = `https://api.forexapi.eu/v2/convert?amount=${inputOne.value}&from=${currencyOne.value}&to=${currencyTwo.value}&precision=2&apikey=${apiKey}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response not ok");
      }
      return response.json();
    })
    .then((json) => {
      result = json;
      if (currencyOne.value !== currencyTwo.value) {
        inputTwo.value = result.results[currencyTwo.value];
      } else {
        inputTwo.value = inputOne.value;
      }
    });
};

initBase();

inputOne.addEventListener("input", initCounter);
currencyOne.addEventListener("input", initBase);
currencyTwo.addEventListener("input", initBase);
