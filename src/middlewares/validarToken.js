require('dotenv').config()
const { SECRET } = process.env
const jwt = require('jsonwebtoken')

exports.validarToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ mensagem: "token inválido!" })
        }
        const [, token] = authorization.split(" ")

        jwt.verify(token, SECRET, { expiresIn: 300 })

        return next()
    }
    catch {
        res.status(500).send()
    }
}