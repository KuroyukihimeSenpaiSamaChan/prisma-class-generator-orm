import { _Sub_order } from './sub_order';
import { Prisma } from '@prisma/client';
export declare class _Expedition {
    static model: Prisma.ExpeditionDelegate<undefined>;
    id: number;
    name?: number;
    slug?: number;
    max_weight?: number;
    price?: number;
    protected _sub_order: _Sub_order[] | null;
    sub_order(): Promise<_Sub_order[] | null>;
    constructor(obj: {
        name?: number;
        slug?: number;
        max_weight?: number;
        price?: number;
    });
    get model(): Prisma.ExpeditionDelegate<undefined>;
    static fromId<T extends _Expedition>(id: number): Promise<T | null>;
    save(): Promise<{
        status: true;
        type: 'updated' | 'created';
        id: number;
    } | {
        status: false;
    }>;
}
