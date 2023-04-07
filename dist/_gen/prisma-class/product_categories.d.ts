import { _Product_category } from './product_category';
import { Prisma } from '@prisma/client';
export type _Product_categoriesFields = {
    id: number;
    category_name: string;
    category_slug: string;
};
export type _Product_categoriesUniqueFields = {
    id: number;
};
export declare class _Product_categories {
    static db: Prisma.Product_categoriesDelegate<undefined>;
    id: number;
    category_name?: string;
    category_slug?: string;
    private _product_category;
    product_category(reload?: boolean): Promise<_Product_category[] | null>;
    constructor(obj: {
        category_name?: string;
        category_slug?: string;
    });
    get db(): Prisma.Product_categoriesDelegate<undefined>;
    static all(where?: _Product_categoriesFields): Promise<_Product_categories[]>;
    static fromId(id: number): Promise<_Product_categories | null>;
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
