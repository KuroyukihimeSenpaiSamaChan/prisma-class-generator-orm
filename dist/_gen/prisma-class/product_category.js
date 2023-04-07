"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Product_category = void 0;
const product_categories_1 = require("./product_categories");
const product_1 = require("./product");
class _Product_category {
    async product_categories(reload = false) {
        if ((this._product_categories === null || reload) &&
            this.category_id !== undefined) {
            const dbModel = await product_categories_1._Product_categories.db.findUnique({
                where: {
                    id: +this.category_id,
                },
            });
            if (dbModel !== null) {
                this._product_categories = new product_categories_1._Product_categories(dbModel);
            }
        }
        return this._product_categories;
    }
    async product(reload = false) {
        if ((this._product === null || reload) &&
            this.product_id !== undefined) {
            const dbModel = await product_1._Product.db.findUnique({
                where: {
                    id: +this.product_id,
                },
            });
            if (dbModel !== null) {
                this._product = new product_1._Product(dbModel);
            }
        }
        return this._product;
    }
    constructor(obj) {
        this._product_categories = null;
        this._product = null;
        this.product_id = obj.product_id;
        this.category_id = obj.category_id;
        Object.assign(this, obj);
    }
    get db() {
        return _Product_category.db;
    }
    static async all(where) {
        const models = await _Product_category.db.findMany({ where: where });
        return models.reduce((acc, m) => {
            acc.push(new _Product_category(m));
            return acc;
        }, []);
    }
    async loadAll(depth = 1) {
        if (depth <= 0)
            return;
        await this.product_categories();
        if (this._product_categories !== null)
            this._product_categories.loadAll(depth - 1);
        await this.product();
        if (this._product !== null)
            this._product.loadAll(depth - 1);
    }
}
exports._Product_category = _Product_category;
//# sourceMappingURL=product_category.js.map