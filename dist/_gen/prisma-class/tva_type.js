"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._TVA_type = void 0;
const product_1 = require("./product");
const sub_order_1 = require("./sub_order");
class _TVA_type {
    async product() {
        if (this._product === null) {
            const dbModels = await product_1._Product.model.findMany({
                where: {
                    tva: this.id,
                },
            });
            if (dbModels.length) {
                this._product = [];
                for (const dbModel of dbModels)
                    this._product.push(new product_1._Product(dbModel));
            }
        }
        return this._product;
    }
    async sub_order() {
        if (this._sub_order === null) {
            const dbModels = await sub_order_1._Sub_order.model.findMany({
                where: {
                    taxe_id: this.id,
                },
            });
            if (dbModels.length) {
                this._sub_order = [];
                for (const dbModel of dbModels)
                    this._sub_order.push(new sub_order_1._Sub_order(dbModel));
            }
        }
        return this._sub_order;
    }
    constructor(obj) {
        this.id = -1;
        this._product = null;
        this._sub_order = null;
        this.slug = obj.slug;
        Object.assign(this, obj);
    }
    get model() {
        return _TVA_type.model;
    }
    static async fromId(id) {
        const dbModel = await _TVA_type.model.findUnique({
            where: {
                id: id,
            },
        });
        if (dbModel === null)
            return null;
        return new _TVA_type(dbModel);
    }
    async save() {
        if (this.id < 0) {
            if (this.slug === void 0) {
                return { status: false };
            }
            const data = {
                slug: this.slug,
            };
            try {
                const user = await this.model.create({
                    data: data,
                });
                this.id = user.id;
                return { status: true, id: user.id, type: 'created' };
            }
            catch (_) {
                return { status: false };
            }
        }
        try {
            const data = {
                id: this.id,
                slug: this.slug,
            };
            const user = await this.model.update({
                where: {
                    id: this.id,
                },
                data: data,
            });
            return { status: true, id: user.id, type: 'updated' };
        }
        catch (_) {
            return { status: false };
        }
    }
}
exports._TVA_type = _TVA_type;
//# sourceMappingURL=tva_type.js.map