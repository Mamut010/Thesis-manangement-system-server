import { valuesOf } from "../../utils/object-helpers";

export const TITLES = {
    Mr: 'Mr',
    Ms: 'Ms',
} as const;

export const TitleValues = valuesOf(TITLES);