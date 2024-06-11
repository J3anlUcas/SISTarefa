require('dotenv').config()
const { SECRET } = process.env

exports.validarToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const [, token] = authorization.split(' ')
        
        if (!token) {
            return res.status(401).json({ mensagem: "Não autorizado!" })
        }

        jwt.verify(token, SECRET)

        next()
    }
    catch {
        res.status(500).send()
    }
}

