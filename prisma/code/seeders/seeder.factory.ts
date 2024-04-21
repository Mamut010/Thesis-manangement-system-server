import { ENVIRONMENT } from "../environment";
import { DefaultSeeder } from "./default.seeder";
import { Seeder } from "./seeder";
import { TestEnvSeeder } from "./test-env.seeder";

export function SeederFactory(environment: string): Seeder {
    if (environment === ENVIRONMENT.Test) {
        return TestEnvSeeder; 
    }
    else {
        return DefaultSeeder;
    }
}