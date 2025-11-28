// logica de solicitacao de reset de senha\

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reset-form') as HTMLFormElement;
    const msgDiv = document.getElementById('mensagem') as HTMLDivElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        msgDiv.textContent = 'Enviando...';
        msgDiv.style.color = 'blue';

        const email = (document.getElementById('email') as HTMLInputElement).value;

        try {
            // endpoint padrão da biblioteca é password_reset/
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
            } else {
                throw new Error('Erro ao solicitar reset.');
            }

        } catch (error: any) {
            console.error(error);
            msgDiv.style.color = 'red';
            msgDiv.textContent = "Erro ao conectar com o servidor.";
        }
    });
});