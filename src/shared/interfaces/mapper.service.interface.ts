import { ClassConstructor, IsArray, NotArray } from "../../utils/types";

export interface MapperServiceInterface {
    map<T, V>(cls: ClassConstructor<T>, src: NotArray<V>): T;
    map<T, V>(cls: ClassConstructor<T>, src: IsArray<V>): T[];
}