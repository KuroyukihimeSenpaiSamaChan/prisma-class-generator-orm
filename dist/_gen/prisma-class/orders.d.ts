import { _Sub_order } from './sub_order';
import { Prisma } from '@prisma/client';
export type _OrdersFields = {
    id: number;
    order_client_id: number;
    creation_date: number;
    modification_date: number;
    order_state: number;
    type: number;
    buyer_id: number;
    buyer_billing_id: number;
    buyer_delivery_id: number;
    expedition_id: number;
    order_total: number;
};
export type _OrdersUniqueFields = {
    id: number;
};
export declare class _Orders {
    static db: Prisma.OrdersDelegate<undefined>;
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
    private _sub_order;
    sub_order(reload?: boolean): Promise<_Sub_order[] | null>;
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
    get db(): Prisma.OrdersDelegate<undefined>;
    static all(where?: Partial<_OrdersFields>): Promise<_Orders[]>;
    static fromId(id: number): Promise<_Orders | null>;
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
