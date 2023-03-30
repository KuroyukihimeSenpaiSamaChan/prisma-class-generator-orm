import { _Sub_order } from './sub_order';
import { Prisma } from '@prisma/client';
export declare class _Orders {
    static model: Prisma.OrdersDelegate<undefined>;
    id: number;
    order_client_id?: number;
    creation_date?: number;
    modification_date?: number;
    order_state?: number;
    type?: number;
    buyer_id?: number;
    buyer_billing_id?: number;
    buyer_delivery_id?: number;
    expedition_id?: number;
    order_total?: number;
    protected _sub_order: _Sub_order[] | null;
    sub_order(): Promise<_Sub_order[] | null>;
    constructor(obj: {
        order_client_id?: number;
        creation_date?: number;
        modification_date?: number;
        order_state?: number;
        type?: number;
        buyer_id?: number;
        buyer_billing_id?: number;
        buyer_delivery_id?: number;
        expedition_id?: number;
        order_total?: number;
    });
    get model(): Prisma.OrdersDelegate<undefined>;
    static fromId<T extends _Orders>(id: number): Promise<T | null>;
    save(): Promise<{
        status: true;
        type: 'updated' | 'created';
        id: number;
    } | {
        status: false;
    }>;
    loadAll(depth?: number): Promise<void>;
}
