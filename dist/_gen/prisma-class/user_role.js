"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._User_role = void 0;
const user_1 = require("./user");
class _User_role {
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
        this.user_id = -1;
        this.vendor_professional = false;
        this.vendor_private = false;
        this.buyer = false;
        this.searcher = false;
        this.admin = false;
        this._user = null;
        Object.assign(this, obj);
    }
    get model() {
        return _User_role.model;
    }
    static async fromId(id) {
        const dbModel = await _User_role.model.findUnique({
            where: {
                user_id: id,
            },
        });
        if (dbModel === null)
            return null;
        return new _User_role(dbModel);
    }
    async save() {
        if (this.user_id < 0) {
            const data = {
                user_id: this.user_id,
                vendor_professional: this.vendor_professional,
                vendor_private: this.vendor_private,
                buyer: this.buyer,
                searcher: this.searcher,
                admin: this.admin,
            };
            try {
                const user = await this.model.create({
                    data: data,
                });
                this.user_id = user.user_id;
                return { status: true, id: user.user_id, type: 'created' };
            }
            catch (_) {
                return { status: false };
            }
        }
        try {
            const data = {
                user_id: this.user_id,
                vendor_professional: this.vendor_professional,
                vendor_private: this.vendor_private,
                buyer: this.buyer,
                searcher: this.searcher,
                admin: this.admin,
            };
            const user = await this.model.update({
                where: {
                    user_id: this.user_id,
                },
                data: data,
            });
            return { status: true, id: user.user_id, type: 'updated' };
        }
        catch (_) {
            return { status: false };
        }
    }
}
exports._User_role = _User_role;
//# sourceMappingURL=user_role.js.map