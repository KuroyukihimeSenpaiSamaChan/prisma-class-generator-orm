import { _Access_token } from './access_token';
import { _Media } from './media';
import { _Product } from './product';
import { _Sub_order } from './sub_order';
import { _User_billing } from './user_billing';
import { _User_delivery } from './user_delivery';
import { _User_role } from './user_role';
import { Prisma } from '@prisma/client';
export declare class _User {
    static model: Prisma.UserDelegate<undefined>;
    id: number;
    user_pass?: string;
    user_email?: string;
    user_registered?: boolean;
    firstname?: string;
    lastname?: string;
    birthdate?: number;
    token?: string;
    protected _access_token: _Access_token[] | null;
    access_token(): Promise<_Access_token[] | null>;
    protected _media: _Media[] | null;
    media(): Promise<_Media[] | null>;
    protected _product: _Product[] | null;
    product(): Promise<_Product[] | null>;
    protected _sub_order: _Sub_order[] | null;
    sub_order(): Promise<_Sub_order[] | null>;
    protected _user_billing: _User_billing[] | null;
    user_billing(): Promise<_User_billing[] | null>;
    protected _user_delivery: _User_delivery[] | null;
    user_delivery(): Promise<_User_delivery[] | null>;
    protected _user_role: _User_role[] | null;
    user_role(): Promise<_User_role[] | null>;
    constructor(obj: {
        user_pass?: string;
        user_email?: string;
        firstname?: string;
        lastname?: string;
        birthdate?: number;
        token?: string;
    });
    get model(): Prisma.UserDelegate<undefined>;
    static fromId<T extends _User>(id: number): Promise<T | null>;
    save(): Promise<{
        status: true;
        type: 'updated' | 'created';
        id: number;
    } | {
        status: false;
    }>;
    loadAll(depth?: number): Promise<void>;
}
