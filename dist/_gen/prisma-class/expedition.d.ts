import { _Sub_order } from './sub_order';
import { Prisma } from '@prisma/client';
export type _ExpeditionFields = {
    id: number;
    name: number;
    slug: number;
    max_weight: number;
    price: number;
};
export type _ExpeditionUniqueFields = {
    id: number;
};
export declare class _Expedition {
    static db: Prisma.ExpeditionDelegate<undefined>;
    id: number;
    name?: number;
    slug?: number;
    max_weight?: number;
    price?: number;
    private _sub_order;
    sub_order(reload?: boolean): Promise<_Sub_order[] | null>;
    constructor(obj: {
        name?: number;
        slug?: number;
        max_weight?: number;
        price?: number;
    });
    get db(): Prisma.ExpeditionDelegate<undefined>;
    static all(where?: Partial<_ExpeditionFields>): Promise<_Expedition[]>;
    static fromId(id: number): Promise<_Expedition | null>;
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
