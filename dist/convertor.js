"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaConvertor = exports.isRelationMany = exports.isRelationNormal = void 0;
const class_component_1 = require("./components/class.component");
const field_component_1 = require("./components/field.component");
const util_1 = require("./util");
const primitiveMapType = {
    Int: 'number',
    String: 'string',
    DateTime: 'Date',
    Boolean: 'boolean',
    Json: 'any',
    BigInt: 'BigInt',
    Float: 'number',
    Decimal: 'number',
    Bytes: 'Buffer',
};
const isRelationNormal = (obj) => {
    return obj !== undefined && Object.keys(obj).includes("hasMany");
};
exports.isRelationNormal = isRelationNormal;
const isRelationMany = (obj) => {
    return obj !== undefined && Object.keys(obj).includes("A");
};
exports.isRelationMany = isRelationMany;
class PrismaConvertor {
    constructor() {
        this.getPrimitiveMapTypeFromDMMF = (dmmfField) => {
            if (typeof dmmfField.type !== 'string') {
                return 'unknown';
            }
            return primitiveMapType[dmmfField.type];
        };
        this.getClass = (input) => {
            const options = Object.assign({
                extractRelationFields: null,
                useGraphQL: false,
            }, input);
            const { model, extractRelationFields = null, postfix } = options;
            let className = model.name;
            if (postfix) {
                className += postfix;
            }
            const classComponent = new class_component_1.ClassComponent({ name: className });
            const relationTypes = (0, util_1.uniquify)(model.fields
                .filter((field) => field.relationName && model.name !== field.type)
                .map((v) => v.type));
            const enums = model.fields.filter((field) => field.kind === 'enum');
            const fields = {};
            classComponent.fields = model.fields
                .filter((field) => {
                if (extractRelationFields === true) {
                    return field.relationName;
                }
                if (extractRelationFields === false) {
                    return !field.relationName;
                }
                return true;
            })
                .map((field) => this.convertField(field, fields));
            classComponent.relationTypes =
                extractRelationFields === false ? [] : relationTypes;
            classComponent.enumTypes =
                extractRelationFields === true
                    ? []
                    : enums.map((field) => field.type.toString());
            return classComponent;
        };
        this.getClasses = () => {
            const models = this.dmmf.datamodel.models;
            this._classesRelations = {};
            if (this.config.separateRelationFields === true) {
                return [
                    ...models.map((model) => this.getClass({
                        model,
                        extractRelationFields: true,
                        postfix: 'Relations',
                    })),
                    ...models.map((model) => this.getClass({
                        model,
                        extractRelationFields: false,
                    })),
                ];
            }
            return models.map((model) => this.getClass({ model }));
        };
        this.convertField = (dmmfField, fields) => {
            var _a;
            const field = new field_component_1.FieldComponent({
                name: dmmfField.name,
                useUndefinedDefault: this._config.useUndefinedDefault,
                isId: dmmfField.isId,
            });
            fields[field.name] = field;
            if (dmmfField.relationName !== undefined) {
                if (dmmfField.relationName.startsWith("_MtM_")) {
                    if (!Object.keys(this._classesRelations).includes(dmmfField.relationName)) {
                        this._classesRelations[dmmfField.relationName] = {
                            A: field,
                            name: dmmfField.relationName
                        };
                    }
                    else {
                        this._classesRelations[dmmfField.relationName] = {
                            ...this._classesRelations[dmmfField.relationName],
                            B: field
                        };
                    }
                }
                else {
                    if (!Object.keys(this._classesRelations).includes(dmmfField.relationName)) {
                        this._classesRelations[dmmfField.relationName] = {};
                    }
                    if (dmmfField.relationFromFields.length === 0) {
                        this._classesRelations[dmmfField.relationName] = {
                            ...this._classesRelations[dmmfField.relationName],
                            hasMany: field
                        };
                    }
                    else {
                        this._classesRelations[dmmfField.relationName] = {
                            ...this._classesRelations[dmmfField.relationName],
                            hasOne: field,
                            fromField: dmmfField.relationFromFields,
                            toId: dmmfField.relationToFields
                        };
                        const fieldPrivate = fields[dmmfField.relationFromFields[0]];
                        if (fieldPrivate === undefined) {
                            fields[dmmfField.relationFromFields[0]] = true;
                        }
                        else if (typeof fieldPrivate === 'object') {
                            fieldPrivate.privateFromRelation = true;
                        }
                    }
                }
                field.relation = this._classesRelations[dmmfField.relationName];
            }
            field.unique = dmmfField.isUnique;
            let type = this.getPrimitiveMapTypeFromDMMF(dmmfField);
            if (dmmfField.isRequired === false) {
                field.nullable = true;
            }
            if (dmmfField.hasDefaultValue) {
                if (typeof dmmfField.default !== 'object') {
                    field.default = (_a = dmmfField.default) === null || _a === void 0 ? void 0 : _a.toString();
                    if (dmmfField.kind === 'enum') {
                        field.default = `${dmmfField.type}.${dmmfField.default}`;
                    }
                    else if (dmmfField.type === 'BigInt') {
                        field.default = `BigInt(${field.default})`;
                    }
                    else if (dmmfField.type === 'String') {
                        field.default = `'${field.default}'`;
                    }
                }
                else if (Array.isArray(dmmfField.default)) {
                    if (dmmfField.type === 'String') {
                        field.default = `[${dmmfField.default
                            .map((d) => `'${d}'`)
                            .toString()}]`;
                    }
                    else {
                        field.default = `[${dmmfField.default.toString()}]`;
                    }
                }
            }
            if (type) {
                field.type = type;
            }
            else {
                field.type = dmmfField.type;
            }
            if (dmmfField.isList) {
                field.type = (0, util_1.arrayify)(field.type);
            }
            return field;
        };
    }
    get dmmf() {
        return this._dmmf;
    }
    set dmmf(value) {
        this._dmmf = value;
    }
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
    }
    static getInstance() {
        if (PrismaConvertor.instance) {
            return PrismaConvertor.instance;
        }
        PrismaConvertor.instance = new PrismaConvertor();
        return PrismaConvertor.instance;
    }
}
exports.PrismaConvertor = PrismaConvertor;
//# sourceMappingURL=convertor.js.map