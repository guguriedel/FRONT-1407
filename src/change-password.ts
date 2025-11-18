// Este ficheiro será compilado para 'change-password.js' pelo 'tsc -w'

window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    const form = document.getElementById('change-password-form') as HTMLFormElement;
    const statusMsg = document.getElementById('mensagem-status') as HTMLDivElement;

    // 1. Proteger a página: Se não há token, volta ao login
    if (!token) {
        window.location.replace('login.html');
        return;
    }

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        statusMsg.textContent = ''; // Limpar mensagens

        // 2. Obter dados do formulário
        const old_password = (document.getElementById('old_password') as HTMLInputElement).value;
        const new_password1 = (document.getElementById('new_password1') as HTMLInputElement).value;
        const new_password2 = (document.getElementById('new_password2') as HTMLInputElement).value;

        // 3. Validação rápida no frontend
        if (new_password1 !== new_password2) {
            statusMsg.textContent = 'As novas senhas não conferem.';
            return;
        }

        // 4. Enviar para o backend (POST para 'filmes/change-password/')
        fetch(backendAddress + 'filmes/change-password/', {
            method: 'POST',
            headers: {
                'Authorization': tokenKeyword + token, // Envia o token de login
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                old_password: old_password,
                new_password1: new_password1,
                new_password2: new_password2
            })
        })
        .then(async response => {
            const data = await response.json(); // Tenta ler a resposta JSON
            if (response.ok) {
                // SUCESSO!
                statusMsg.style.color = 'green';
                statusMsg.textContent = 'Senha alterada com sucesso!';

                // O backend enviou um novo token. Atualizamos o localStorage.
                localStorage.setItem('token', data.token); 

                form.reset();
            } else {
                // ERRO!
                // Mostra o erro vindo do backend (ex: "Senha antiga incorreta")
                throw new Error(data.error || 'Erro desconhecido.');
            }
        })
        .catch(error => {
            statusMsg.style.color = 'red';
            statusMsg.textContent = error.message;
        });
    });
});