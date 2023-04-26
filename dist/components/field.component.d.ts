import { Echoable } from '../interfaces/echoable';
import { BaseComponent } from './base.component';
import { FieldRelationMany, FieldRelationNormal } from '../convertor';
export declare class FieldComponent extends BaseComponent implements Echoable {
    name: string;
    nullable: boolean;
    useUndefinedDefault: boolean;
    isId: boolean;
    privateFromRelation: boolean;
    default?: string;
    type?: string;
    unique?: boolean;
    relation?: FieldRelationNormal | FieldRelationMany;
    echo: () => string;
    constructor(obj: {
        name: string;
        useUndefinedDefault: boolean;
        isId: boolean;
    });
}
