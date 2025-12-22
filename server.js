import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())


app.post('/produtos', async (req, res) => {

    await prisma.produto.create({
        data: {
            valor: Number(req.body.valor),
            tipo:  req.body.tipo,
            quant: Number(req.body.quant)
        }
    })
   

    res.status(201).json(req.body)
})

app.get('/produtos', async (req, res) => {
  const produtos = await prisma.produto.findMany()
  res.status(200).json(produtos)
})

app.put('/produtos/:id', async(req, res) =>{
    const { id } = req.params

    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: {
        tipo:  req.body.tipo,
        valor: Number(req.body.valor),
        quant: Number(req.body.quant)
      }
    })

    res.status(200).json(produtoAtualizado)
})

app.delete('/produtos/:id', async(req, res) =>{
    const { id } = req.params
    const produtoDeletado = await prisma.produto.delete({
        where: { id }
    })

    res.status(200).json(produtoDeletado)
})
try{
    app.listen(3000)
    console.log("Porta rodando")
}
catch{
    ("Porta não rodando")
}
/*
    1 Tipo de Rota (get, post, delete...)
    2 Endereço

    Objetivo: criar nossa API de produtos:
    - criar um produto
    - listar todos os produtos
    - editar um usuario
    - deletar um usuario
*/