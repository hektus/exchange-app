const inputOne = document.querySelector(".amount-one");
const inputTwo = document.querySelector(".amount-two");
const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const course = document.querySelector(".course");
let result;
let counter;

const initApi = () => {
  const apiKey = "1C84qchisV7sxWZW4GgQdh";
  const apiUrl = `https://api.forexapi.eu/v2/convert?amount=${inputOne.value}&from=${currencyOne.value}&to=${currencyTwo.value}&precision=2&apikey=${apiKey}`;
  const apiUrlBase = `https://api.forexapi.eu/v2/live?base=${currencyOne.value}&counter=${currencyTwo.value}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response not ok");
      }
      return response.json();
    })
    .then((json) => {
      result = json;
      inputTwo.value = result.results[currencyTwo.value];
    });

  fetch(apiUrlBase)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response not ok");
      }
      return response.json();
    })
    .then((json) => {
      counter = json;
      course.textContent = `1 ${currencyOne.value} = ${
        counter.quotes[currencyTwo.value].mid
      } ${currencyTwo.value} `;
    });
};

initApi();

inputOne.addEventListener("input", initApi);
currencyOne.addEventListener("input", initApi);
currencyTwo.addEventListener("input", initApi);
