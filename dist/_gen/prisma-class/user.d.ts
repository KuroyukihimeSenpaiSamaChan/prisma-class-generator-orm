import { _Access_token } from './access_token';
import { _Media } from './media';
import { _Product } from './product';
import { _Sub_order } from './sub_order';
import { _User_billing } from './user_billing';
import { _User_delivery } from './user_delivery';
import { _User_role } from './user_role';
import { Prisma } from '@prisma/client';
export type _UserFields = {
    id: number;
    user_pass: string;
    user_email: string;
    user_registered: boolean;
    firstname: string;
    lastname: string;
    birthdate: number;
    token: string;
};
export type _UserUniqueFields = {
    id: number;
    user_email: string;
};
export declare class _User {
    static db: Prisma.UserDelegate<undefined>;
    id: number;
    user_pass?: string;
    user_email?: string;
    user_registered?: boolean;
    firstname?: string;
    lastname?: string;
    birthdate?: number;
    token?: string;
    private _access_token;
    access_token(reload?: boolean): Promise<_Access_token[] | null>;
    private _media;
    media(reload?: boolean): Promise<_Media[] | null>;
    private _product;
    product(reload?: boolean): Promise<_Product[] | null>;
    private _sub_order;
    sub_order(reload?: boolean): Promise<_Sub_order[] | null>;
    private _user_billing;
    user_billing(reload?: boolean): Promise<_User_billing[] | null>;
    private _user_delivery;
    user_delivery(reload?: boolean): Promise<_User_delivery[] | null>;
    private _user_role;
    user_role(reload?: boolean): Promise<_User_role[] | null>;
    constructor(obj: {
        user_pass?: string;
        user_email?: string;
        firstname?: string;
        lastname?: string;
        birthdate?: number;
        token?: string;
    });
    get db(): Prisma.UserDelegate<undefined>;
    static all(where?: Partial<_UserFields>): Promise<_User[]>;
    static fromId(id: number): Promise<_User | null>;
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
