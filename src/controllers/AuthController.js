const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

require('dotenv').config()
const { SECRET } = process.env


exports.login = async (req, res) => {
    try {
        var validarUsuario = await prisma.user.findUnique({
            where: {
                usuario: req.body.usuario
            }
        })
        if (validarUsuario == null) {
            return res.status(401).json({ mensagem: "Credenciais inválidas." })
        }

        const validarSenha = bcrypt.compareSync(req.body.senha, validarUsuario.senha)

        if (!validarSenha) {
            return res.status(401).json({ mensagem: "Credenciacias inválidas." })
        }

        const { id_usuario, acesso, usuario, email } = validarUsuario
        const token = jwt.sign({ id_usuario, acesso, usuario, email }, SECRET)

        res.status(200).json({
            statusCode: 200,
            mensagem: "Login realizado com sucesso!",
            data: { token }
        })


    }
    catch {
        res.status(500).send()
    }
}