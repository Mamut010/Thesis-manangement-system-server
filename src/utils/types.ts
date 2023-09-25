import { PrismaClient } from "@prisma/client";
import * as runtime from '@prisma/client/runtime/library';

/**
 * @author KPD
 * @see https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> 
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

/**
 * @author KPD
 * @see https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
 */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?:
            Required<Pick<T, K>>
            & Partial<Record<Exclude<Keys, K>, undefined>>
    }[Keys]
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type UnionKeys<T> = T extends T ? keyof T : never;

type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;
    
/**
 * @author tjjfvi
 * @see https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type OneOf<T extends object[]> = {
      [K in keyof T]: Expand<T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>>;
}[number];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
/**
 * @author smac89
 * @see https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @author Mathias Remshardt
 * @see https://dev.to/remshams/derive-union-of-string-literal-types-with-lookup-types-in-typescript-1kkf
 */
export type KeysOfType<T, K> = { [P in keyof T]: T[P] extends K ? P : never }[keyof T];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type ClassConstructor<T> = new(...args: any[]) => T;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type NotArray<T> = T extends ReadonlyArray<unknown> ? never : T;
export type IsArray<T> = T extends ReadonlyArray<unknown> ? T : never;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type KeyOf<T> = keyof T;
export type ValueOf<T> = T extends ReadonlyArray<unknown> ? T[number] : T[keyof T];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type NotPromise<T> = T extends Promise<unknown> ? never : T;
export type IsPromise<T> = T extends Promise<unknown> ? T : never;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type PrismaClientLike = Omit<PrismaClient, runtime.ITXClientDenyList>;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type ExcludeKey<T, U extends keyof T> = Exclude<keyof T, U>;