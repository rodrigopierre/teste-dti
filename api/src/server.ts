import express from 'express';
import cors from 'cors';
import reminderRoutes from './routes/reminderRoutes';
import { createRemindersTable } from './migrations/createRemindersTable';

const app = express();
const port = 3000;

// Middleware para permitir JSON no body das requisições
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173',
}));


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