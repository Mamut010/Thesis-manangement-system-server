"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InversifyAdapter = void 0;
class InversifyAdapter {
    constructor(container) {
        this.container = container;
    }
    get(someClass, action) {
        const childContainer = this.container.createChild();
        return childContainer.resolve(someClass);
    }
}
exports.InversifyAdapter = InversifyAdapter;
//# sourceMappingURL=inversify.adapter.js.map