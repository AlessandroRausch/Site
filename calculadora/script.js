
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
        var result = eval(variavel);
        display.value = result;
        calculando.textContent = variavel;
        variavel = result;
    } catch (error) {
        display.value = 'Deu erro. ';
        console.error('Erro ao calcular:', error);
    }
}
function plus(variavel) {
    console.log(variavel);
    document.getElementById('calculando').textContent = variavel;
    clearDisplay();

}

