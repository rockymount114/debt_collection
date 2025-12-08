import { PrismaClient } from '@prisma/client'
import { PrismaMssql } from '@prisma/adapter-mssql'


const globalForPrisma = global as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

const adapter = new PrismaMssql(connectionString);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma