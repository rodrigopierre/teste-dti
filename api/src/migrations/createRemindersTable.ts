import db from '../db';

export const createRemindersTable = async () => {        // Cria um banco de dados quando ele não existir
    const exists = await db.schema.hasTable('reminders');
    if (!exists) {
        await db.schema.createTable('reminders', (table) => {
            table.increments('id').primary();
            table.string('date').notNullable();
            table.string('name').notNullable();
        });
        console.log('Tabela "reminders" criada!');
    }
};