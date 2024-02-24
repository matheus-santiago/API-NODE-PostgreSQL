import {fastify} from 'fastify'
//import {Databasememory} from './database-memory.js'
import { DatabasePostgres } from './databasePostgres.js'

const server = fastify() 

//const database = new Databasememory()

const database = new DatabasePostgres

server.post('/pessoas', async(request, reply) => {
    const {nome, nacionalidade, idade} = request.body

    await database.create({
        nome,
        nacionalidade,
        idade,
    })

    return reply.status(201).send()
})

server.get('/pessoas',async (request) => {

    const search = request.query.search

    console.log(search)

    const pessoas = await database.list(search)

    return pessoas
})

server.put('/pessoas/:id', async (request, reply) => {
    const pessoaId = request.params.id
    const {nome, nacionalidade, idade} = request.body

    await database.update(pessoaId, {
        nome,
        nacionalidade,
        idade
    })

    return reply.status(204).send()
})

server.delete('/pessoas/:id',(request, reply) => {
    const pessoa_id = request.params.id

    database.delete(pessoa_id)
    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})