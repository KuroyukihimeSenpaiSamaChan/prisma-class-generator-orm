import { _Media } from './media';
import { _Product_visibilty } from './product_visibilty';
import { _TVA_type } from './tva_type';
import { _User } from './user';
import { _Product_category } from './product_category';
import { _Sub_order } from './sub_order';
import { Prisma } from '@prisma/client';
export declare class _Product {
    static model: Prisma.ProductDelegate<undefined>;
    id: number;
    vendor_id?: number;
    state?: number;
    tva?: number;
    product_name?: string;
    vendor_sku?: string;
    product_sku?: string;
    price?: number;
    price_promo?: number;
    description?: string;
    additional_description?: string;
    backorder?: boolean;
    unique_product?: boolean;
    linked_products?: string;
    product_image?: number;
    product_image_gallery?: string;
    product_state?: number;
    product_keywords?: string;
    creation_date?: number;
    modification_date?: number;
    has_tva?: boolean;
    private _media;
    media(reload?: boolean): Promise<_Media | null>;
    private _product_visibilty;
    product_visibilty(reload?: boolean): Promise<_Product_visibilty | null>;
    private _tva_type;
    tva_type(reload?: boolean): Promise<_TVA_type | null>;
    private _user;
    user(reload?: boolean): Promise<_User | null>;
    private _product_category;
    product_category(reload?: boolean): Promise<_Product_category[] | null>;
    private _sub_order;
    sub_order(reload?: boolean): Promise<_Sub_order[] | null>;
    constructor(obj: {
        vendor_id?: number;
        state?: number;
        tva?: number;
        product_name?: string;
        vendor_sku?: string;
        product_sku?: string;
        price?: number;
        price_promo?: number;
        description?: string;
        backorder?: boolean;
        unique_product?: boolean;
        linked_products?: string;
        product_image?: number;
        product_state?: number;
        product_keywords?: string;
        creation_date?: number;
        modification_date?: number;
        has_tva?: boolean;
    });
    get model(): Prisma.ProductDelegate<undefined>;
    static fromId(id: number): Promise<_Product | null>;
    save(withId?: boolean): Promise<{
        status: true;
        type: 'updated' | 'created';
        id: number;
    } | {
        status: false;
        err: any;
    }>;
    loadAll(depth?: number): Promise<void>;
}
