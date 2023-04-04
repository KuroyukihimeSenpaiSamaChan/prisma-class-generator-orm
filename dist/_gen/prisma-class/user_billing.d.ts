import { _User } from './user';
import { Prisma } from '@prisma/client';
export declare class _User_billing {
    static model: Prisma.User_billingDelegate<undefined>;
    id: number;
    user_id?: number;
    address?: string;
    additional_address?: string;
    zipcode?: string;
    city?: string;
    country?: string;
    region?: string;
    phone_number?: string;
    company_name?: string;
    private _user;
    user(reload?: boolean): Promise<_User | null>;
    constructor(obj: {
        user_id?: number;
        address?: string;
        zipcode?: string;
        city?: string;
        country?: string;
        region?: string;
        phone_number?: string;
    });
    get model(): Prisma.User_billingDelegate<undefined>;
    static fromId(id: number): Promise<_User_billing | null>;
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
