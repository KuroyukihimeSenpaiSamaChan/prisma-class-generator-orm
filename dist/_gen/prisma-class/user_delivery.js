"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._User_delivery = void 0;
const user_1 = require("./user");
class _User_delivery {
    async user(reload = false) {
        if ((this._user === null || reload) && this.user_id !== undefined) {
            const dbModel = await user_1._User.db.findUnique({
                where: {
                    id: +this.user_id,
                },
            });
            if (dbModel !== null) {
                this._user = new user_1._User(dbModel);
            }
        }
        return this._user;
    }
    constructor(obj) {
        this.id = -1;
        this._user = null;
        this.user_id = obj.user_id;
        this.address = obj.address;
        this.zipcode = obj.zipcode;
        this.city = obj.city;
        this.country = obj.country;
        this.region = obj.region;
        this.phone_number = obj.phone_number;
        Object.assign(this, obj);
    }
    get db() {
        return _User_delivery.db;
    }
    static async all(where) {
        const models = await _User_delivery.db.findMany({ where: where });
        return models.reduce((acc, m) => {
            acc.push(new _User_delivery(m));
            return acc;
        }, []);
    }
    static async fromId(id) {
        const dbModel = await _User_delivery.db.findUnique({
            where: {
                id: +id,
            },
        });
        if (dbModel === null)
            return null;
        return new _User_delivery(dbModel);
    }
    async save(withId = false) {
        if (this.id < 0 || withId) {
            if (this.user_id === void 0 ||
                this.address === void 0 ||
                this.zipcode === void 0 ||
                this.city === void 0 ||
                this.country === void 0 ||
                this.region === void 0 ||
                this.phone_number === void 0) {
                return { status: false, err: 'Bad required fields' };
            }
            const data = {
                user_id: this.user_id,
                address: this.address,
                additional_address: this.additional_address,
                zipcode: this.zipcode,
                city: this.city,
                country: this.country,
                region: this.region,
                phone_number: this.phone_number,
                company_name: this.company_name,
            };
            try {
                const dbModel = await this.db.create({
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
                user_id: this.user_id,
                address: this.address,
                additional_address: this.additional_address,
                zipcode: this.zipcode,
                city: this.city,
                country: this.country,
                region: this.region,
                phone_number: this.phone_number,
                company_name: this.company_name,
            };
            const dbModel = await this.db.update({
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
        await this.user();
        if (this._user !== null)
            this._user.loadAll(depth - 1);
    }
}
exports._User_delivery = _User_delivery;
//# sourceMappingURL=user_delivery.js.map