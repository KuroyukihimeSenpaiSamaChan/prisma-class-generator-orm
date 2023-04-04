"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Media = void 0;
const user_1 = require("./user");
const product_1 = require("./product");
class _Media {
    async user() {
        if (this._user === null) {
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
    async product() {
        if (this._product === null) {
            const dbModels = await product_1._Product.model.findMany({
                where: {
                    product_image: +this.id,
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
    constructor(obj) {
        this.id = -1;
        this._user = null;
        this._product = null;
        this.slug = obj.slug;
        this.url = obj.url;
        this.creation_date = obj.creation_date;
        this.modification_date = obj.modification_date;
        this.user_id = obj.user_id;
        Object.assign(this, obj);
    }
    get model() {
        return _Media.model;
    }
    static async fromId(id) {
        const dbModel = await _Media.model.findUnique({
            where: {
                id: +id,
            },
        });
        if (dbModel === null)
            return null;
        return new _Media(dbModel);
    }
    async save(withId = false) {
        if (this.id < 0 || withId) {
            if (this.slug === void 0 ||
                this.url === void 0 ||
                this.creation_date === void 0 ||
                this.modification_date === void 0 ||
                this.user_id === void 0) {
                return { status: false, err: 'Bad required fields' };
            }
            const data = {
                slug: this.slug,
                url: this.url,
                creation_date: this.creation_date,
                modification_date: this.modification_date,
                user_id: this.user_id,
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
                slug: this.slug,
                url: this.url,
                creation_date: this.creation_date,
                modification_date: this.modification_date,
                user_id: this.user_id,
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
        await this.user();
        if (this._user !== null)
            this._user.loadAll(depth - 1);
        await this.product();
        if (this._product !== null) {
            for (const role of this._product) {
                await role.loadAll(depth - 1);
            }
        }
    }
}
exports._Media = _Media;
//# sourceMappingURL=media.js.map