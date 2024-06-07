const pegarProduto = (dados) => {
    const parametrosURL = new URLSearchParams(location.search);
    const id = Number(parametrosURL.get("produto"));
    const produto = dados.filter((dado) => dado.id === id)[0];
    return produto;
};

const atualizarImagemProduto = (produto) => {
    const imagem = document.querySelector(".imagem-pagina-produto");
    imagem.src = "assets/products/" + produto?.image;
    imagem.alt = "Imagem de " + (produto?.name ?? "Produto Desconhecido");
};

const atualizarNomeProduto = (produto) => {
    const nomeProduto = document.querySelector(".nome-pagina-produto");
    nomeProduto.textContent = produto?.name ?? "Produto desconhecido";
};

const atualizarDescricaoProduto = (produto) => {
    const descricaoProduto = document.querySelector(
        ".descricao-pagina-produto"
    );
    descricaoProduto.textContent = produto?.description ?? "";
};

const atualizarPrecoProduto = (produto) => {
    const elementoPrecoPrePromocao = document.querySelector(
        ".preco-antes-promocao"
    );
    const elementoPreco = document.querySelector(".preco-pagina-produto");
    let precoAtual = produto?.price ?? "";

    const estaEmPromocao =
        produto?.promotionalPrice !== null &&
        produto?.promotionalPrice !== undefined;

    if (estaEmPromocao) {
        elementoPrecoPrePromocao.textContent = "R$ " + produto?.price;
        precoAtual = produto?.promotionalPrice ?? "";
    }
    elementoPreco.textContent = "R$ " + precoAtual;
};

const atualizarAvaliacaoProduto = (produto) => {
    const avaliacaoNumero = document.querySelector(".nota-produto-numero");
    avaliacaoNumero.textContent = produto?.rating ?? "";

    const avaliacaoEstrela = document.querySelector(".nota-produto");

    const notaEmPorcentagem = produto?.rating * 20;
    const restoPorcentagem = 100 - notaEmPorcentagem;

    avaliacaoEstrela.style.setProperty(
        "--porcentagem-nota",
        `${notaEmPorcentagem}%`
    );
    avaliacaoEstrela.style.setProperty(
        "--porcentagem-branco",
        `${restoPorcentagem}%`
    );
};

const atualizarInformacoesProduto = (produto) => {
    atualizarImagemProduto(produto);

    atualizarNomeProduto(produto);

    atualizarDescricaoProduto(produto);

    atualizarPrecoProduto(produto);

    atualizarAvaliacaoProduto(produto);
};

const atualizarBotoes = (produto, tipo) => {
    const botao = document.querySelector(`#botao-${tipo}-produto`);
    botao.dataset.id = produto.id;

    const idItens = JSON.parse(localStorage.getItem(tipo)) ?? [];
    if (idItens.includes(produto?.id)) {
        botao.classList.add("adicionado-ao-carrinho");
    }

    botao.addEventListener("click", () => {
        const idItens = JSON.parse(localStorage.getItem(tipo)) ?? [];
        botao.classList.toggle("adicionado-ao-carrinho");
        if (idItens.includes(produto?.id)) {
            const novaLista = idItens.filter((id) => id !== produto?.id);
            localStorage.setItem(tipo, JSON.stringify(novaLista));
            return;
        }
        idItens.push(produto?.id);
        localStorage.setItem(tipo, JSON.stringify(idItens));
    });
};

const criarMensagemSemComentarios = () => {
    const mensagem = document.createElement("p");
    mensagem.textContent = "Nenhum comentário disponível no momento.";
    mensagem.classList.add("comentarios-vazio");
    return mensagem;
};

const criarComentario = () => {
    const comentario = document.createElement("article");
    comentario.classList.add("comentario");
    return comentario;
};

const criarComentarista = (review) => {
    const comentarista = document.createElement("p");
    comentarista.classList.add("comentarista");
    comentarista.textContent = review.reviewerName;
    return comentarista;
};

const criarData = (review) => {
    const data = document.createElement("time");
    data.classList.add("data-comentario");
    data.textContent = review.date;
    return data
};

const criarDadosComentario = (review) => {
    const dadosComentario = document.createElement("div");
    dadosComentario.classList.add("dados-comentario");

    const comentarista = criarComentarista(review);
    const data = criarData(review);

    dadosComentario.append(comentarista, data);

    return dadosComentario;
};

const criarAvaliacaoComentario = (review) => {
    const avaliacaoComentario = document.createElement("p");
    avaliacaoComentario.classList.add(
        "avaliacao-pagina-produto",
        "avaliacao-comentario"
    );

    const notaNumero = document.createElement("span");
    notaNumero.classList.add("nota-produto-numero");
    notaNumero.textContent = review.rating;

    const notaEstrela = document.createElement("span");
    notaEstrela.classList.add("nota-produto");
    notaEstrela.textContent = "★".repeat(5);
    const notaEmPorcentagem = review.rating * 20;
    const restoPorcentagem = 100 - notaEmPorcentagem;
    notaEstrela.style.setProperty(
        "--porcentagem-nota",
        `${notaEmPorcentagem}%`
    );
    notaEstrela.style.setProperty(
        "--porcentagem-branco",
        `${restoPorcentagem < 50 ? restoPorcentagem : 0}%`
    );

    avaliacaoComentario.append(notaNumero, " ", notaEstrela);

    return avaliacaoComentario;
}

const criarMensagemComentario = (review) => {
    const pMensagem = document.createElement("p");
    pMensagem.classList.add("mensagem-comentario");
    pMensagem.textContent = review.comment;
    return pMensagem;
}

const criarComentarios = (produto) => {
    const comentarios = document.querySelector(".section-comentarios");
    if (produto?.reviews.length === 0 || produto === undefined) {
        const mensagem = criarMensagemSemComentarios();
        comentarios.append(mensagem);
    }
    for (let review of produto?.reviews ?? []) {
        const comentario = criarComentario();

        const dadosComentario = criarDadosComentario(review);

        const avaliacaoComentario = criarAvaliacaoComentario(review);

        const pMensagem = criarMensagemComentario(review);

        comentario.append(dadosComentario, avaliacaoComentario, pMensagem);
        comentarios.append(comentario);
    }
};

const iniciarPaginaProduto = (dados) => {
    const produto = pegarProduto(dados);

    document.title = produto.name + " - Loja Loja";

    atualizarInformacoesProduto(produto);

    atualizarBotoes(produto, "carrinho");
    atualizarBotoes(produto, "favoritos");

    criarComentarios(produto);
};

export default iniciarPaginaProduto;
