export function getFullName(forename: string | null, surname: string | null): string | null {
    if (!forename) {
        return surname;
    }
    else {
        return forename + (surname ? ' ' + surname : '');
    }
}