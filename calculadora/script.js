
const display = document.getElementById('display');
let calculando = document.getElementById('calculando');

function appendtbackspace() {
    
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
   
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        calculado = true;
        display.value = parseFloat(calculando.textContent);
        result = eval(variavel);
        display.value = result;
        variavel = result;
        calculando.textContent = "";
    } catch (error) {
        display.value = 'Deu erro. ';
        console.error('Erro ao calcular:', error);
    }
}

