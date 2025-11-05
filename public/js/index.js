"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    const tabelaCorpo = document.getElementById('tabela-filmes-corpo');
    const logoutButton = document.getElementById('logout-button');
    // 1. Verificar se o usuário está logado
    if (!token) {
        // Se não tem token, chuta o usuário para a página de login
        window.location.replace('login.html');
        return;
    }
    // 2. Configurar o botão de Logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.replace('login.html');
    });
    // 3. Buscar os filmes na API (endpoint protegido)
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
        // 4. Preencher a tabela com os filmes
        tabelaCorpo.innerHTML = ''; // Limpa a tabela
        filmes.forEach((filme) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${filme.nome}</td>
                <td>${filme.data_visto}</td>
                <td>${filme.nota}</td>
                <td>${filme.duracao_min}</td>
            `;
            tabelaCorpo.appendChild(tr);
        });
    })
        .catch(error => console.error('Erro ao buscar filmes:', error));
});
//# sourceMappingURL=index.js.map