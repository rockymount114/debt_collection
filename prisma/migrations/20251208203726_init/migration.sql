BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(50) NOT NULL,
    [email] NVARCHAR(100) NOT NULL,
    [passwordHash] NVARCHAR(255) NOT NULL,
    [fullName] NVARCHAR(100),
    [role] NVARCHAR(1000) NOT NULL,
    [isActive] BIT NOT NULL CONSTRAINT [users_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [lastLogin] DATETIME2,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[bill_assignments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [billId] NVARCHAR(50) NOT NULL,
    [userId] INT NOT NULL,
    [assignedAt] DATETIME2 NOT NULL CONSTRAINT [bill_assignments_assignedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [assignedBy] INT NOT NULL,
    CONSTRAINT [bill_assignments_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [bill_assignments_billId_key] UNIQUE NONCLUSTERED ([billId])
);

-- CreateTable
CREATE TABLE [dbo].[queue_assignments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [customerId] VARCHAR(50) NOT NULL,
    [queueName] VARCHAR(50) NOT NULL,
    [collectorId] INT,
    [status] VARCHAR(50) NOT NULL CONSTRAINT [queue_assignments_status_df] DEFAULT 'Active',
    [followUpDate] DATE,
    [amountDue] DECIMAL(15,2) NOT NULL,
    [creditsAvailable] DECIMAL(15,2) NOT NULL,
    [lastActivityDate] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [queue_assignments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [queue_assignments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[collection_activities] (
    [id] INT NOT NULL IDENTITY(1,1),
    [customerId] VARCHAR(50) NOT NULL,
    [customerSource] VARCHAR(10) NOT NULL,
    [activityType] VARCHAR(50) NOT NULL,
    [activityDate] DATETIME2 NOT NULL,
    [performedBy] INT NOT NULL,
    [contactMethod] VARCHAR(50),
    [contactOutcome] VARCHAR(50),
    [notes] TEXT,
    [amountDiscussed] DECIMAL(15,2),
    [promiseAmount] DECIMAL(15,2),
    [promiseDate] DATE,
    [nextAction] VARCHAR(50),
    [nextActionDate] DATE,
    [statusChange] VARCHAR(50),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [collection_activities_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [collection_activities_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[collection_tasks] (
    [id] INT NOT NULL IDENTITY(1,1),
    [customerId] VARCHAR(50) NOT NULL,
    [customerSource] VARCHAR(10) NOT NULL,
    [assignedTo] INT NOT NULL,
    [taskType] VARCHAR(50) NOT NULL,
    [taskDescription] TEXT,
    [dueDate] DATE NOT NULL,
    [priority] NVARCHAR(1000) NOT NULL CONSTRAINT [collection_tasks_priority_df] DEFAULT 'Normal',
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [collection_tasks_status_df] DEFAULT 'Pending',
    [completedDate] DATETIME2,
    [completedBy] INT,
    [notes] TEXT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [collection_tasks_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [collection_tasks_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[queue_definitions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [queueName] VARCHAR(50) NOT NULL,
    [agingMin] INT,
    [agingMax] INT,
    [description] TEXT,
    [sortOrder] INT,
    [isActive] BIT NOT NULL CONSTRAINT [queue_definitions_isActive_df] DEFAULT 1,
    CONSTRAINT [queue_definitions_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [queue_definitions_queueName_key] UNIQUE NONCLUSTERED ([queueName])
);

-- CreateTable
CREATE TABLE [dbo].[system_settings] (
    [id] INT NOT NULL IDENTITY(1,1),
    [settingKey] VARCHAR(100) NOT NULL,
    [settingValue] TEXT,
    [description] TEXT,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [system_settings_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [system_settings_settingKey_key] UNIQUE NONCLUSTERED ([settingKey])
);

-- AddForeignKey
ALTER TABLE [dbo].[bill_assignments] ADD CONSTRAINT [bill_assignments_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[bill_assignments] ADD CONSTRAINT [bill_assignments_assignedBy_fkey] FOREIGN KEY ([assignedBy]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[queue_assignments] ADD CONSTRAINT [queue_assignments_collectorId_fkey] FOREIGN KEY ([collectorId]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[collection_activities] ADD CONSTRAINT [collection_activities_performedBy_fkey] FOREIGN KEY ([performedBy]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[collection_tasks] ADD CONSTRAINT [collection_tasks_assignedTo_fkey] FOREIGN KEY ([assignedTo]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[collection_tasks] ADD CONSTRAINT [collection_tasks_completedBy_fkey] FOREIGN KEY ([completedBy]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
