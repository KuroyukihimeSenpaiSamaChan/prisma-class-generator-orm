"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Product_visibilty = void 0;
const product_1 = require("./product");
class _Product_visibilty {
    async product() {
        if (this._product === null) {
            const dbModels = await product_1._Product.model.findMany({
                where: {
                    state: +this.id,
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
    constructor(obj) {
        this.id = -1;
        this._product = null;
        this.state = obj.state;
        Object.assign(this, obj);
    }
    get model() {
        return _Product_visibilty.model;
    }
    static async fromId(id) {
        const dbModel = await _Product_visibilty.model.findUnique({
            where: {
                id: +id,
            },
        });
        if (dbModel === null)
            return null;
        return new _Product_visibilty(dbModel);
    }
    async save(withId = false) {
        if (this.id < 0 || withId) {
            if (this.state === void 0) {
                return { status: false, err: 'Bad required fields' };
            }
            const data = {
                state: this.state,
            };
            try {
                const dbModel = await this.model.create({
                    data: data,
                });
                this.id = dbModel.id;
                return { status: true, id: dbModel.id, type: 'created' };
            }
            catch (err) {
                return { status: false, err: err };
            }
        }
        try {
            const data = {
                id: this.id,
                state: this.state,
            };
            const dbModel = await this.model.update({
                where: {
                    id: +this.id,
                },
                data: data,
            });
            return { status: true, id: dbModel.id, type: 'updated' };
        }
        catch (err) {
            return { status: false, err: err };
        }
    }
    async loadAll(depth = 1) {
        if (depth <= 0)
            return;
        await this.product();
        if (this._product !== null) {
            for (const role of this._product) {
                await role.loadAll(depth - 1);
            }
        }
    }
}
exports._Product_visibilty = _Product_visibilty;
//# sourceMappingURL=product_visibilty.js.map