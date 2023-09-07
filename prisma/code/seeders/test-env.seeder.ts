import { PrismaClient } from "@prisma/client";
import { Seeder } from "./seeder";
import { DefaultSeeder } from "./default.seeder";

export const TestEnvSeeder: Seeder = async (prisma: PrismaClient) => {
    DefaultSeeder(prisma);
}