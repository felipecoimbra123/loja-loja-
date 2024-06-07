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
    if (produto.stock === 0) {
        imagem.classList.add("esgotado");
    }
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

    if (tipo === "carrinho" && produto.stock === 0) {
        botao.disabled = true;
        return;
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
    const elementoData = document.createElement("time");
    elementoData.classList.add("data-comentario");

    const anoReview = review.date.split("-")[0].padStart(2, 0);
    const mesReview = (Number(review.date.split("-")[1]) + 1).toString().padStart(2, 0);
    const diaReview = review.date.split("-")[2].padStart(2, 0);

    elementoData.textContent = `${diaReview}/${mesReview}/${anoReview}`;
    return elementoData
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

const criarInputComentario = () => {
    const divComentar = document.createElement("div");
    divComentar.classList.add("div-comentar");

    const imagem = document.createElement("img");
    imagem.src = "";
    let bancoDeDados;
    const openRequest = indexedDB.open("img_db", 1);
    openRequest.addEventListener("error", () => {
        imagem.src = "assets/icons/account.svg";
        console.error("Banco de dados falhou ao abrir.");
    });
    openRequest.addEventListener("success", () => {
        bancoDeDados = openRequest.result;
        const objectStore = bancoDeDados
            .transaction("img_os")
            .objectStore("img_os");
        const getRequest = objectStore.get(1);
        getRequest.addEventListener("success", (e) => {
            if (!e?.target?.result?.img) {
                imagem.src = "assets/icons/account.svg";
                return;
            }
            const fr = new FileReader();
            fr.onload = () => {
                imagem.src = fr.result;
            };
            fr.readAsDataURL(e.target.result.img);
        });
    });

    const form = document.createElement("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const comentarios = document.querySelector(".section-comentarios");

        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = hoje.getMonth();
        const dia = hoje.getDate();
        const infomacoes = {
            reviewerName: JSON.parse(localStorage.getItem("informacoesConta"))[0][1] ?? "Anônimo",
            rating: 5,
            comment: form.elements["comentar"].value,
            date: `${ano}-${mes}-${dia}`
        }

        const comentario = criarComentario();

        const dadosComentario = criarDadosComentario(infomacoes);

        const avaliacaoComentario = criarAvaliacaoComentario(infomacoes);

        const pMensagem = criarMensagemComentario(infomacoes);

        comentario.append(dadosComentario, avaliacaoComentario, pMensagem);
        comentarios.append(comentario);
    })

    const inputComentar = document.createElement("input");
    inputComentar.name = "comentar";
    inputComentar.id = "comentar";
    inputComentar.placeholder = "Adicione um comentário...";

    const botao = document.createElement("button");
    botao.textContent = "Comentar";

    form.append(inputComentar, botao);
    divComentar.append(imagem, form);

    return divComentar;
}

const criarComentarios = (produto) => {
    const comentarios = document.querySelector(".section-comentarios");

    if (localStorage.getItem("estaLogado") !== "false") {
        const inputComentario = criarInputComentario();
        comentarios.append(inputComentario)
    }

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
