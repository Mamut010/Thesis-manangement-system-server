import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'node:util';
import { ENVIRONMENT } from './code/environment';
import { SeederFactory } from './seeders';

const prisma = new PrismaClient();

async function main() {
    const options = {
        environment: { 
            type: 'string',
            default: ENVIRONMENT.DEV
        },
    } as Record<string, any>;

    const { values: { environment } } = parseArgs({ options: options })
    const seeder = SeederFactory(environment as string);

    console.log(`Start seeding ...`);
    await seeder(prisma);
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });