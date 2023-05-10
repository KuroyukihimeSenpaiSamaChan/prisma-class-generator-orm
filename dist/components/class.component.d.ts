import { Echoable } from '../interfaces/echoable';
import { FieldComponent } from './field.component';
import { BaseComponent } from './base.component';
export declare class ClassComponent extends BaseComponent implements Echoable {
    name: string;
    isEnum: boolean;
    fields?: FieldComponent[];
    relationTypes?: string[];
    enumTypes?: string[];
    extra?: string;
    constructor(obj?: {
        name: string;
    });
    echo: () => string;
}
