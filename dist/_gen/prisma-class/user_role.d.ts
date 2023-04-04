import { _Role } from './role';
import { _User } from './user';
import { Prisma } from '@prisma/client';
export declare class _User_role {
    static model: Prisma.User_roleDelegate<undefined>;
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
    get model(): Prisma.User_roleDelegate<undefined>;
    loadAll(depth?: number): Promise<void>;
}
