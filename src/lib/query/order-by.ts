import { Expose } from "class-transformer";
import { IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { SortDir } from "./types";
import { SortDirValues, SortDirs } from "./constants/sort-dirs";
import { DefaultQuerySettings } from "./constants/settings";

export class OrderBy {
    @Expose()
    @IsDefined()
    @IsString()
    field!: string;

    @Expose()
    @IsOptional()
    @IsIn(SortDirValues)
    dir: SortDir = DefaultQuerySettings.SortDir;
}