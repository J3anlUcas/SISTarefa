const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.users = async (req, res) => {

    var { filtro, filtro2, igual, contem } = req.body
    var { data_inicio, data_fim } = req.body

    if (!filtro) {
        res.status(401).json({ mensagem: "digite oque será filtrado!" })
    }

    if (igual != null) {

        switch (filtro) {
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
    if (contem != null) {

        switch (filtro) {
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