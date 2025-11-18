// Lógica de confirmação de reset
// Assume que backendAddress está disponível globalmente

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('confirm-form') as HTMLFormElement;
    const msgDiv = document.getElementById('mensagem') as HTMLDivElement;
    const tokenInput = document.getElementById('token') as HTMLInputElement;

    // 1. Pegar o token da URL (ex: ?token=12345)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenUrl = urlParams.get('token');

    if (tokenUrl) {
        tokenInput.value = tokenUrl;
    } else {
        msgDiv.style.color = 'red';
        msgDiv.textContent = 'Token não encontrado na URL.';
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const token = tokenInput.value;

        if (!token) {
            alert("Erro: Token inválido.");
            return;
        }

        try {
            // O endpoint de confirmação da biblioteca
            const response = await fetch(backendAddress + 'filmes/password_reset/confirm/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    password: password
                })
            });

            if (response.ok) {
                alert('Senha alterada com sucesso!');
                window.location.replace('login.html');
            } else {
                const data = await response.json();
                // A biblioteca costuma retornar erros detalhados em 'password' ou 'token'
                let errorMsg = 'Erro ao redefinir.';
                if (data.password) errorMsg = data.password[0];
                if (data.token) errorMsg = data.token[0];
                
                throw new Error(errorMsg);
            }

        } catch (error: any) {
            console.error(error);
            msgDiv.style.color = 'red';
            msgDiv.textContent = error.message;
        }
    });
});