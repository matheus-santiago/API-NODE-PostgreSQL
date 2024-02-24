import { randomUUID } from "crypto"
import {sql} from './db.js'

export class DatabasePostgres{
    async list(search){
       let pessoas

       if(search){
        pessoas = await sql`select * from pessoas where nome ilike ${'%'+search+'%'}`
       }else{
        pessoas = await sql`select * from pessoas`
       }
       return pessoas
    } 
    
    async create(pessoas){
        const pessoaId = randomUUID()
        const {nome, nacionalidade, idade} = pessoas

        await sql`insert into pessoas (id, nome, nacionalidade, idade) VALUES (${pessoaId}, ${nome}, ${nacionalidade}, ${idade})`
    }

    async update(id, pessoas){
        const {nome, nacionalidade, idade} = pessoas

        await sql`update pessoas set nome = ${nome}, nacionalidade = ${nacionalidade}, idade = ${idade} where id = ${id}`
    }

    async delete(id){
        await sql`delete from pessoas where id = ${id}`
    }
}