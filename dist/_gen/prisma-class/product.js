"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Product = void 0;
const media_1 = require("./media");
const product_visibilty_1 = require("./product_visibilty");
const tva_type_1 = require("./tva_type");
const user_1 = require("./user");
const product_category_1 = require("./product_category");
const sub_order_1 = require("./sub_order");
class _Product {
    async media() {
        if (this._media === null) {
            const dbModel = await media_1._Media.model.findUnique({
                where: {
                    id: this.product_image,
                },
            });
            if (dbModel !== null) {
                this._media = new media_1._Media(dbModel);
            }
        }
        return this._media;
    }
    async product_visibilty() {
        if (this._product_visibilty === null) {
            const dbModel = await product_visibilty_1._Product_visibilty.model.findUnique({
                where: {
                    id: this.state,
                },
            });
            if (dbModel !== null) {
                this._product_visibilty = new product_visibilty_1._Product_visibilty(dbModel);
            }
        }
        return this._product_visibilty;
    }
    async tva_type() {
        if (this._tva_type === null) {
            const dbModel = await tva_type_1._TVA_type.model.findUnique({
                where: {
                    id: this.tva,
                },
            });
            if (dbModel !== null) {
                this._tva_type = new tva_type_1._TVA_type(dbModel);
            }
        }
        return this._tva_type;
    }
    async user() {
        if (this._user === null) {
            const dbModel = await user_1._User.model.findUnique({
                where: {
                    id: this.vendor_id,
                },
            });
            if (dbModel !== null) {
                this._user = new user_1._User(dbModel);
            }
        }
        return this._user;
    }
    async product_category() {
        if (this._product_category === null) {
            const dbModels = await product_category_1._Product_category.model.findMany({
                where: {
                    product_id: this.id,
                },
            });
            if (dbModels.length) {
                this._product_category = [];
                for (const dbModel of dbModels)
                    this._product_category.push(new product_category_1._Product_category(dbModel));
            }
        }
        return this._product_category;
    }
    async sub_order() {
        if (this._sub_order === null) {
            const dbModels = await sub_order_1._Sub_order.model.findMany({
                where: {
                    product_id: this.id,
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
        this._media = null;
        this._product_visibilty = null;
        this._tva_type = null;
        this._user = null;
        this._product_category = null;
        this._sub_order = null;
        this.vendor_id = obj.vendor_id;
        this.state = obj.state;
        this.tva = obj.tva;
        this.product_name = obj.product_name;
        this.vendor_sku = obj.vendor_sku;
        this.product_sku = obj.product_sku;
        this.price = obj.price;
        this.price_promo = obj.price_promo;
        this.description = obj.description;
        this.backorder = obj.backorder;
        this.unique_product = obj.unique_product;
        this.linked_products = obj.linked_products;
        this.product_image = obj.product_image;
        this.product_state = obj.product_state;
        this.product_keywords = obj.product_keywords;
        this.creation_date = obj.creation_date;
        this.modification_date = obj.modification_date;
        this.has_tva = obj.has_tva;
        Object.assign(this, obj);
    }
    get model() {
        return _Product.model;
    }
    static async fromId(id) {
        const dbModel = await _Product.model.findUnique({
            where: {
                id: id,
            },
        });
        if (dbModel === null)
            return null;
        return new _Product(dbModel);
    }
    async save() {
        if (this.id < 0) {
            if (this.vendor_id === void 0 ||
                this.state === void 0 ||
                this.tva === void 0 ||
                this.product_name === void 0 ||
                this.vendor_sku === void 0 ||
                this.product_sku === void 0 ||
                this.price === void 0 ||
                this.price_promo === void 0 ||
                this.description === void 0 ||
                this.backorder === void 0 ||
                this.unique_product === void 0 ||
                this.linked_products === void 0 ||
                this.product_image === void 0 ||
                this.product_state === void 0 ||
                this.product_keywords === void 0 ||
                this.creation_date === void 0 ||
                this.modification_date === void 0 ||
                this.has_tva === void 0) {
                return { status: false };
            }
            const data = {
                vendor_id: this.vendor_id,
                state: this.state,
                tva: this.tva,
                product_name: this.product_name,
                vendor_sku: this.vendor_sku,
                product_sku: this.product_sku,
                price: this.price,
                price_promo: this.price_promo,
                description: this.description,
                additional_description: this.additional_description,
                backorder: this.backorder,
                unique_product: this.unique_product,
                linked_products: this.linked_products,
                product_image: this.product_image,
                product_image_gallery: this.product_image_gallery,
                product_state: this.product_state,
                product_keywords: this.product_keywords,
                creation_date: this.creation_date,
                modification_date: this.modification_date,
                has_tva: this.has_tva,
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
                vendor_id: this.vendor_id,
                state: this.state,
                tva: this.tva,
                product_name: this.product_name,
                vendor_sku: this.vendor_sku,
                product_sku: this.product_sku,
                price: this.price,
                price_promo: this.price_promo,
                description: this.description,
                additional_description: this.additional_description,
                backorder: this.backorder,
                unique_product: this.unique_product,
                linked_products: this.linked_products,
                product_image: this.product_image,
                product_image_gallery: this.product_image_gallery,
                product_state: this.product_state,
                product_keywords: this.product_keywords,
                creation_date: this.creation_date,
                modification_date: this.modification_date,
                has_tva: this.has_tva,
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
    async loadAll(depth = 1) {
        if (depth <= 0)
            return;
        await this.media();
        if (this._media !== null)
            this._media.loadAll(depth - 1);
        await this.product_visibilty();
        if (this._product_visibilty !== null)
            this._product_visibilty.loadAll(depth - 1);
        await this.tva_type();
        if (this._tva_type !== null)
            this._tva_type.loadAll(depth - 1);
        await this.user();
        if (this._user !== null)
            this._user.loadAll(depth - 1);
        await this.product_category();
        for (const role of this._product_category) {
            await role.loadAll(depth - 1);
        }
        await this.sub_order();
        for (const role of this._sub_order) {
            await role.loadAll(depth - 1);
        }
    }
}
exports._Product = _Product;
//# sourceMappingURL=product.js.map