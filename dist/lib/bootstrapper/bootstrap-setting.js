"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapSetting = void 0;
class BootstrapSetting {
    constructor() {
        this._storage = new Map();
    }
    setData(key, value) {
        const arr = this._storage.get(key);
        if (!arr) {
            this._storage.set(key, [value]);
        }
        else {
            arr.push(value);
        }
        return this;
    }
    getData(key, index = -1) {
        const values = this._storage.get(key);
        return values ? values.at(index) : undefined;
    }
    getAllData(key) {
        const values = this._storage.get(key);
        return values ? [...values] : [];
    }
    countData(key) {
        const values = this._storage.get(key);
        return values ? values.length : 0;
    }
    containsData(key) {
        return this._storage.has(key);
    }
    deleteData(key, index = -1) {
        const values = this._storage.get(key);
        if (!values) {
            return undefined;
        }
        index = index < 0 ? index + values.length : index;
        if (index < 0 || index >= values.length) {
            return undefined;
        }
        const value = values.splice(index, 1)[0];
        if (values.length === 0) {
            this._storage.delete(key);
        }
        return value;
    }
}
exports.BootstrapSetting = BootstrapSetting;
//# sourceMappingURL=bootstrap-setting.js.map