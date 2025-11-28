// AcervoApp/src/index.ts
// depende de constantes.ts

let token: string | null = null;

// roda quando a pagina carrega
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página de acervo carregada!');

    token = localStorage.getItem('token');

    const tabelaCorpoEl = document.getElementById('tabela-filmes-corpo') as HTMLTableSectionElement;
    if (!tabelaCorpoEl) return;

    const tabelaCorpo = tabelaCorpoEl;
    const logoutButton = document.getElementById('logout-button') as HTMLButtonElement | null;
    const novoFilmeForm = document.getElementById('novo-filme-form') as HTMLFormElement | null;
    const novoFilmeErro = document.getElementById('novo-filme-erro') as HTMLDivElement | null;

    // verifica o login
    if (!token) {
        // se não tem token, joga o usuário p a pag de login
        window.location.replace('login.html');
        return; // Para a execução do script
    }

    // configuração dos eventos

    // botao de logout
    logoutButton?.addEventListener('click', () => {
        localStorage.removeItem('token'); // remove o token
        window.location.replace('login.html'); // volta ao login
    });

    // configurar o formulário de novo filme
    novoFilmeForm?.addEventListener('submit', (evento) => {
        evento.preventDefault();
        if(novoFilmeErro) novoFilmeErro.textContent = ''; // limpa erros antigos

        // dados do formulário
        const nome = (document.getElementById('filme-nome') as HTMLInputElement).value;
        const data_visto = (document.getElementById('filme-data') as HTMLInputElement).value;
        const nota = (document.getElementById('filme-nota') as HTMLInputElement).value;
        const duracao_min = (document.getElementById('filme-duracao') as HTMLInputElement).value;

        // enviar para a  (POST)
        fetch(backendAddress + 'filmes/', {
            method: 'POST',
            headers: {
                'Authorization': tokenKeyword + token, // envia o Token
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
            if (response.status === 201) { // 201 cirado, ou seja sucesso
                novoFilmeForm.reset(); // limpa o formulário
                buscarEPreencherFilmes(); // atualiza a lista de filmes
            } else if (response.status === 401) { // Não autorizado
                localStorage.removeItem('token');
                window.location.replace('login.html');
                throw new Error('Sessão expirada.');
            } else {
                throw new Error('Erro ao cadastrar filme. Verifique os campos.');
            }
        })
        .catch(error => {
            if(novoFilmeErro) novoFilmeErro.textContent = error.message;
        });
    });

    // buscar e preencher a lista de filmes assim que a página carrega
    buscarEPreencherFilmes();
});

// busca a lista de filmes na API (GET) e preenche a tabela HTML

function buscarEPreencherFilmes(): void {
    if (!token) return; // se não tiver token, não faz nada

    const tabelaCorpo = document.getElementById('tabela-filmes-corpo') as HTMLTableSectionElement || null;

    fetch(backendAddress + 'filmes/', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token // envia token
        }
    })
    .then(response => {
        if (response.status === 401) { // quando nao autoriza
            localStorage.removeItem('token');
            window.location.replace('login.html');
            throw new Error('Sessão expirada.');
        }
        return response.json();
    })
    .then(filmes => {
        // preencher a tabela com os filmes

        if (!tabelaCorpo) return;
        tabelaCorpo.innerHTML = ''; //limpa

        filmes.forEach((filme: any) => {
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

        // adicionaa logica aos botoes de delete e edit
        adicionarEventosEditar();
        adicionarEventosDeletar();
    })
    .catch(error => console.error('Erro ao buscar filmes:', error));
}

// adiciona os "ouvintes" de evento de clique a todos os botões delet
function adicionarEventosDeletar(): void {
    if (!token) return;

    const botoesDeletar = document.querySelectorAll('.delete-btn');
    botoesDeletar.forEach(botao => {
        botao.addEventListener('click', () => {
            const filmeId = (botao as HTMLElement).dataset.id;
            if (filmeId) {
                deletarFilme(filmeId, token!); // token! (non-null assertion) pq já verificamos
            }
        });
    });
}

function adicionarEventosEditar(): void {
    if(!token) return;

    const botoesEditar = document.querySelectorAll('.edit-btn');
    botoesEditar.forEach(botao=> {
        botao.addEventListener('click', async() => {
            const id = (botao as HTMLButtonElement).dataset.id!;

            try{
                const resp = await fetch(backendAddress + `filmes/${id}/`,{
                    method: 'GET',
                    headers: {Authorization: tokenKeyword + token!}
                });
                if(!resp.ok) {alert('Não foi possível carregar o filme'); return;}
                const atual = await resp.json();

                const nome = prompt('Nome:', atual.nome) ?? atual.nome;
                const data_visto = prompt('Data (YYYY-MM-DD):', atual.data_visto) ?? atual.data_visto;
                const nota = prompt('Nota:', String(atual.nota)) ?? atual.nota;
                const duracao_min = prompt('Duração (min):', String(atual.duracao_min)) ?? atual.duracao_min;


                // PUT com os campos editados
                const upd = await fetch(backendAddress + `filmes/${id}/`, {
                  method: 'PUT',
                  headers: {
                    'Authorization': tokenKeyword + token!,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ nome, data_visto, nota, duracao_min })
                });
                if (!upd.ok) { alert('Falha ao atualizar.'); return; }

                // atualiza a lista
                buscarEPreencherFilmes();
              } catch (e: any) {
                alert(e.message ?? 'Erro ao editar.');
                }

                });
            });
}

// envia a requisição DELETE para a API para um filme específico
function deletarFilme(id: string, token: string): void {
    if (!confirm('Tem certeza que quer deletar este filme?')) {
        return;
    }

    fetch(backendAddress + `filmes/${id}/`, { // usa o endpoint de detalhe
        method: 'DELETE',
        headers: {
            'Authorization': tokenKeyword + token,
        }
    })
    .then(response => {
        if (response.status === 204) { // 204 NO CONTENT (Sucesso)
            buscarEPreencherFilmes(); // atualiza a lista
        } else {
            throw new Error('Falha ao deletar o filme.');
        }
    })
    .catch(error => alert(error.message));
}
