const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select[name='from']");
const toCurr = document.querySelector(".to select[name='to']");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === 'from' && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === 'to' && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const from = fromCurr.value.toLowerCase(); // usd
    const to = toCurr.value.toLowerCase();     // inr

    const URL = `${BASE_URL}/${from}.json`;

    const response = await fetch(URL);
    const data = await response.json();
    const rate = data[from][to];
    console.log(`${from.toUpperCase()} → ${to.toUpperCase()} = ${rate}`);
    let finalAmount = rate * amtVal;
    console.log(`${finalAmount}`);

    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
};

window.addEventListener("load", () => {
    updateExchangeRate();
});
