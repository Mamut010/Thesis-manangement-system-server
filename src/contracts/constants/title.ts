import { valuesOf } from "../../utils/object-helpers";
import { ValueOf } from "../../utils/types";

export const Title = {
    Mr: 'Mr',
    Ms: 'Ms',
} as const;

export type Title = ValueOf<typeof Title>;

export const TitleValues = valuesOf(Title);