import { Expose } from "class-transformer";
import { IsDefined, IsIn, IsOptional, IsString } from "class-validator";
import { SortDirValues } from "./constants/sort-dirs";
import { DefaultQuerySettings } from "./constants/settings";
import { SortDir } from "./types/sort-dir";

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