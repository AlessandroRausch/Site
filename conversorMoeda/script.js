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


async function connvertMoney() {
    button.style.display = 'none';
    loading.style.display = 'block';

   try {
      const response = await fetch(API_KEY+fromCurrency.value);
      const data = await response.json();
      console.log(data);
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
        const response = await fetch(API_KEY+"USD");
        const data = await response.json();
        return data.rates[toCurrency.value];

        

    } catch (error) {
        console.error('Erro ao buscar a cotação:', error);
        throw error;
    }
  }

form.addEventListener('submit', function(event) {
    event.preventDefault();
    connvertMoney();

})