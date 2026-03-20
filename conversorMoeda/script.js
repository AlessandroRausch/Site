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


function setSelectOptions(selectElement, options) {
  selectElement.innerHTML = '';
  options.forEach((option) => {
    const optionElement = document.createElement('option');
    // Se for um objeto com value e label
    if (typeof option === 'object') {
      optionElement.value = option.value;
      optionElement.textContent = option.label;
    } else {
      // Se for uma string simples (compatibilidade)
      optionElement.value = option;
      optionElement.textContent = option;
    }
    selectElement.appendChild(optionElement);
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
        // Buscar dados do XML da API brasileira
        const responseCoins = await fetch(API_KEY_COINS);
        const dataCoins = await responseCoins.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(dataCoins, "application/xml");
        
        // Criar mapa de sigla -> nome completo a partir do XML
        const currencyMap = {};
        Array.from(xmlDoc.getElementsByTagName("*")).forEach(node => {
            // A estrutura é <SIGLA>Nome da Moeda</SIGLA>
            const sigla = node.tagName.toUpperCase();
            const nome = node.textContent.trim();
            if (sigla && nome && sigla !== 'CURRENCIES') { // Evitar a tag raiz
                currencyMap[sigla] = nome;
            }
        });
        
        // Buscar moedas do JSON
        const response = await fetch(API_KEY + "USD");
        const data = await response.json();
        const currencyCodes = Object.keys(data.rates).sort();
        
        // Criar arrays de opções com sigla + nome (apenas moedas que têm nome no XML)
        const optionsWithNames = currencyCodes
            .filter(code => currencyMap[code]) // Manter apenas moedas que têm nome no XML
            .map(code => ({
                value: code,
                label: `${code} - ${currencyMap[code]}`
            }));
        
        setSelectOptions(fromCurrency, optionsWithNames);
        setSelectOptions(toCurrency, optionsWithNames);

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