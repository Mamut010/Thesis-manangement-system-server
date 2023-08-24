export interface BootstrapSettingInterface {
    setData(key: any, value: unknown): BootstrapSettingInterface;
    getData<T = unknown>(key: any, index?: number): T | undefined;
    getAllData(key: any): unknown[];
    countData(key: any): number;
    containsData(key: any): boolean;
    deleteData<T = unknown>(key: any, index?: number): T | undefined;
}