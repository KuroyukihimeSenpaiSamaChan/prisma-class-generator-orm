import { _Sub_order } from './sub_order';
import { Prisma } from '@prisma/client';
export declare class _Expedition {
    static model: Prisma.ExpeditionDelegate<undefined>;
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
    get model(): Prisma.ExpeditionDelegate<undefined>;
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
