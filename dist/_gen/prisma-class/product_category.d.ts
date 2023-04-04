import { _Product_categories } from './product_categories';
import { _Product } from './product';
import { Prisma } from '@prisma/client';
export declare class _Product_category {
    static model: Prisma.Product_categoryDelegate<undefined>;
    product_id?: number;
    category_id?: number;
    private _product_categories;
    product_categories(reload?: boolean): Promise<_Product_categories | null>;
    private _product;
    product(reload?: boolean): Promise<_Product | null>;
    constructor(obj: {
        product_id?: number;
        category_id?: number;
    });
    get model(): Prisma.Product_categoryDelegate<undefined>;
    loadAll(depth?: number): Promise<void>;
}
