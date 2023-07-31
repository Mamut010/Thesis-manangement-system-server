export interface BootstrapSettingInterface {
    setData(key: any, value: unknown): BootstrapSettingInterface;
    getData(key: any, index?: number): unknown;
    getAllData(key: any): unknown[];
    countData(key: any): number;
    containsData(key: any): boolean;
    deleteData(key: any, index?: number): unknown;
}