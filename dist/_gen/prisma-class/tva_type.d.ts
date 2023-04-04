import { _Product } from './product';
import { _Sub_order } from './sub_order';
import { Prisma } from '@prisma/client';
export declare class _TVA_type {
    static model: Prisma.TVA_typeDelegate<undefined>;
    id: number;
    slug?: string;
    private _product;
    product(reload?: boolean): Promise<_Product[] | null>;
    private _sub_order;
    sub_order(reload?: boolean): Promise<_Sub_order[] | null>;
    constructor(obj: {
        slug?: string;
    });
    get model(): Prisma.TVA_typeDelegate<undefined>;
    static fromId(id: number): Promise<_TVA_type | null>;
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
