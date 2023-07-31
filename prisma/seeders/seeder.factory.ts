import { ENVIRONMENT } from "../environment";
import { DefaultSeeder } from "./default.seeder";
import { Seeder } from "./seeder";
import { TestSeeder } from "./test.seeder";

export function SeederFactory(environment: string): Seeder {
    if (environment !== ENVIRONMENT.TEST) {
        return TestSeeder; 
    }
    else {
        return DefaultSeeder;
    }
}