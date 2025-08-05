let amigos = [];
let sorteioTimeout; // Variável para controlar o tempo da animação

function adicionarAmigo() {
    let amigoInput = document.getElementById('amigo');
    let nomeAmigo = amigoInput.value.trim();

    if (nomeAmigo === "") {
        alert("Por favor, digite um nome.");
        return;
    }

    if (amigos.includes(nomeAmigo)) {
        alert("Este nome já foi adicionado.");
        amigoInput.value = "";
        return;
    }

    amigos.push(nomeAmigo);
    atualizarListaAmigos();
    amigoInput.value = "";
    document.getElementById('resultado').innerHTML = ''; // Limpa o resultado ao adicionar novo amigo
}

function atualizarListaAmigos() {
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Limpa a lista antes de atualizar

    for (let i = 0; i < amigos.length; i++) {
        let item = document.createElement('li');
        item.textContent = amigos[i];
        listaAmigos.appendChild(item);
    }
}

function sortearAmigo() {
    if (amigos.length < 4) { // Recomenda-se pelo menos 4 para um bom sorteio
        alert("Adicione pelo menos 4 amigos para o sorteio.");
        return;
    }

    // Limpa qualquer sorteio anterior que esteja em andamento
    if (sorteioTimeout) {
        clearTimeout(sorteioTimeout);
    }

    let sorteio = embaralharArray([...amigos]);
    let resultadoUl = document.getElementById('resultado');
    resultadoUl.innerHTML = ''; // Limpa resultados anteriores

    let i = 0;

    function mostrarProximoSorteado() {
        if (i >= sorteio.length) {
            resultadoUl.innerHTML = '<li>Sorteio concluído!</li>';
            return;
        }

        let de = sorteio[i];
        let para = sorteio[(i + 1) % sorteio.length]; // O último tira o primeiro

        // Mostra quem está tirando...
        resultadoUl.innerHTML = `<li>${de} foi sorteado!</li>`;

        // Pausa e depois revela o nome sorteado
        sorteioTimeout = setTimeout(() => {
            resultadoUl.innerHTML = `<li>${de} foi sorteado: <strong>${para}</strong>!</li>`;

            // Pausa novamente antes de ir para o próximo
            sorteioTimeout = setTimeout(() => {
                i++;
                mostrarProximoSorteado();
            }, 2000); // Espera 2 segundos para mostrar o próximo par
        }, 1500); // Espera 1.5 segundos para revelar o nome
    }

    mostrarProximoSorteado();
}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca de elementos
    }
    return array;
}