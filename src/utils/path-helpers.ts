import path from "path";

export function assets(...paths: string[]) {
    return path.join(process.cwd(), 'public', 'assets', ...paths);
}

export function storage(...paths: string[]) {
    return path.join(process.cwd(), 'public', 'storage', ...paths);
}

export function temp(...paths: string[]) {
    return path.join(process.cwd(), 'public', 'tmp', ...paths);
}

export function templates(...paths: string[]) {
    return assets('templates', ...paths);
}

export function views(...paths: string[]) {
    return assets('views', ...paths);
}