import { DMMF } from '@prisma/generator-helper';
import { ClassComponent } from './components/class.component';
import { FieldComponent } from './components/field.component';
type DefaultPrismaFieldType = 'BigInt' | 'Boolean' | 'Bytes' | 'DateTime' | 'Decimal' | 'Float' | 'Int' | 'Json' | 'String';
declare const primitiveMapType: Record<DefaultPrismaFieldType, string>;
export type PrimitiveMapTypeKeys = keyof typeof primitiveMapType;
export type PrimitiveMapTypeValues = typeof primitiveMapType[PrimitiveMapTypeKeys];
export type FieldRelationNormal = {
    hasMany?: FieldComponent;
    hasOne?: FieldComponent;
    fromField?: string[];
    toId?: string[];
};
export type FieldRelationMany = {
    A?: FieldComponent;
    B?: FieldComponent;
    name: string;
};
export declare const isRelationNormal: (obj?: FieldRelationNormal | FieldRelationMany | {}) => obj is FieldRelationNormal;
export declare const isRelationMany: (obj?: FieldRelationNormal | FieldRelationMany | {}) => obj is FieldRelationMany;
export interface ConvertModelInput {
    model: DMMF.Model;
    extractRelationFields?: boolean;
    postfix?: string;
    useGraphQL?: boolean;
}
export declare class PrismaConvertor {
    static instance: PrismaConvertor;
    private _config;
    private _dmmf;
    _classesRelations: {
        [key: string]: FieldRelationNormal | FieldRelationMany;
    };
    get dmmf(): DMMF.Document;
    set dmmf(value: DMMF.Document);
    get config(): Partial<Record<"dryRun" | "separateRelationFields" | "useUndefinedDefault" | "enums", any>>;
    set config(value: Partial<Record<"dryRun" | "separateRelationFields" | "useUndefinedDefault" | "enums", any>>);
    static getInstance(): PrismaConvertor;
    getPrimitiveMapTypeFromDMMF: (dmmfField: DMMF.Field) => PrimitiveMapTypeValues;
    getClass: (input: ConvertModelInput) => ClassComponent;
    getClasses: () => ClassComponent[];
    convertField: (dmmfField: DMMF.Field, fields: {
        [key: string]: boolean | FieldComponent;
    }) => FieldComponent;
}
export {};
