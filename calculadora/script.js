
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

function clear() {
    variavel = "";
    conta = [];
    operador = [];
    calculando.textContent = "";
}

function calculate() {

    try {
        console.log(variavel);
        calculado = true;
        display.value = parseFloat(calculando.textContent);
        var result = eval(variavel);
        display.value = result;
        calculando.textContent = variavel;
        variavel = result;
        while (operador.length > 0) {
            while (conta.length > 0) {
                conta.pop();
            }
            operador.pop();
        }
        
        
    } catch (error) {
        display.value = 'Deu erro. ';
        console.error('Erro ao calcular:', error);
    }
}
function plus(variavel) {
   calculando.textContent = variavel.toString(), operador[operador.length - 1].toString();
   conta.push(variavel.slice(0, -1));
    variavel = '';
}

