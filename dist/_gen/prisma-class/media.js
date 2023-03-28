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
                    id: this.user_id,
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
                    product_image: this.id,
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
                id: id,
            },
        });
        if (dbModel === null)
            return null;
        return new _Media(dbModel);
    }
    async save() {
        if (this.id < 0) {
            if (this.slug === void 0 ||
                this.url === void 0 ||
                this.creation_date === void 0 ||
                this.modification_date === void 0 ||
                this.user_id === void 0) {
                return { status: false };
            }
            const data = {
                slug: this.slug,
                url: this.url,
                creation_date: this.creation_date,
                modification_date: this.modification_date,
                user_id: this.user_id,
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
                slug: this.slug,
                url: this.url,
                creation_date: this.creation_date,
                modification_date: this.modification_date,
                user_id: this.user_id,
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
exports._Media = _Media;
//# sourceMappingURL=media.js.map