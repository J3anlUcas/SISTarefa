const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.users = async (req, res) => {

    var { filtro1, filtro2, filtro3, valor } = req.body
    var { data_inicio, data_fim } = req.body

    if (!filtro1) {
        res.status(401).json({ mensagem: "digite o que será filtrado!" })
    }

    if (valor != null) {

        switch (filtro1) {
            case 'nome':
                switch (filtro2) {
                    case 'usuario':

                        break;
                    case 'email':

                        break;
                    case 'data':

                        break;
                    default:
                    

                        res.status(200).render('relatorioUsers', ({}))
                        break;
                }

                break;
            case 'usuario':
                switch (filtro2) {
                    case 'usuario':

                        break;
                    case 'email':

                        break;
                    case 'data':

                        break;
                    default:
                        res.status(200).render('relatorioUsers', ({}))
                        break;
                }

                break
            case 'email':
                switch (filtro2) {
                    case 'usuario':

                        break;
                    case 'email':

                        break;
                    case 'data':

                        break;
                    default:
                        res.status(200).render('relatorioUsers', ({}))
                        break;
                }
                break
            case 'data':
                switch (filtro2) {
                    case 'usuario':

                        break;
                    case 'email':

                        break;
                    case 'data':

                        break;
                    default:
                        res.status(200).render('relatorioUsers', ({}))
                        break;
                }
                break
            default:
                break;
        }
    }
}