const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.create = async (req, res) => {
    try {
        const { nome, usuario, email, acesso } = req.body
        const hashSenha = await bcrypt.hash(req.body.senha, 20)

        var resUsuario = prisma.user.findMany({
            where: {
                usuario: usuario
            }
        })
        var resEmail = prisma.user.findMany({
            where: {
                email: email
            }
        })

        if (!resUsuario & !resEmail) {
            prisma.user.create({
                data: {
                    usuario: usuario,
                    senha: hashSenha,
                    nome: nome,
                    email: email,
                    acesso: acesso
                }
            })
        }
        else {
            res.json({ mensagem: 'usuario ou email inválido.' })
        }

    } catch {
        res.status(500).send()
    }
}

exports.delete = (req, res) => {
    var { id_usuario } = req.body

    if (!id_usuario || typeof id_usuario != "texto") return res.json({ mensagem: 'Digite algo válido.' })//caso seja nulo ou texto

    var resUsuario = prisma.user.findUnique({
        where: {
            id_usuario
        }
    })

    if (!resUsuario) {
        res.status(201).json({ mensagem: 'Esse usuario não existe!' })
    } else {
        prisma.user.delete({
            where: {
                id_usuario: id_usuario
            }
        })
        res.status(200).json({ mensagem: 'usuario deletado.' })
    }
}

