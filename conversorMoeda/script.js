const form  = document.getElementById('converterForm');
const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const convertedAmount = document.getElementById('convertamount');
const result = document.querySelector('.result');
const toCurrency = document.getElementById('toCurrency');
const loading = document.querySelector('.loading');
const error = document.querySelector(".error")
const button = document.getElementById('converterBtn');
const API_KEY = 'https://api.exchangerate-api.com/v4/latest/';
const API_KEY_COINS = 'https://economia.awesomeapi.com.br/xml/available/uniq';


function setSelectOptions(selectElement, codes) {
  selectElement.innerHTML = '';
  codes.forEach((code) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = code;
    selectElement.appendChild(option);
  });
}


async function connvertMoney() {
    button.style.display = 'none';
    loading.style.display = 'block';


   try {
      const response = await fetch(API_KEY+fromCurrency.value);
      const data = await response.json();
     
      const rate = data.rates[toCurrency.value];
      const convertedValue = (amount.value * rate).toFixed(2);
      
      convertedAmount.value = convertedValue;
      result.innerHTML = `${amount.value} ${fromCurrency.value} = ${convertedValue} ${toCurrency.value}`;
      button.style.display = 'block';

   } catch (err) {
      error.style.display = 'block';
      error.innerHTML = 'Erro ao buscar a cotação. Por favor, tente novamente.';
   }
      loading.style.display = 'none';
}



async function addCoins() {
    try {

        const responseCoins = await fetch(API_KEY_COINS);
        const dataCoins = await responseCoins.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(dataCoins, "application/xml");
        const currencyCoins  = Array.from(xmlDoc.getElementsByTagName("currency")).map(node => node.textContent);
        const response = await fetch(API_KEY+"USD");
        const data = await response.json();
        const currencyCodes = Object.keys(data.rates).sort();
        setSelectOptions(fromCurrency, currencyCodes.concat(currencyCoins));
        setSelectOptions(toCurrency, currencyCodes.concat(currencyCoins));

    // Ajuste inicial: deixar BRL e USD selecionados se existirem
     if (currencyCodes.includes('BRL')) fromCurrency.value = 'BRL';
        if (currencyCodes.includes('USD')) toCurrency.value = 'USD';

    } catch (error) {
        console.error('Erro ao buscar a cotação:', error);
        throw error;
    }
  }

addCoins();

form.addEventListener('submit', function(event) {
    event.preventDefault();
    connvertMoney();

})