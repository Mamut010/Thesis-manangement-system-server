import { injectable } from "inversify";
import { plainToInstanceExactMatch } from "../../utils/class-transformer-helpers";
import { ClassConstructor } from "class-transformer";
import { MapperServiceInterface } from "../interfaces";
import { IsArray, NotArray } from "../../utils/types";
import { SingleOrArray } from "../../utils/object-helpers";

@injectable()
export class MapperService implements MapperServiceInterface {
    map<T, V>(cls: ClassConstructor<T>, src: NotArray<V>): T;
    map<T, V>(cls: ClassConstructor<T>, src: IsArray<V>): T[];
    map<T, V>(cls: ClassConstructor<T>, src: SingleOrArray<V>): SingleOrArray<T> {
        return plainToInstanceExactMatch(cls, src);
    }
}