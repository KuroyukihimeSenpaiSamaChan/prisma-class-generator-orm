import { _Role } from './role';
import { _User } from './user';
import { Prisma } from '@prisma/client';
export type _User_roleFields = {
    user_id: number;
    role_id: number;
};
export type _User_roleUniqueFields = {};
export declare class _User_role {
    static db: Prisma.User_roleDelegate<undefined>;
    user_id?: number;
    role_id?: number;
    private _role;
    role(reload?: boolean): Promise<_Role | null>;
    private _user;
    user(reload?: boolean): Promise<_User | null>;
    constructor(obj: {
        user_id?: number;
        role_id?: number;
    });
    get db(): Prisma.User_roleDelegate<undefined>;
    static all(where?: Partial<_User_roleFields>): Promise<_User_role[]>;
    loadAll(depth?: number): Promise<void>;
}
