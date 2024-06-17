/*
  Warnings:

  - Added the required column `projetoId_projeto` to the `tbl_tarefas` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[usuariosTarefas] DROP CONSTRAINT [usuariosTarefas_tarefaId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[usuariosTarefas] DROP CONSTRAINT [usuariosTarefas_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[tbl_tarefas] ADD [projetoId_projeto] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[tbl_tarefas] ADD CONSTRAINT [tbl_tarefas_projetoId_projeto_fkey] FOREIGN KEY ([projetoId_projeto]) REFERENCES [dbo].[tbl_projetos]([id_projeto]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[usuariosTarefas] ADD CONSTRAINT [usuariosTarefas_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[tbl_usuarios]([id_usuario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[usuariosTarefas] ADD CONSTRAINT [usuariosTarefas_tarefaId_fkey] FOREIGN KEY ([tarefaId]) REFERENCES [dbo].[tbl_tarefas]([id_tarefa]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
