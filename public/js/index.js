"use strict";
// AcervoApp/src/index.ts
// Lógica da página de acervo - depende de constantes.ts
// Variável global para armazenar o token
let token = null;
// Função principal que roda quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página de acervo carregada!');
    token = localStorage.getItem('token');
    const tabelaCorpoEl = document.getElementById('tabela-filmes-corpo');
    if (!tabelaCorpoEl)
        return;
    const tabelaCorpo = tabelaCorpoEl;
    const logoutButton = document.getElementById('logout-button');
    const novoFilmeForm = document.getElementById('novo-filme-form');
    const novoFilmeErro = document.getElementById('novo-filme-erro');
    // --- VERIFICAÇÃO DE LOGIN ---
    if (!token) {
        // Se não tem token, chuta o usuário para a página de login
        window.location.replace('login.html');
        return; // Para a execução do script
    }
    // --- CONFIGURAÇÃO DOS EVENTOS ---
    // Configurar o botão de Logout
    logoutButton === null || logoutButton === void 0 ? void 0 : logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token'); // Remove o token
        window.location.replace('login.html'); // Volta ao login
    });
    // Configurar o formulário de "Novo Filme"
    novoFilmeForm === null || novoFilmeForm === void 0 ? void 0 : novoFilmeForm.addEventListener('submit', (evento) => {
        evento.preventDefault();
        if (novoFilmeErro)
            novoFilmeErro.textContent = ''; // Limpa erros antigos
        // 1. Coletar dados do formulário
        const nome = document.getElementById('filme-nome').value;
        const data_visto = document.getElementById('filme-data').value;
        const nota = document.getElementById('filme-nota').value;
        const duracao_min = document.getElementById('filme-duracao').value;
        // 2. Enviar para a API (POST)
        fetch(backendAddress + 'filmes/', {
            method: 'POST',
            headers: {
                'Authorization': tokenKeyword + token, // Envia o Token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                data_visto: data_visto,
                nota: nota,
                duracao_min: duracao_min
            })
        })
            .then(response => {
            if (response.status === 201) { // 201 CREATED (Sucesso)
                novoFilmeForm.reset(); // Limpa o formulário
                buscarEPreencherFilmes(); // Atualiza a lista de filmes
            }
            else if (response.status === 401) { // Não autorizado
                localStorage.removeItem('token');
                window.location.replace('login.html');
                throw new Error('Sessão expirada.');
            }
            else {
                throw new Error('Erro ao cadastrar filme. Verifique os campos.');
            }
        })
            .catch(error => {
            if (novoFilmeErro)
                novoFilmeErro.textContent = error.message;
        });
    });
    // --- AÇÃO INICIAL ---
    // Buscar e preencher a lista de filmes assim que a página carrega
    buscarEPreencherFilmes();
});
// --- FUNÇÕES AUXILIARES ---
/**
 * Busca a lista de filmes na API (GET) e preenche a tabela HTML.
 */
function buscarEPreencherFilmes() {
    if (!token)
        return; // Se não tiver token, não faz nada
    const tabelaCorpo = document.getElementById('tabela-filmes-corpo') || null;
    fetch(backendAddress + 'filmes/', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token // Envia o Token!
        }
    })
        .then(response => {
        if (response.status === 401) { // Não autorizado
            localStorage.removeItem('token');
            window.location.replace('login.html');
            throw new Error('Sessão expirada.');
        }
        return response.json();
    })
        .then(filmes => {
        // Preencher a tabela com os filmes
        if (!tabelaCorpo)
            return;
        tabelaCorpo.innerHTML = ''; //Limpa
        filmes.forEach((filme) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${filme.nome}</td>
                <td>${filme.data_visto}</td>
                <td>${filme.nota}</td>
                <td>${filme.duracao_min}</td>
                <td>
                    <button class="edit-btn" data-id="${filme.id}">Editar</button>
                    <button class="delete-btn" data-id="${filme.id}">Deletar</button>
                </td>
            `;
            tabelaCorpo.appendChild(tr);
        });
        // Adicionar lógica aos botões "Deletar" e "Editar"
        adicionarEventosEditar();
        adicionarEventosDeletar();
    })
        .catch(error => console.error('Erro ao buscar filmes:', error));
}
/**
 * Adiciona os "ouvintes" de evento de clique a todos os botões "Deletar".
 */
function adicionarEventosDeletar() {
    if (!token)
        return;
    const botoesDeletar = document.querySelectorAll('.delete-btn');
    botoesDeletar.forEach(botao => {
        botao.addEventListener('click', () => {
            const filmeId = botao.dataset.id;
            if (filmeId) {
                deletarFilme(filmeId, token); // token! (non-null assertion) pois já verificamos
            }
        });
    });
}
function adicionarEventosEditar() {
    if (!token)
        return;
    const botoesEditar = document.querySelectorAll('.edit-btn');
    botoesEditar.forEach(botao => {
        botao.addEventListener('click', async () => {
            var _a, _b, _c, _d, _e;
            const id = botao.dataset.id;
            try {
                const resp = await fetch(backendAddress + `filmes/${id}/`, {
                    method: 'GET',
                    headers: { Authorization: tokenKeyword + token }
                });
                if (!resp.ok) {
                    alert('Não foi possível carregar o filme');
                    return;
                }
                const atual = await resp.json();
                const nome = (_a = prompt('Nome:', atual.nome)) !== null && _a !== void 0 ? _a : atual.nome;
                const data_visto = (_b = prompt('Data (YYYY-MM-DD):', atual.data_visto)) !== null && _b !== void 0 ? _b : atual.data_visto;
                const nota = (_c = prompt('Nota:', String(atual.nota))) !== null && _c !== void 0 ? _c : atual.nota;
                const duracao_min = (_d = prompt('Duração (min):', String(atual.duracao_min))) !== null && _d !== void 0 ? _d : atual.duracao_min;
                // 3) PUT com os campos editados
                const upd = await fetch(backendAddress + `filmes/${id}/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': tokenKeyword + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, data_visto, nota, duracao_min })
                });
                if (!upd.ok) {
                    alert('Falha ao atualizar.');
                    return;
                }
                // 4) Atualiza a lista
                buscarEPreencherFilmes();
            }
            catch (e) {
                alert((_e = e.message) !== null && _e !== void 0 ? _e : 'Erro ao editar.');
            }
        });
    });
}
/**
 * Envia a requisição DELETE para a API para um filme específico.
 */
function deletarFilme(id, token) {
    if (!confirm('Tem certeza que quer deletar este filme?')) {
        return;
    }
    fetch(backendAddress + `filmes/${id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': tokenKeyword + token,
        }
    })
        .then(response => {
        if (response.status === 204) { // 204 NO CONTENT (Sucesso)
            buscarEPreencherFilmes(); // Atualiza a lista
        }
        else {
            throw new Error('Falha ao deletar o filme.');
        }
    })
        .catch(error => alert(error.message));
}
//# sourceMappingURL=index.js.map