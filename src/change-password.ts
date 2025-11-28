// 'change-password.js' pelo 'tsc -w'

window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    const form = document.getElementById('change-password-form') as HTMLFormElement;
    const statusMsg = document.getElementById('mensagem-status') as HTMLDivElement;

    // se não há token, volta ao login (meio q protecao)
    if (!token) {
        window.location.replace('login.html');
        return;
    }

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        statusMsg.textContent = ''; // Limpar mensagens

        // pega os dados do formu
        const old_password = (document.getElementById('old_password') as HTMLInputElement).value;
        const new_password1 = (document.getElementById('new_password1') as HTMLInputElement).value;
        const new_password2 = (document.getElementById('new_password2') as HTMLInputElement).value;

        // valida o front
        if (new_password1 !== new_password2) {
            statusMsg.textContent = 'As novas senhas não conferem.';
            return;
        }
        // envia pro back o post pro change-password
        fetch(backendAddress + 'filmes/change-password/', {
            method: 'POST',
            headers: {
                'Authorization': tokenKeyword + token, // token de login
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                old_password: old_password,
                new_password1: new_password1,
                new_password2: new_password2
            })
        })
        .then(async response => {
            const data = await response.json(); // tenta ler a resposta JSON
            if (response.ok) {
                statusMsg.style.color = 'green';
                statusMsg.textContent = 'Senha alterada com sucesso!';

                // o backend enviou um novo token. localStorage atualizou
                localStorage.setItem('token', data.token); 

                form.reset();
            } else {
                // mostra o erro vindo do backend (ex: "Senha antiga incorreta")
                throw new Error(data.error || 'Erro desconhecido.');
            }
        })
        .catch(error => {
            statusMsg.style.color = 'red';
            statusMsg.textContent = error.message;
        });
    });
});