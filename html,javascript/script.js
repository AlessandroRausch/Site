function calcularDesconto() {

    const preco = parseFloat(document.getElementById('preco').value);
    const desconto = parseFloat(document.getElementById('desconto').value);

    if (isNaN(preco) || isNaN(desconto)) {
        alert("Por favor, insira valores válidos para o preço e o desconto.");
        return;
    }

    const valorDesconto = preco * (desconto / 100);
    console.log(valorDesconto);
    const precoFinal = preco - valorDesconto;

    document.getElementById('resultado').innerHTML = `Preço final: R$ ${precoFinal.toFixed(2)}`;

}