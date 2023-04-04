import { _User } from './user';
import { _Product } from './product';
import { Prisma } from '@prisma/client';
export declare class _Media {
    static model: Prisma.MediaDelegate<undefined>;
    id: number;
    slug?: string;
    url?: string;
    creation_date?: number;
    modification_date?: number;
    user_id?: number;
    private _user;
    user(reload?: boolean): Promise<_User | null>;
    private _product;
    product(reload?: boolean): Promise<_Product[] | null>;
    constructor(obj: {
        slug?: string;
        url?: string;
        creation_date?: number;
        modification_date?: number;
        user_id?: number;
    });
    get model(): Prisma.MediaDelegate<undefined>;
    static fromId(id: number): Promise<_Media | null>;
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
