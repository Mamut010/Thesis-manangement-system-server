import { mkdir } from "fs/promises";
import { rimraf } from "rimraf";

export async function createDir(path: string) {
    return mkdir(path, { recursive: true });
}

export async function deleteDir(path: string | string[], signal?: AbortSignal) {
    return rimraf(path, { signal });
}