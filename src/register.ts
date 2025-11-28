// logica de registro - depende de constantes.ts

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form') as HTMLFormElement;
    const msgErro = document.getElementById('mensagem-erro') as HTMLDivElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        msgErro.textContent = ''; // limpa mensagens anteriores

        // captura dados do formulario
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const firstName = (document.getElementById('first_name') as HTMLInputElement).value;
        const lastName = (document.getElementById('last_name') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const passwordConfirm = (document.getElementById('password_confirm') as HTMLInputElement).value;

        // valida o frontend
        if (password !== passwordConfirm) {
            msgErro.textContent = "As senhas não conferem!";
            return;
        }

        // monta o objeto de dados
        const userData = {
            username: username,
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password,
            password_confirm: passwordConfirm
        };

        try {
            // envia pro back
            const response = await fetch(backendAddress + 'filmes/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                // o back retorna o token e os dados do usuário
                // login automático
                console.log("Registro realizado com sucesso!");
                
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    alert("Conta criada com sucesso! Você será redirecionado.");
                    window.location.replace('acervo.html'); // vai para a página do acervo
                } else {
                    // cria mas não retorna token, manda pro login
                    window.location.replace('login.html');
                }

            } else {
                //  usuário já existe, senha fraca, etc
                let erroTexto = data.detail || 'Erro ao registrar.';
                
                // tenta formatar os erros do django 
                if (typeof data === 'object' && !data.detail) {
                    erroTexto = Object.entries(data)
                        .map(([campo, msgs]) => `${campo}: ${Array.isArray(msgs) ? (msgs as string[]).join(', ') : msgs}`)
                        .join('\n');
                }
                
                throw new Error(erroTexto);
            }

        } catch (error: any) {
            console.error(error);
            msgErro.textContent = error.message || "Erro de conexão com o servidor.";
        }
    });
});