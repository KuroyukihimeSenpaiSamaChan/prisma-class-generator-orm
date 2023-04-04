"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._User_role = void 0;
const role_1 = require("./role");
const user_1 = require("./user");
class _User_role {
    async role(reload = false) {
        if ((this._role === null || reload) && this.role_id !== undefined) {
            const dbModel = await role_1._Role.model.findUnique({
                where: {
                    id: +this.role_id,
                },
            });
            if (dbModel !== null) {
                this._role = new role_1._Role(dbModel);
            }
        }
        return this._role;
    }
    async user(reload = false) {
        if ((this._user === null || reload) && this.user_id !== undefined) {
            const dbModel = await user_1._User.model.findUnique({
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
        this._role = null;
        this._user = null;
        this.user_id = obj.user_id;
        this.role_id = obj.role_id;
        Object.assign(this, obj);
    }
    get model() {
        return _User_role.model;
    }
    async loadAll(depth = 1) {
        if (depth <= 0)
            return;
        await this.role();
        if (this._role !== null)
            this._role.loadAll(depth - 1);
        await this.user();
        if (this._user !== null)
            this._user.loadAll(depth - 1);
    }
}
exports._User_role = _User_role;
//# sourceMappingURL=user_role.js.map