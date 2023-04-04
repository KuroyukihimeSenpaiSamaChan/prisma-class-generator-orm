import { _Expedition } from './expedition';
import { _Orders } from './orders';
import { _Product } from './product';
import { _User } from './user';
import { _TVA_type } from './tva_type';
import { Prisma } from '@prisma/client';
export declare class _Sub_order {
    static model: Prisma.Sub_orderDelegate<undefined>;
    id: number;
    order_id?: number;
    vendor_id?: number;
    expedition_id?: number;
    product_id?: number;
    product_price?: number;
    quantity?: number;
    taxe_id?: number;
    private _expedition;
    expedition(reload?: boolean): Promise<_Expedition | null>;
    private _orders;
    orders(reload?: boolean): Promise<_Orders | null>;
    private _product;
    product(reload?: boolean): Promise<_Product | null>;
    private _user;
    user(reload?: boolean): Promise<_User | null>;
    private _tva_type;
    tva_type(reload?: boolean): Promise<_TVA_type | null>;
    constructor(obj: {
        order_id?: number;
        vendor_id?: number;
        expedition_id?: number;
        product_id?: number;
        product_price?: number;
        quantity?: number;
        taxe_id?: number;
    });
    get model(): Prisma.Sub_orderDelegate<undefined>;
    static fromId(id: number): Promise<_Sub_order | null>;
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
