import {sql} from './db.js'


sql`
CREATE TABLE pessoas (
    id TEXT PRIMARY KEY,
    pessoa_id SERIAL,
    nome VARCHAR(255) NOT NULL,
    nacionalidade VARCHAR(100),
    idade INTEGER
);
`.then(() => {
    console.log('Tabela criada')
})