const { PrismaClient } = require('@prisma/client')
const { json } = require('stream/consumers')
const prisma = new PrismaClient()

exports.create = async (req, res) => {
    try {
        var { nome, data_inicio, id_gerente } = req.body
        if (!nome || !data_inicio || !id_gerente || typeof id_gerente == "texto") return res.status(201).json({ mensage: 'valor invalido.' })

        var searchGerente = prisma.user.findUnique({
            where: {
                id_usuario: id_gerente,
                AND: {
                    acesso: 1
                }
            },
            select: {
                id_usuario: true
            }
        })
        if (!searchGerente) return res.status(201), json({ mensage: 'Esse usuario não existe ou não tem permissão para ser gerente' })
        res.status(200).json({
            projeto: nome,
            data_inicio: data_inicio,
            gerente: id_gerente
        })

    } catch {
        res.status(500).send()
    }

}