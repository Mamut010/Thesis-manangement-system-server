import { PrismaClient } from "@prisma/client";

export type Seeder = (prisma: PrismaClient) => Promise<void>;