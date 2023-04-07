import { _Product } from './product';
import { Prisma } from '@prisma/client';
export type _Product_visibiltyFields = {
    id: number;
    state: string;
};
export type _Product_visibiltyUniqueFields = {
    id: number;
};
export declare class _Product_visibilty {
    static db: Prisma.Product_visibiltyDelegate<undefined>;
    id: number;
    state?: string;
    private _product;
    product(reload?: boolean): Promise<_Product[] | null>;
    constructor(obj: {
        state?: string;
    });
    get db(): Prisma.Product_visibiltyDelegate<undefined>;
    static all(where?: Partial<_Product_visibiltyFields>): Promise<_Product_visibilty[]>;
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
