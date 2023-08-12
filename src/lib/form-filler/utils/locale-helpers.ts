export function computeNumberLocale(locale: string | undefined): string | undefined {
    if (!locale) {
        return undefined;
    }

    const supportedLocales = Intl.NumberFormat.supportedLocalesOf(locale, { localeMatcher: 'lookup' });
    return supportedLocales.length > 0 ? supportedLocales[0] : undefined;
}

export function computeDateTimeLocale(locale: string | undefined): string | undefined {
    if (!locale) {
        return undefined;
    }

    const supportedLocales = Intl.DateTimeFormat.supportedLocalesOf(locale, { localeMatcher: 'lookup' });
    return supportedLocales.length > 0 ? supportedLocales[0] : undefined;
}