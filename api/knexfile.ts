import { Knex } from 'knex';

const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: './src/data/database.sqlite' // Caminho para o arquivo do banco de dados
    },
    useNullAsDefault: true // Configuração necessária para SQLite
};

export default config;