import { _User } from './user';
import { Prisma } from '@prisma/client';
export type _Access_tokenFields = {
    id: number;
    user_id: number;
    token: string;
};
export type _Access_tokenUniqueFields = {
    id: number;
};
export declare class _Access_token {
    static db: Prisma.Access_tokenDelegate<undefined>;
    id: number;
    user_id?: number;
    token?: string;
    created_at?: number;
    expires_at?: number;
    private _user;
    user(reload?: boolean): Promise<_User | null>;
    constructor(obj: {
        user_id?: number;
        token?: string;
    });
    get db(): Prisma.Access_tokenDelegate<undefined>;
    static all(where?: _Access_tokenFields): Promise<_Access_token[]>;
    static fromId(id: number): Promise<_Access_token | null>;
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
