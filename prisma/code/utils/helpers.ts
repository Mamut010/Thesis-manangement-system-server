export function trimPrefix(str: string, prefix: string): string {
    return str.startsWith(prefix) ? str.slice(prefix.length) : str;
}

export function PascalCaseToStandard(pascalCaseStr: string, capitalizeEachWord: boolean = false) {
    return Array.from(pascalCaseStr).reduce((name, char, index) => {
        const isUpperCaseLetter = char === char.toUpperCase() && isNaN(+char);
        if (!capitalizeEachWord && index !== 0) {
            char = char.toLowerCase();
        }
        name += isUpperCaseLetter && index !== 0 ? ` ${char}` : char
        return name;
    }, '');
}