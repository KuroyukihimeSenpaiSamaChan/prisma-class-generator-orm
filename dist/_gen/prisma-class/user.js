"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._User = void 0;
const access_token_1 = require("./access_token");
const media_1 = require("./media");
const product_1 = require("./product");
const sub_order_1 = require("./sub_order");
const user_billing_1 = require("./user_billing");
const user_delivery_1 = require("./user_delivery");
const user_role_1 = require("./user_role");
class _User {
    async access_token(reload = false) {
        if ((this._access_token === null || reload) && this.id !== undefined) {
            const dbModels = await access_token_1._Access_token.db.findMany({
                where: {
                    user_id: +this.id,
                },
            });
            if (dbModels.length) {
                this._access_token = [];
                for (const dbModel of dbModels)
                    this._access_token.push(new access_token_1._Access_token(dbModel));
            }
        }
        return this._access_token;
    }
    async media(reload = false) {
        if ((this._media === null || reload) && this.id !== undefined) {
            const dbModels = await media_1._Media.db.findMany({
                where: {
                    user_id: +this.id,
                },
            });
            if (dbModels.length) {
                this._media = [];
                for (const dbModel of dbModels)
                    this._media.push(new media_1._Media(dbModel));
            }
        }
        return this._media;
    }
    async product(reload = false) {
        if ((this._product === null || reload) && this.id !== undefined) {
            const dbModels = await product_1._Product.db.findMany({
                where: {
                    vendor_id: +this.id,
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
    async sub_order(reload = false) {
        if ((this._sub_order === null || reload) && this.id !== undefined) {
            const dbModels = await sub_order_1._Sub_order.db.findMany({
                where: {
                    vendor_id: +this.id,
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
    async user_billing(reload = false) {
        if ((this._user_billing === null || reload) && this.id !== undefined) {
            const dbModels = await user_billing_1._User_billing.db.findMany({
                where: {
                    user_id: +this.id,
                },
            });
            if (dbModels.length) {
                this._user_billing = [];
                for (const dbModel of dbModels)
                    this._user_billing.push(new user_billing_1._User_billing(dbModel));
            }
        }
        return this._user_billing;
    }
    async user_delivery(reload = false) {
        if ((this._user_delivery === null || reload) && this.id !== undefined) {
            const dbModels = await user_delivery_1._User_delivery.db.findMany({
                where: {
                    user_id: +this.id,
                },
            });
            if (dbModels.length) {
                this._user_delivery = [];
                for (const dbModel of dbModels)
                    this._user_delivery.push(new user_delivery_1._User_delivery(dbModel));
            }
        }
        return this._user_delivery;
    }
    async user_role(reload = false) {
        if ((this._user_role === null || reload) && this.id !== undefined) {
            const dbModels = await user_role_1._User_role.db.findMany({
                where: {
                    user_id: +this.id,
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
        this.user_registered = false;
        this._access_token = null;
        this._media = null;
        this._product = null;
        this._sub_order = null;
        this._user_billing = null;
        this._user_delivery = null;
        this._user_role = null;
        this.user_pass = obj.user_pass;
        this.user_email = obj.user_email;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.birthdate = obj.birthdate;
        this.token = obj.token;
        Object.assign(this, obj);
    }
    get db() {
        return _User.db;
    }
    static async all(where) {
        const models = await _User.db.findMany({ where: where });
        return models.reduce((acc, m) => {
            acc.push(new _User(m));
            return acc;
        }, []);
    }
    static async fromId(id) {
        const dbModel = await _User.db.findUnique({
            where: {
                id: +id,
            },
        });
        if (dbModel === null)
            return null;
        return new _User(dbModel);
    }
    async save(withId = false) {
        if (this.id < 0 || withId) {
            if (this.user_pass === void 0 ||
                this.user_email === void 0 ||
                this.firstname === void 0 ||
                this.lastname === void 0 ||
                this.birthdate === void 0 ||
                this.token === void 0) {
                return { status: false, err: 'Bad required fields' };
            }
            const data = {
                user_pass: this.user_pass,
                user_email: this.user_email,
                user_registered: this.user_registered,
                firstname: this.firstname,
                lastname: this.lastname,
                birthdate: this.birthdate,
                token: this.token,
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
                user_pass: this.user_pass,
                user_email: this.user_email,
                user_registered: this.user_registered,
                firstname: this.firstname,
                lastname: this.lastname,
                birthdate: this.birthdate,
                token: this.token,
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
        await this.access_token();
        if (this._access_token !== null) {
            for (const role of this._access_token) {
                await role.loadAll(depth - 1);
            }
        }
        await this.media();
        if (this._media !== null) {
            for (const role of this._media) {
                await role.loadAll(depth - 1);
            }
        }
        await this.product();
        if (this._product !== null) {
            for (const role of this._product) {
                await role.loadAll(depth - 1);
            }
        }
        await this.sub_order();
        if (this._sub_order !== null) {
            for (const role of this._sub_order) {
                await role.loadAll(depth - 1);
            }
        }
        await this.user_billing();
        if (this._user_billing !== null) {
            for (const role of this._user_billing) {
                await role.loadAll(depth - 1);
            }
        }
        await this.user_delivery();
        if (this._user_delivery !== null) {
            for (const role of this._user_delivery) {
                await role.loadAll(depth - 1);
            }
        }
        await this.user_role();
        if (this._user_role !== null) {
            for (const role of this._user_role) {
                await role.loadAll(depth - 1);
            }
        }
    }
}
exports._User = _User;
//# sourceMappingURL=user.js.map