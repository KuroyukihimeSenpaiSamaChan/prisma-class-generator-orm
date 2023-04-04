"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Expedition = void 0;
const sub_order_1 = require("./sub_order");
class _Expedition {
    async sub_order(reload = false) {
        if ((this._sub_order === null || reload) && this.id !== undefined) {
            const dbModels = await sub_order_1._Sub_order.model.findMany({
                where: {
                    expedition_id: +this.id,
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
        this._sub_order = null;
        this.name = obj.name;
        this.slug = obj.slug;
        this.max_weight = obj.max_weight;
        this.price = obj.price;
        Object.assign(this, obj);
    }
    get model() {
        return _Expedition.model;
    }
    static async fromId(id) {
        const dbModel = await _Expedition.model.findUnique({
            where: {
                id: +id,
            },
        });
        if (dbModel === null)
            return null;
        return new _Expedition(dbModel);
    }
    async save(withId = false) {
        if (this.id < 0 || withId) {
            if (this.name === void 0 ||
                this.slug === void 0 ||
                this.max_weight === void 0 ||
                this.price === void 0) {
                return { status: false, err: 'Bad required fields' };
            }
            const data = {
                name: this.name,
                slug: this.slug,
                max_weight: this.max_weight,
                price: this.price,
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
                name: this.name,
                slug: this.slug,
                max_weight: this.max_weight,
                price: this.price,
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
        await this.sub_order();
        if (this._sub_order !== null) {
            for (const role of this._sub_order) {
                await role.loadAll(depth - 1);
            }
        }
    }
}
exports._Expedition = _Expedition;
//# sourceMappingURL=expedition.js.map