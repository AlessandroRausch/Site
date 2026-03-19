
const display = document.getElementById('display');
let calculando = document.getElementById('calculando');
let displayValue = "";
let operador = null;
let resultado = null;
let acabouDeCalcular = false;

function clearDisplay() {
    display.value = '';
}

function clear() {
    displayValue = "";
    operador = null;
    resultado = null;
    acabouDeCalcular = false;
    calculando.textContent = "";
    clearDisplay();
}

function calculate() {
    try {
        if (resultado !== null && operador && displayValue) {
            let expressao = resultado + operador + displayValue;
            let result = eval(expressao);
            display.value = result;
            calculando.textContent = expressao;
            resultado = result;
            acabouDeCalcular = true;
            console.log('Resultado:', result);
        }
    } catch (error) {
        display.value = 'Deu erro.';
        console.error('Erro ao calcular:', error);
    }
}
function processarOperador(op) {
    if (resultado === null && displayValue) {
        resultado = parseFloat(displayValue);
    } else if (resultado !== null && displayValue && operador) {
        calculate();
    }
    operador = op;
    displayValue = "";
    acabouDeCalcular = false;
}

function handleKey(key) {
    // Números e ponto decimal
    if (!isNaN(key) || key === '.') {
        // Se acabou de calcular, limpa e começa novo
        if (acabouDeCalcular) {
            display.value = key;
            displayValue = key;
            acabouDeCalcular = false;
        } else {
            displayValue += key;
            display.value += key;
        }
    }
    // Operadores
    else if (['+', '-', '*', '/'].includes(key)) {
        if (operador === key) {
            // Se pressionar o mesmo operador, ignora
            return;
        }
        processarOperador(key);
        if (resultado !== null) {
            calculando.textContent = resultado + ' ' + key;
            display.value = '';
        }
    }
    // Igual
    else if (key === '=' || key === 'Enter') {
        if (resultado !== null && operador && displayValue) {
            calculate();
        }
    }
    // Backspace
    else if (key === 'Backspace') {
        if (displayValue) {
            displayValue = displayValue.slice(0, -1);
            display.value = displayValue;
        }
    }
    // Clear
    else if (key === 'c' || key === 'C') {
        clear();
    }
    
    console.log('displayValue:', displayValue, 'operador:', operador, 'resultado:', resultado);
}

window.addEventListener('keydown', function (event) {
    handleKey(event.key);
});

// Button event listeners
document.getElementById('btn0').addEventListener('click', () => handleKey('0'));
document.getElementById('btn1').addEventListener('click', () => handleKey('1'));
document.getElementById('btn2').addEventListener('click', () => handleKey('2'));
document.getElementById('btn3').addEventListener('click', () => handleKey('3'));
document.getElementById('btn4').addEventListener('click', () => handleKey('4'));
document.getElementById('btn5').addEventListener('click', () => handleKey('5'));
document.getElementById('btn6').addEventListener('click', () => handleKey('6'));
document.getElementById('btn7').addEventListener('click', () => handleKey('7'));
document.getElementById('btn8').addEventListener('click', () => handleKey('8'));
document.getElementById('btn9').addEventListener('click', () => handleKey('9'));
document.getElementById('btnDecimal').addEventListener('click', () => handleKey('.'));
document.getElementById('btnAdd').addEventListener('click', () => handleKey('+'));
document.getElementById('btnSubtract').addEventListener('click', () => handleKey('-'));
document.getElementById('btnMultiply').addEventListener('click', () => handleKey('*'));
document.getElementById('btnDivide').addEventListener('click', () => handleKey('/'));
document.getElementById('btnEquals').addEventListener('click', () => handleKey('='));
document.getElementById('btnBackspace').addEventListener('click', () => handleKey('Backspace'));
document.getElementById('btnClear').addEventListener('click', () => handleKey('c'));

