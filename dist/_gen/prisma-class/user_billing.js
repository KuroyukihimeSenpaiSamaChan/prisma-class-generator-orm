"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._User_billing = void 0;
const user_1 = require("./user");
class _User_billing {
    async user() {
        if (this._user === null) {
            const dbModel = await user_1._User.model.findUnique({
                where: {
                    id: this.user_id,
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
    get model() {
        return _User_billing.model;
    }
    static async fromId(id) {
        const dbModel = await _User_billing.model.findUnique({
            where: {
                id: id,
            },
        });
        if (dbModel === null)
            return null;
        return new _User_billing(dbModel);
    }
    async save() {
        if (this.id < 0) {
            if (this.user_id === void 0 ||
                this.address === void 0 ||
                this.zipcode === void 0 ||
                this.city === void 0 ||
                this.country === void 0 ||
                this.region === void 0 ||
                this.phone_number === void 0) {
                return { status: false };
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
exports._User_billing = _User_billing;
//# sourceMappingURL=user_billing.js.map