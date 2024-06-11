const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.create = async (req, res) => {
    try {
        var { nome, data_inicio, id_gerente } = req.body
        //testendo se o valor é nulo
        if (nome, data_inicio, id_gerente == null || typeof id_gerente !== Number) return res.status(201).json({ mensage: 'Digite um valor invalido.' })

        var searchGerente = await prisma.user.findMany({
            where: {
                id_usuario: id_gerente,
                AND: {
                    acesso: 0, OR: 1
                }
            }
        })
        //testando de o codigo do gerente é válido
        if (!searchGerente[0]) return res.status(201), json({ mensage: 'Esse usuario não existe ou não tem permissão para ser gerente' })
        res.status(200).json({
            projeto: nome,
            data_inicio: data_inicio,
            gerente: id_gerente
        })

    } catch (err) {
        res.status(500).send(err)
    }

}

exports.delete = async (req, res) => {
    try {
        var { codProjeto } = req.body
        if (codProjeto == null || typeof codProjeto !== Number) return res.json({ mensagem: 'Digite um valor válido.' })//caso seja nulo ou texto

        var resProjeto = await prisma.projeto.findUnique({
            where: {
                id_projeto: codProjeto
            }
        })

        if (!resProjeto[0]) {
            res.status(201).json({ mensagem: 'Projeto não encontrado.' })
        } else {
            await prisma.projeto.delete({
                where: {
                    id_projeto: codProjeto
                }
            })
            res.status(200).json({ mensagem: 'Projeto excluído!' })
        }

    }
    catch (err) {
        res.status(500).send(err)
    }
}

exports.read = async (req, res) => {
    try {
        var projetoFiltro = req.query.usuario

        if (!projetoFiltro) {
            var projeto = await prisma.projeto.findMany()

            if (!projeto) return res.status(201).json({ mensagem: 'não existe usuarios cadastrados na base.' })

            res.status(200).json({ usuarios })
        }
        else {
            var resUsuario = await prisma.projeto.findUnique({
                where: {
                    nome: projetoFiltro
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
        var nomeProjeto = req.body.nome
        var { dado, valor } = req.body

        var resProjeto = await prisma.projeto.findMany({
            where: {
                nome: nomeProjeto
            }
        })

        if (nomeProjeto, valor == null || !resProjeto[0]) return res.json({ mensagem: 'Digite um valor válido.' }) //caso não seja digitado algo ou um projeto inexistente

        switch (dado) {

            case 'nome':
                await prisma.projeto.update({
                    where: {
                        nome: nomeProjeto
                    },
                    data: {
                        nome: valor
                    }
                })
                res.status(200).json({ mensagem: `O nome do projeto ${nomeProjeto} foi alterado para ${valor}` })
                break;

            
            case 'gerente':
                var { id_gerente } = req.body

                var searchGerente = await prisma.user.findMany({
                    where: {
                        id_usuario: id_gerente,
                        AND: {
                            acesso: 0, OR: 1
                        }
                    }
                })
                //testando de o codigo do gerente é válido
                if (!searchGerente[0]) return res.status(201), json({ mensage: 'Esse usuario não existe!' })


                await prisma.projeto.update({
                    where: {
                        id_gerente: id_gerente
                    },
                    data: {
                        id_gerente: valor
                    }
                })

                res.status(200).json({
                    projeto: nome,
                    data_inicio: data_inicio,
                    gerente: id_gerente
                })
                res.status(200).json({ mensagem: `O gerente do projeto${nomeProjeto} foi alterado` })
                break;

            default:
                res.status(201).json({ mensagem: 'Não foi possivel achar esse campo para alteração' })
                break;
        }
    }
    catch {
        res.status(500).send()
    }

}