const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.createTarefa = async (req, res) => {

    try {
        var { projeto, data_inicio, user_responsavel, descricao, concluida } = req.body
        data_inicio = new Date(data_inicio).toISOString()

        var resProjeto = await prisma.projeto.findUnique({
            where: { nome: projeto },
        });

        if (!resProjeto[0]) return res.status(401).json({ mensagem: "digite um nome de um projeto existente." })

        var resUsuario = await prisma.user.findUnique({
            where: { id_usuario: usuarioId },
        });

        if (!resUsuario[0]) return res.status(401).json({ mensagem: "Selecione um usuario existente." })

        const novaTarefa = await prisma.tarefas.create({
            data: {
                descricao: descricao,
                data_inicio: data_inicio,
                concluida,
                projeto: {
                    connect: { id_projeto: user_responsavel },
                },
                user: {
                    create: {
                        Cargo: true,
                        user: {
                            connect: { id_usuario: user_responsavel },
                        },
                    },
                },
            },
        });
        res.status(400).json({ mensagem: "Tarefa criada com sucesso." })
    }
    catch {
        res.status(500).send()
    }
}

exports.addUsuarios = async (req, res) => {
    try {
        var { id_tarefa, user_participante } = req.body

        var pesquisaIdTarefa = await prisma.tarefas.findUnique({
            where: { id_tarefa: id_tarefa }
        })
        if (!pesquisaIdTarefa[0]) return res.status(401).json({ mensagem: "Este usuario não existe" })

        var createUsurioParticipante = await prisma.usuariosTarefas.create({
            data: {
                Cargo: false,
                tarefaId: id_tarefa,
                userId: user_participante
            }
        })

        res.status(400).json({ mensagem: "usuario adicionado com sucesso" })

    } catch {
        res.status(500).send()
    }
}

exports.update = async (req, res) => {
    try {
        var { id_tarefa, dado, valor } = req.body

        var pesquisarIdTarefa = await prisma.tarefas.findUnique({
            where: { id_tarefa }
        })

        if (!pesquisarIdTarefa[0]) return res.status(401).json({ mensagem: "tarefa não encontrada" })
        if (!dado) return res.status(401).json({ mensagem: "Digite o que será alterado." })
        if (!valor) return res.status(401).json({ mensagem: "Digite um valor" })

        switch (dado) {
            case "data_inicio":
                valor = new Date(valor).toISOString()

                await prisma.tarefas.update({
                    where: { id_tarefa },
                    data: { data_inicio: valor }
                })
                res.status(200).json({ mensagem: "Atualizado com sucesso" })
                break;
            case "data_termino":
                valor = new Date(valor).toISOString()

                await prisma.tarefas.update({
                    where: { id_tarefa },
                    data: { data_termino: valor }
                })
                res.status(200).json({ mensagem: "Atualizado com sucesso" })
                break
            case "concluida":

                await prisma.tarefas.update({
                    where: { id_tarefa },
                    data: { concluida: valor }
                })
                res.status(200).json({ mensagem: "Atualizado com sucesso" })
                break
            case "descrição":

                await prisma.tarefas.update({
                    where: { id_tarefa },
                    data: { descricao: valor }
                })
                res.status(200).json({ mensagem: "Atualizado com sucesso" })
                break
            case "usuario_responsável":

                valor = Number(valor)

                await prisma.usuariosTarefas.update({
                    where: {
                        tarefaId: id_tarefa, AND: {
                            userId: valor
                        }
                    },
                    data: { userId: valor }

                })
                res.status(200).json({ mensagem: "Atualizado com sucesso" })
                break
            case "usuario_participante":

                valor = Number(valor)

                await prisma.usuariosTarefas.update({
                    where: {
                        tarefaId: id_tarefa, AND: {
                            tarefaId: valor
                        }
                    },
                    data: { tarefaId: valor }

                })
                res.status(200).json({ mensagem: "Atualizado com sucesso" })

                break
            default:
                res.status(401).json({ mensagem: "erro em dado" })
                break;
        }



    } catch {
        res.status(500).send()
    }

}

exports.delete = async (req, res) => {
    try {
        var { id_tarefa } = req.body

        var pesquisaIdTarefa = await prisma.tarefas.findUnique({
            where: { id_tarefa }
        })
        if (!pesquisaIdTarefa[0]) return res.status(401).json({ mensagem: "tarefa não encontrada" })

        var deleteTarefa = await prisma.tarefas.delete({
            where: { id_tarefa },
            include: { user: { where: { tarefaId: id_tarefa } } }
        })

        res.status(200).json({ mensagem: "tarefa excluida com sucesso!" })

    } catch {
        res.status(500).send()
    }
}

exports.read = async (req, res) => {
    try {
        var tarefas = await prisma.tarefas.findMany({
            select: {
                data_inicio,
                data_termino,
                descricao,
                projeto: {
                    select: {
                        nome,
                        data_inicio,
                        gerente: { select: { nome } }
                    }
                },
                user: {
                    select:
                    {
                        user:
                        {
                            select:
                            {
                                nome,
                                email,
                                acesso
                            }
                        }
                    }
                }
            }
        })

        res.status(200).json({ tarefas })
    } catch {
        res.status(500).send()
    }
}