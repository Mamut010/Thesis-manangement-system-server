import { BootstrapSettingInterface } from "./bootstrap-setting.interface";

export class BootstrapSetting implements BootstrapSettingInterface {
    private storage = new Map<any, Array<unknown>>();

    public setData(key: any, value: unknown): this {
        const arr = this.storage.get(key);
        if (!arr) {
            this.storage.set(key, [value]);
        }
        else {
            arr.push(value);
        }

        return this;
    }

    public getData<T = unknown>(key: any, index: number = -1): T | undefined {
        const values = this.storage.get(key);
        return values?.at(index) as T | undefined
    }

    public getAllData(key: any): unknown[] {
        const values = this.storage.get(key);
        return values ? [...values] : [];
    }

    public countData(key: any): number {
        const values = this.storage.get(key);
        return values?.length ?? 0;
    }

    public containsData(key: any): boolean {
        return this.storage.has(key);
    }

    public deleteData<T = unknown>(key: any, index: number = -1): T | undefined {
        const values = this.storage.get(key);
        if (!values) {
            return undefined;
        }

        index = index < 0 ? index + values.length : index;
        if (index < 0 || index >= values.length) {
            return undefined;
        }
        
        const value = values.splice(index, 1)[0] as T;
        if (values.length === 0) {
            this.storage.delete(key);
        }

        return value;
    }
}