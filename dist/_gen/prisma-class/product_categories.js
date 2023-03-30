"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Product_categories = void 0;
const product_category_1 = require("./product_category");
class _Product_categories {
    async product_category() {
        if (this._product_category === null) {
            const dbModels = await product_category_1._Product_category.model.findMany({
                where: {
                    category_id: this.id,
                },
            });
            if (dbModels.length) {
                this._product_category = [];
                for (const dbModel of dbModels)
                    this._product_category.push(new product_category_1._Product_category(dbModel));
            }
        }
        return this._product_category;
    }
    constructor(obj) {
        this.id = -1;
        this._product_category = null;
        this.category_name = obj.category_name;
        this.category_slug = obj.category_slug;
        Object.assign(this, obj);
    }
    get model() {
        return _Product_categories.model;
    }
    static async fromId(id) {
        const dbModel = await _Product_categories.model.findUnique({
            where: {
                id: id,
            },
        });
        if (dbModel === null)
            return null;
        return new _Product_categories(dbModel);
    }
    async save() {
        if (this.id < 0) {
            if (this.category_name === void 0 ||
                this.category_slug === void 0) {
                return { status: false };
            }
            const data = {
                category_name: this.category_name,
                category_slug: this.category_slug,
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
                category_name: this.category_name,
                category_slug: this.category_slug,
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
    async loadAll(depth = 1) {
        if (depth <= 0)
            return;
        await this.product_category();
        for (const role of this._product_category) {
            await role.loadAll(depth - 1);
        }
    }
}
exports._Product_categories = _Product_categories;
//# sourceMappingURL=product_categories.js.map