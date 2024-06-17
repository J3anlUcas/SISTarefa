const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const novaTarefa = await prisma.tarefas.create({
    data: {
        descricao: descricao,
        data_inicio: data_inicio,
        projeto: {
            connect: { id_projeto: user_responsavel },
        },
        user: {
            create: {
                Cargo: true, // Exemplo, ajuste conforme necessário
                user: {
                    connect: { id_usuario: usuarioId },
                },
            },
        },
    },
});


exports.create = async (req, res) => {

    try {
        var { projeto, data_inicio, user_responsavel, descricao, concluida } = req.body
        data_inicio = new Date(data_inicio).toISOString()

        var resProjeto = await prisma.projeto.findUnique({
            where: { nome: process },
        });

        if (!resProjeto[0]) return res.status(401).json({ mensagem: "digite um nome de um projeto existente." })

        var resUsuario = await prisma.user.findUnique({
            where: { id_usuario: usuarioId },
        });

        if (!resUsuario[0]) return res.status(401).json({ mensagem: "Selecione um usuario valido." })

        if (concluida) {



        }
    }
    catch {
        res.status(500).send()
    }
}
