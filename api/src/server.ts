import express from 'express';
import reminderRoutes from './routes/reminderRoutes';
import { createRemindersTable } from './migrations/createRemindersTable';

const app = express();
const port = 3000;

// Middleware para permitir JSON no body das requisições
app.use(express.json());

// Inicializar o banco de dados
createRemindersTable();

// Usando as rotas de lembretes
app.use('/api', reminderRoutes);

app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});