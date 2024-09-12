import express from 'express';

const app = express();
const port = 3000;

// Rota básica de teste
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});