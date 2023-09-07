export function stringCompareIgnoreCase(str1: string, str2: string, locale?: string | string[]): number {
    return str1.localeCompare(str2, locale, { sensitivity: 'accent' });
}

export function stringEqualsIgnoreCase(str1: string, str2: string, locale?: string | string[]): boolean {
    return stringCompareIgnoreCase(str1, str2, locale) === 0;
}

function modifyFirstChar(str: string, modifier: (firstChar: string) => string, allWords: boolean): string {
    const modifyFirstCharInner = (target: string): string => {
        return target.length > 0 ? modifier(target.charAt(0)) + target.slice(1) : target;
    }

    if (!allWords) {
        return modifyFirstCharInner(str);
    }

    const separator = ' ';
    const words = str.split(separator);
    return words.map(word => modifyFirstCharInner(word)).join(separator);
}

export function capitalize(str: string, allWords: boolean = false): string {
    return modifyFirstChar(str, firstLetter => firstLetter.toUpperCase(), allWords);
}

export function uncapitalize(str: string, allWords: boolean = false): string {
    return modifyFirstChar(str, firstLetter => firstLetter.toLowerCase(), allWords);
}

export function trimPrefix(str: string, prefix: string, sensitive: boolean = true): string {
    const shouldTrim = sensitive ? str.startsWith(prefix) : str.toLowerCase().startsWith(prefix.toLowerCase());
    return shouldTrim ? str.slice(prefix.length) : str;
}

export function trimSuffix(str: string, suffix: string, sensitive: boolean = true): string {
    const shouldTrim = sensitive ? str.endsWith(suffix) : str.toLowerCase().endsWith(suffix.toLowerCase());
    return shouldTrim ? str.slice(0, -suffix.length) : str;
}

export function prettyJSON(toStringify: any): string {
    return JSON.stringify(toStringify, null, 2);
}

/**
 * Format a string having {<#number>} placeholders. 
 * 
 * For e.g.: 'My name is {0}. I'm {1} years old.'
 * @param format The format.
 * @param args The arguments supplied.
 * @returns The formatted string after the substitution of all {<number>} placeholders with the corresponding supplied arguments.
 * 
 * @see https://www.geeksforgeeks.org/what-are-the-equivalent-of-printf-string-format-in-javascript/
 */
export function stringFormat(format: string, ...args: unknown[]) {
    return format.replace(/{(\d+)}/g, (match: string, number: number) => { 
        return typeof args[number] !== 'undefined'
            // This way, default string format (like in console.log() or alert()) is used
            ? args[number] as string
            : match;
    });
}