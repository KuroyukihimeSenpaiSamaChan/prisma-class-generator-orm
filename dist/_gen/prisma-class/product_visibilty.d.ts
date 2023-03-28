import { _Product } from './product';
import { Prisma } from '@prisma/client';
export declare class _Product_visibilty {
    static model: Prisma.Product_visibiltyDelegate<undefined>;
    id: number;
    state?: string;
    protected _product: _Product[] | null;
    product(): Promise<_Product[] | null>;
    constructor(obj: {
        state?: string;
    });
    get model(): Prisma.Product_visibiltyDelegate<undefined>;
    static fromId<T extends _Product_visibilty>(id: number): Promise<T | null>;
    save(): Promise<{
        status: true;
        type: 'updated' | 'created';
        id: number;
    } | {
        status: false;
    }>;
}
