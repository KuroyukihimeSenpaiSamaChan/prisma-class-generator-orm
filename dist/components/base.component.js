"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
class BaseComponent {
    decorators = [];
    constructor(obj) {
        Object.assign(this, obj);
    }
    echoDecorators = () => {
        const lines = this.decorators.map((decorator) => decorator.echo());
        return lines.join('\r\n');
    };
}
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map