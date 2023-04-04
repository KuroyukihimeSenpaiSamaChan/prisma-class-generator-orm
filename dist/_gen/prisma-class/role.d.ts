import { _User_role } from './user_role';
import { Prisma } from '@prisma/client';
export declare class _Role {
    static model: Prisma.RoleDelegate<undefined>;
    id: number;
    label?: string;
    protected _user_role: _User_role[] | null;
    user_role(): Promise<_User_role[] | null>;
    constructor(obj: {
        label?: string;
    });
    get model(): Prisma.RoleDelegate<undefined>;
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
