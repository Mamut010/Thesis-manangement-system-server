import { LOCALES } from "../api/constants/locales";

export function getWeekday(date: Date, locale: string = LOCALES.EN): string {
    return date.toLocaleTimeString(locale, { weekday: 'long' });
}

export function geyShortWeekday(date: Date, locale: string = LOCALES.EN): string {
    return date.toLocaleTimeString(locale, { weekday: 'short' });
}