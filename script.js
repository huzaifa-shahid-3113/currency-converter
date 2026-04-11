const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns =  document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if( select.name === "from" && currcode === "USD"){
            newoption.selected="selected";
        } else if ( select.name ==="to" && currcode === "PKR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflage(evt.target);
    });

}
const updateflage = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[ currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountval = amount.value;
    if (amountval === "" || amountval < 1){
        amountval = 1 ;
        amount.value = "1";

    }
    
   const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
   let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
   

    let finalamount = amountval * rate;
    msg.innerText = `${amountval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
}); 