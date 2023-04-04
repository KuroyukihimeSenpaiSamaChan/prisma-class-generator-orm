"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Role = void 0;
const user_role_1 = require("./user_role");
class _Role {
    async user_role(reload = false) {
        if ((this._user_role === null || reload) && this.id !== undefined) {
            const dbModels = await user_role_1._User_role.model.findMany({
                where: {
                    role_id: +this.id,
                },
            });
            if (dbModels.length) {
                this._user_role = [];
                for (const dbModel of dbModels)
                    this._user_role.push(new user_role_1._User_role(dbModel));
            }
        }
        return this._user_role;
    }
    constructor(obj) {
        this.id = -1;
        this._user_role = null;
        this.label = obj.label;
        Object.assign(this, obj);
    }
    get model() {
        return _Role.model;
    }
    static async fromId(id) {
        const dbModel = await _Role.model.findUnique({
            where: {
                id: +id,
            },
        });
        if (dbModel === null)
            return null;
        return new _Role(dbModel);
    }
    async save(withId = false) {
        if (this.id < 0 || withId) {
            if (this.label === void 0) {
                return { status: false, err: 'Bad required fields' };
            }
            const data = {
                label: this.label,
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
                label: this.label,
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
        await this.user_role();
        if (this._user_role !== null) {
            for (const role of this._user_role) {
                await role.loadAll(depth - 1);
            }
        }
    }
}
exports._Role = _Role;
//# sourceMappingURL=role.js.map