import { _Product } from './product';
import { Prisma } from '@prisma/client';
export declare class _Product_visibilty {
    static model: Prisma.Product_visibiltyDelegate<undefined>;
    id: number;
    state?: string;
    private _product;
    product(reload?: boolean): Promise<_Product[] | null>;
    constructor(obj: {
        state?: string;
    });
    get model(): Prisma.Product_visibiltyDelegate<undefined>;
    static fromId(id: number): Promise<_Product_visibilty | null>;
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
