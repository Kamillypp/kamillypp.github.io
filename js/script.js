// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const codigo = Math.floor(Math.random() * 100000); // Gera um código aleatório para o produto

    // Adiciona o produto ao carrinho
    carrinho.push({ nome, preco, codigo });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza o carrinho na interface
    atualizarCarrinho();
}

// Função para atualizar a interface do carrinho
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaCarrinho = document.getElementById('listaCarrinho');
    const total = document.getElementById('total');
    
    // Limpar lista atual
    listaCarrinho.innerHTML = '';
    
    let valorTotal = 0;
    
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} (Código: ${item.codigo})`;
        listaCarrinho.appendChild(li);
        valorTotal += item.preco;
    });
    
    // Atualiza o total no carrinho
    total.textContent = `Total: R$ ${valorTotal.toFixed(2)}`;
}

// Função para finalizar a compra
function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    let mensagem = "Olá! Gostaria de finalizar a compra dos seguintes produtos:\n\n";
    let valorTotal = 0;
    
    // Monta a mensagem com os produtos e os preços
    carrinho.forEach(item => {
        mensagem += `${item.nome} - R$ ${item.preco.toFixed(2)} (Código: ${item.codigo})\n`;
        valorTotal += item.preco;
    });
    
    mensagem += `\nTotal: R$ ${valorTotal.toFixed(2)}\n\n`;
    mensagem += "Por favor, aguardo a confirmação do pedido.";

    // Envia o link para o WhatsApp com a mensagem
    const whatsappLink = `https://wa.me/5511945116287?text=${encodeURIComponent(mensagem)}`;
    window.location.href = whatsappLink;
}

// Atualiza o carrinho sempre que a página for carregada
document.addEventListener('DOMContentLoaded', atualizarCarrinho);
