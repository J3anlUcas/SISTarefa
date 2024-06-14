const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.creat = async (req, res) => {
    try {
        const { senha, nome, usuario, email, acesso } = req.body
        
        const saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);
        console.log(salt);
       
        const hashSenha = await bcrypt.hash(req.body.senha, salt)
        if (nome,senha,usuario,email == null) return res.status(201).json({ mensagem: 'Digite um valor valido.' })

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
        

        if (!resUsuario[0] & !resEmail[0]) {
            await prisma.user.create({
                data: {
                    usuario: usuario,
                    senha: hashSenha,
                    nome: nome,
                    email: email,
                    acesso: acesso
                }
            })
            res.status(200).json({ mensagem: 'usuario criado com sucesso' })
        }
        else {
            res.json({ mensagem: 'usuario ou email já está em uso' })
        }

    } catch {
        res.status(500).send()
    }
}

exports.delete = async (req, res) => {
    var { id_usuario } = req.body

    if (id_usuario == null || typeof id_usuario !== Number) return res.json({ mensagem: 'Digite um valor válido.' })//caso seja nulo ou texto

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
        var filtroUser = req.query.usuario

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
        var { dado, valor } = req.body

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