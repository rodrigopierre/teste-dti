import express from 'express';
import cors from 'cors';
import reminderRoutes from './routes/reminderRoutes';
import { createRemindersTable } from './migrations/createRemindersTable';

const app = express();
const port = 3000;

app.use(express.json());

// Altere aqui caso a sua porta seja outra:
app.use(cors({
    origin: 'http://localhost:5173',
}));


// Inicializa o banco de dados
createRemindersTable();

// Usando as rotas de lembretes
app.use('/api', reminderRoutes);

app.get('/', (req, res) => {               
    res.send('API está funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});