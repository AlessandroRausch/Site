function calcularDesconto() {

    const preco = parseFloat(document.getElementById('preco').value);
    const desconto = parseFloat(document.getElementById('desconto').value);

    if (isNaN(preco) || isNaN(desconto)) {
        alert("Por favor, insira valores válidos para o preço e o desconto.");
        return;
    }

    const valorDesconto = preco * (desconto / 100);
    const precoFinal = preco - valorDesconto;

    trocarCor();
    document.getElementById('resultado').innerHTML = `Preço final: R$ ${precoFinal.toFixed(2)}`;
}

function trocarCor() {
    const titulo = document.getElementById('titulo');
    titulo.setAttribute('style', `background-color: ${getRandomRgbColor()};`);
}

function getRandomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function efetuarOperacao() {
    const nums = [parseFloat(document.getElementById('num1').value), parseFloat(document.getElementById('num2').value)];
    const operador = document.getElementById('operador').value;
    
    let resultado1 = [];

    switch (operador) {
        case '+':
            resultado1.push(nums[0] + nums[1]);
            break;
        case '-':
            resultado1.push(nums[0] - nums[1]);
            break;
        case '*':
            resultado1.push(nums[0] * nums[1]);
            break;
        case '/':
            if (nums[1] === 0) {
                alert("Divisão por zero não é permitida.");
                return;
            }else {
            resultado1.push(nums[0] / nums[1]);
            }
            break;
        default:
            alert("Operador inválido.");
            return;
    }
    console.log(resultado1);
    document.getElementById('resultado1').innerHTML = `Resultado: ${resultado1}`;
}

function imprimir(number) {
    number = parseInt(document.getElementById('quantas').value);
    tamanho = parseInt(document.getElementById('quantidade').value);
    let valor = 0;
    const dados = [];
    while (valor < number) {
        dados.push(gerarStringAleatoria(tamanho));
        valor++;
        console.log(valor);
    }
    document.getElementById('impressao').innerHTML += '<br>';
    document.getElementById('impressao').innerHTML += dados.join("<br>");

}

function gerarStringAleatoria(tamanho) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let resultado = '';
  for (let i = 0; i < tamanho; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
}

