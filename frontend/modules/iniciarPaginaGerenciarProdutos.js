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
    if (produto.stock_quantity === 0) {
        imagem.classList.add("esgotado");
    }
};

const atualizarNomeProduto = (produto) => {
    const nomeProduto = document.querySelector("#nome");
    nomeProduto.value = produto?.name ?? "Produto desconhecido";
};

const atualizarDescricaoProduto = (produto) => {
    const descricaoProduto = document.querySelector("#descricao");
    descricaoProduto.textContent = produto?.description ?? "";
};

const atualizarPrecoProduto = (produto) => {
    const elementoPreco = document.querySelector("#preco");
    const elementoPrecoPromocional =
        document.querySelector("#preco_promocional");
    elementoPreco.value = produto.price;
    elementoPrecoPromocional.value = produto.promotional_price;
};

const atualizarQuantidadeProduto = (produto) => {
    const elementoQuantidade = document.querySelector("#quantidade");
    elementoQuantidade.value = produto.stock_quantity;
};

const atualizarImageProduto = (produto) => {
    const elementoImage = document.querySelector("#image");
    elementoImage.value = produto.image;
};

const atualizarInformacoesProduto = (dados) => {
    const produto = pegarProduto(dados);

    atualizarImagemProduto(produto);

    atualizarNomeProduto(produto);

    atualizarDescricaoProduto(produto);

    atualizarPrecoProduto(produto);

    atualizarQuantidadeProduto(produto);

    atualizarImageProduto(produto);

    const form = document.querySelector(".form-dados-produto");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = {
            nome: form.nome.value,
            descricao: form.descricao.value,
            preco: form.preco.value,
            precoPromocional: form.preco_promocional.value || null,
            quantidade: form.quantidade.value,
            image: form.image.value,
        };

        fetch("http://localhost:3000/produto/atualizar/" + produto.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.success) {
                    alert("Não foi possível atualizar o produto");
                    console.error(res.data);
                    return;
                }
                alert("Produto atualizado");
            });
    });

    const buttonDelete = document.querySelector(".button-delete");
    buttonDelete.addEventListener("click", (e) => {
        fetch("http://localhost:3000/reviews/deletar/" + produto.id, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.success) {
                    alert("Não foi possível deletar o produto");
                    console.error(res.data);
                    return;
                }
                fetch(
                    "http://localhost:3000/categoria/produto/deletar/" +
                        produto.id,
                    {
                        method: "DELETE",
                    }
                )
                    .then((res) => res.json())
                    .then((res) => {
                        if (!res.success) {
                            alert("Não foi possível deletar o produto");
                            console.error(res.data);
                            return;
                        }
                        fetch(
                            "http://localhost:3000/produto/deletar/" +
                                produto.id,
                            {
                                method: "DELETE",
                            }
                        )
                            .then((res) => res.json())
                            .then((res) => {
                                if (!res.success) {
                                    alert("Não foi possível deletar o produto");
                                    console.error(res.data);
                                    return;
                                }
                                alert("Produto deletado");
                                location.pathname = "frontend";
                            });
                    });
            });
    });
};

const iniciarPaginaGerenciarProdutos = (produtos) => {
    const usuarioId = localStorage.getItem("usuarioLogado");
    fetch("http://localhost:3000/usuario/informacoes/" + usuarioId)
        .then((res) => res.json())
        .then((res) => {
            if (res.data[0].role !== "A") {
                location.pathname = "frontend";
            }
        });

    atualizarInformacoesProduto(produtos);
};

export default iniciarPaginaGerenciarProdutos;