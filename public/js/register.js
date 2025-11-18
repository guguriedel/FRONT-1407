"use strict";
// Lógica de registro - depende de constantes.ts
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const msgErro = document.getElementById('mensagem-erro');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        msgErro.textContent = ''; // Limpa mensagens anteriores
        // 1. Capturar dados do formulário
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password_confirm').value;
        // 2. Validação básica no frontend
        if (password !== passwordConfirm) {
            msgErro.textContent = "As senhas não conferem!";
            return;
        }
        // 3. Montar o objeto de dados
        const userData = {
            username: username,
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password,
            password_confirm: passwordConfirm
        };
        try {
            // 4. Enviar para o Backend
            const response = await fetch(backendAddress + 'filmes/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                // SUCESSO! O backend retorna o token e os dados do usuário
                // Vamos fazer login automático
                console.log("Registro realizado com sucesso!");
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    alert("Conta criada com sucesso! Você será redirecionado.");
                    window.location.replace('acervo.html'); // Vai para a página do acervo
                }
                else {
                    // Caso raro onde cria mas não retorna token, manda pro login
                    window.location.replace('login.html');
                }
            }
            else {
                // ERRO DO BACKEND (Ex: usuário já existe, senha fraca, etc)
                // O Django retorna erros detalhados, vamos tentar mostrá-los
                let erroTexto = data.detail || 'Erro ao registrar.';
                // Tenta formatar os erros do Django (que vêm como objeto)
                if (typeof data === 'object' && !data.detail) {
                    erroTexto = Object.entries(data)
                        .map(([campo, msgs]) => `${campo}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
                        .join('\n');
                }
                throw new Error(erroTexto);
            }
        }
        catch (error) {
            console.error(error);
            msgErro.textContent = error.message || "Erro de conexão com o servidor.";
        }
    });
});
//# sourceMappingURL=register.js.map