import { _User_role } from './user_role';
import { Prisma } from '@prisma/client';
export type _RoleFields = {
    id: number;
    label: string;
};
export type _RoleUniqueFields = {
    id: number;
};
export declare class _Role {
    static db: Prisma.RoleDelegate<undefined>;
    id: number;
    label?: string;
    private _user_role;
    user_role(reload?: boolean): Promise<_User_role[] | null>;
    constructor(obj: {
        label?: string;
    });
    get db(): Prisma.RoleDelegate<undefined>;
    static all(where?: _RoleFields): Promise<_Role[]>;
    static fromId(id: number): Promise<_Role | null>;
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
