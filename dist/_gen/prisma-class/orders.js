"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Orders = void 0;
const sub_order_1 = require("./sub_order");
class _Orders {
    async sub_order(reload = false) {
        if ((this._sub_order === null || reload) && this.id !== undefined) {
            const dbModels = await sub_order_1._Sub_order.model.findMany({
                where: {
                    order_id: +this.id,
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
        this.order_client_id = obj.order_client_id;
        this.creation_date = obj.creation_date;
        this.modification_date = obj.modification_date;
        this.order_state = obj.order_state;
        this.type = obj.type;
        this.buyer_id = obj.buyer_id;
        this.buyer_billing_id = obj.buyer_billing_id;
        this.buyer_delivery_id = obj.buyer_delivery_id;
        this.expedition_id = obj.expedition_id;
        this.order_total = obj.order_total;
        Object.assign(this, obj);
    }
    get model() {
        return _Orders.model;
    }
    static async fromId(id) {
        const dbModel = await _Orders.model.findUnique({
            where: {
                id: +id,
            },
        });
        if (dbModel === null)
            return null;
        return new _Orders(dbModel);
    }
    async save(withId = false) {
        if (this.id < 0 || withId) {
            if (this.order_client_id === void 0 ||
                this.creation_date === void 0 ||
                this.modification_date === void 0 ||
                this.order_state === void 0 ||
                this.type === void 0 ||
                this.buyer_id === void 0 ||
                this.buyer_billing_id === void 0 ||
                this.buyer_delivery_id === void 0 ||
                this.expedition_id === void 0 ||
                this.order_total === void 0) {
                return { status: false, err: 'Bad required fields' };
            }
            const data = {
                order_client_id: this.order_client_id,
                creation_date: this.creation_date,
                modification_date: this.modification_date,
                order_state: this.order_state,
                type: this.type,
                buyer_id: this.buyer_id,
                buyer_billing_id: this.buyer_billing_id,
                buyer_delivery_id: this.buyer_delivery_id,
                expedition_id: this.expedition_id,
                order_total: this.order_total,
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
                order_client_id: this.order_client_id,
                creation_date: this.creation_date,
                modification_date: this.modification_date,
                order_state: this.order_state,
                type: this.type,
                buyer_id: this.buyer_id,
                buyer_billing_id: this.buyer_billing_id,
                buyer_delivery_id: this.buyer_delivery_id,
                expedition_id: this.expedition_id,
                order_total: this.order_total,
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
exports._Orders = _Orders;
//# sourceMappingURL=orders.js.map