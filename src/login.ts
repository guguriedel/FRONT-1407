// AcervoApp/src/login.ts
// Lógica de login - depende de constantes.ts

document.addEventListener('DOMContentLoaded', () => {
    console.log('Página de login carregada!');
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const mensagemErro = document.getElementById('mensagem-erro') as HTMLDivElement;

    loginForm.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Impede o envio tradicional do formulário

        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        fetch(backendAddress + 'filmes/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Usuário ou senha inválidos.');
            }
        })
        .then((data: { token: string }) => {
            // Sucesso! Armazena o token no navegador
            localStorage.setItem('token', data.token);
            // Redireciona para a página principal
            window.location.replace('acervo.html');
        })
        .catch(error => {
            mensagemErro.textContent = error.message;
        });
    });
});