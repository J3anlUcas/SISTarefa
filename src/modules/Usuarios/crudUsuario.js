const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.create = async (req, res) => {
    try {
        const { nome, usuario, email, acesso } = req.body
        const hashSenha = await bcrypt.hash(req.body.senha, 20)

        var resUsuario = await prisma.user.findMany({
            where: {
                usuario: usuario
            }
        })
        var resEmail = await prisma.user.findMany({
            where: {
                email: email
            }
        })

        if (!resUsuario & !resEmail) {
            await prisma.user.create({
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

exports.delete = async (req, res) => {
    var { id_usuario } = req.body

    if (!id_usuario || typeof id_usuario != "texto") return res.json({ mensagem: 'Digite algo válido.' })//caso seja nulo ou texto

    var resUsuario = await prisma.user.findUnique({
        where: {
            id_usuario
        }
    })

    if (!resUsuario) {
        res.status(201).json({ mensagem: 'Esse usuario não existe!' })
    } else {
        await prisma.user.delete({
            where: {
                id_usuario: id_usuario
            }
        })
        res.status(200).json({ mensagem: 'usuario deletado.' })
    }
}

exports.read = async (req, res) => {
    try {
        var filtroUser = req.params.usuario

        if (!filtroUser) {
            var usuarios = await prisma.user.findMany()
            if (!usuarios) return res.status(201).json({ mensagem: 'não existe usuarios cadastrados na base.' })
            res.status(200).json({ usuarios })
        }
        else {
            var resUsuario = await prisma.user.findUnique({
                where: {
                    usuario: filtroUser
                }
            })

            res.status(200).json({ usuarios: resUsuario })
        }
    } catch {
        res.status(500).send()
    }
}

exports.update = async (req, res) => {
    try {
        var usuario = req.body.usuario
        var { dado, valor } = req.query

        var resUsuario = await prisma.user.findMany({
            where: {
                usuario: usuario
            }
        })

        if (!usuario || !resUsuario) return res.json({ mensagem: 'Digite um usuario válido.' }) //caso não seja digitado algo ou um usuario inexistente

        switch (dado) {

            case 'nome':
                await prisma.user.update({
                    where: {
                        usuario: usuario
                    },
                    data: {
                        nome: valor
                    }
                })
                res.status(200).json({ mensagem: `O nome do usuario ${usuario} foi alterado para ${valor}` })
                break;

            // case 'senha':
            // break
            case 'acesso':
                await prisma.user.update({
                    where: {
                        usuario: usuario
                    },
                    data: {
                        acesso: valor
                    }
                })
                res.status(200).json({ mensagem: `O acesso do usuario ${usuario} foi alterado para ${valor}` })
                break;

            default:
                res.status(201).json({ mensagem: 'Não foi possivel achar esse campo para alteração' })
                break;
        }
    } catch {
        res.status(500).send()
    }

}