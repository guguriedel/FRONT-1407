"use strict";
// Lógica de solicitação de reset de senha
// Assume que backendAddress está disponível globalmente (via constantes.js)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reset-form');
    const msgDiv = document.getElementById('mensagem');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        msgDiv.textContent = 'Enviando...';
        msgDiv.style.color = 'blue';
        const email = document.getElementById('email').value;
        try {
            // O endpoint padrão da biblioteca é 'password_reset/' (sem 'filmes/' antes, 
            // a menos que tenhamos colocado o include dentro de 'filmes/' no urls.py)
            // Vamos confirmar: no seu urls.py, você incluiu dentro de 'filmes/', então é:
            const response = await fetch(backendAddress + 'filmes/password_reset/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            if (response.ok) {
                msgDiv.style.color = 'green';
                msgDiv.textContent = 'Email enviado! Verifique seu console (no backend) para ver o token.';
                form.reset();
            }
            else {
                throw new Error('Erro ao solicitar reset.');
            }
        }
        catch (error) {
            console.error(error);
            msgDiv.style.color = 'red';
            msgDiv.textContent = "Erro ao conectar com o servidor.";
        }
    });
});
//# sourceMappingURL=password-reset.js.map