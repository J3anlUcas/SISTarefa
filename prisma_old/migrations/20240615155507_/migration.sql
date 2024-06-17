BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tbl_usuarios] (
    [id_usuario] INT NOT NULL IDENTITY(1,1),
    [usuario] NVARCHAR(1000) NOT NULL,
    [nome] VARCHAR(100) NOT NULL,
    [senha] CHAR(200) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
    [data_criacao] DATETIME2 NOT NULL CONSTRAINT [tbl_usuarios_data_criacao_df] DEFAULT CURRENT_TIMESTAMP,
    [data_modificacao] DATETIME2,
    [acesso] INT NOT NULL CONSTRAINT [tbl_usuarios_acesso_df] DEFAULT 2,
    CONSTRAINT [tbl_usuarios_pkey] PRIMARY KEY CLUSTERED ([id_usuario]),
    CONSTRAINT [tbl_usuarios_usuario_key] UNIQUE NONCLUSTERED ([usuario]),
    CONSTRAINT [tbl_usuarios_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[tbl_projetos] (
    [id_projeto] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [data_inicio] DATETIME2 NOT NULL,
    [id_gerente] INT NOT NULL,
    CONSTRAINT [tbl_projetos_pkey] PRIMARY KEY CLUSTERED ([id_projeto]),
    CONSTRAINT [tbl_projetos_nome_key] UNIQUE NONCLUSTERED ([nome])
);

-- CreateTable
CREATE TABLE [dbo].[tbl_tarefas] (
    [id_tarefa] INT NOT NULL IDENTITY(1,1),
    [data_criacao] DATETIME2 NOT NULL CONSTRAINT [tbl_tarefas_data_criacao_df] DEFAULT CURRENT_TIMESTAMP,
    [data_modificacao] DATETIME2,
    [data_inicio] DATETIME2,
    [data_termino] DATETIME2,
    [descricao] VARCHAR(500) NOT NULL,
    [concluida] BIT NOT NULL CONSTRAINT [tbl_tarefas_concluida_df] DEFAULT 0,
    CONSTRAINT [tbl_tarefas_pkey] PRIMARY KEY CLUSTERED ([id_tarefa])
);

-- CreateTable
CREATE TABLE [dbo].[usuariosTarefas] (
    [Cargo] BIT NOT NULL CONSTRAINT [usuariosTarefas_Cargo_df] DEFAULT 0,
    [userId] INT NOT NULL,
    [tarefaId] INT NOT NULL,
    CONSTRAINT [usuariosTarefas_pkey] PRIMARY KEY CLUSTERED ([userId],[tarefaId])
);

-- AddForeignKey
ALTER TABLE [dbo].[tbl_projetos] ADD CONSTRAINT [tbl_projetos_id_gerente_fkey] FOREIGN KEY ([id_gerente]) REFERENCES [dbo].[tbl_usuarios]([id_usuario]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[usuariosTarefas] ADD CONSTRAINT [usuariosTarefas_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[tbl_usuarios]([id_usuario]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[usuariosTarefas] ADD CONSTRAINT [usuariosTarefas_tarefaId_fkey] FOREIGN KEY ([tarefaId]) REFERENCES [dbo].[tbl_tarefas]([id_tarefa]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
