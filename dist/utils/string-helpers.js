"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyJSON = exports.trimSuffix = exports.trimPrefix = exports.uncapitalize = exports.capitalize = exports.stringEqualsIgnoreCase = exports.stringCompareIgnoreCase = void 0;
function stringCompareIgnoreCase(str1, str2, locale) {
    return str1.localeCompare(str2, locale, { sensitivity: 'accent' });
}
exports.stringCompareIgnoreCase = stringCompareIgnoreCase;
function stringEqualsIgnoreCase(str1, str2, locale) {
    return stringCompareIgnoreCase(str1, str2, locale) === 0;
}
exports.stringEqualsIgnoreCase = stringEqualsIgnoreCase;
function modifyFirstChar(str, modifier, allWords) {
    const modifyFirstCharInner = (target) => {
        return target.length > 0 ? modifier(target.charAt(0)) + target.slice(1) : target;
    };
    if (!allWords) {
        return modifyFirstCharInner(str);
    }
    const separator = ' ';
    const words = str.split(separator);
    return words.map(word => modifyFirstCharInner(word)).join(separator);
}
function capitalize(str, allWords = false) {
    return modifyFirstChar(str, firstLetter => firstLetter.toUpperCase(), allWords);
}
exports.capitalize = capitalize;
function uncapitalize(str, allWords = false) {
    return modifyFirstChar(str, firstLetter => firstLetter.toLowerCase(), allWords);
}
exports.uncapitalize = uncapitalize;
function trimPrefix(str, prefix, sensitive = true) {
    const shouldTrim = sensitive ? str.startsWith(prefix) : str.toLowerCase().startsWith(prefix.toLowerCase());
    return shouldTrim ? str.slice(prefix.length) : str;
}
exports.trimPrefix = trimPrefix;
function trimSuffix(str, suffix, sensitive = true) {
    const shouldTrim = sensitive ? str.endsWith(suffix) : str.toLowerCase().endsWith(suffix.toLowerCase());
    return shouldTrim ? str.slice(0, -suffix.length) : str;
}
exports.trimSuffix = trimSuffix;
function prettyJSON(toStringify) {
    return JSON.stringify(toStringify, null, 2);
}
exports.prettyJSON = prettyJSON;
//# sourceMappingURL=string-helpers.js.map