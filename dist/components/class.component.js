"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassComponent = void 0;
const class_template_1 = require("../templates/class.template");
const idmodel_template_1 = require("../templates/idmodel.template");
const base_component_1 = require("./base.component");
class ClassComponent extends base_component_1.BaseComponent {
    constructor() {
        super(...arguments);
        this.enumTypes = [];
        this.extra = '';
        this.echo = () => {
            const fieldsNonNullable = this.fields.reduce((acc, _field) => {
                if (_field.nullable ||
                    _field.relation ||
                    _field.default !== undefined) {
                    return acc;
                }
                acc.push(_field);
                return acc;
            }, []);
            let constructor = '';
            if (fieldsNonNullable.length > 0) {
                let declaration = '';
                let initialization = '';
                for (const _field of fieldsNonNullable) {
                    if (_field.isId)
                        continue;
                    declaration += `${_field.name}?: ${_field.type}, `;
                    initialization += `this.${_field.name} = obj.${_field.name}
				`;
                }
                constructor = `
			constructor(obj: {${declaration}}){
				${initialization}
				Object.assign(this, obj)
			}
			`;
            }
            const prismamodel_type = `Prisma.${this.name}Delegate<undefined>`;
            const model_getter = `get model(): ${prismamodel_type} {
			return _${this.name}.model
		}`;
            let fromId = '';
            const fieldId = this.fields.filter((_field) => _field.isId);
            if (fieldId.length === 1) {
                const relationFields = this.fields.reduce((acc, _field) => {
                    if (_field.relation)
                        acc.push(_field.relation.relationFromFields[0]);
                    return acc;
                }, []);
                let fieldsDataCreate = '';
                let fieldsDataUpdate = '';
                for (const _field of this.fields) {
                    if (_field.relation !== void 0)
                        continue;
                    fieldsDataUpdate += `${_field.name}: this.${_field.name},`;
                    if (_field.isId && !relationFields.includes(_field.name))
                        continue;
                    fieldsDataCreate += `${_field.name}: this.${_field.name},`;
                }
                let trueCheckRequired = `if(
				#!{TRUE_CHECK_REQUIRED}
			){
				return {status: false}
			}`;
                let checkRequired = '';
                for (const _field of fieldsNonNullable) {
                    if (_field.isId)
                        continue;
                    checkRequired += `this.${_field.name} === void 0
				|| `;
                }
                if (checkRequired.length > 0) {
                    checkRequired = checkRequired.substring(0, checkRequired.length - 3);
                    trueCheckRequired = trueCheckRequired.replace('#!{TRUE_CHECK_REQUIRED}', checkRequired);
                }
                else {
                    trueCheckRequired = '';
                }
                fromId = idmodel_template_1.IDMODEL_TEMPLATE.replaceAll('#!{FIELD_NAME}', `${fieldId[0].name}`)
                    .replaceAll('#!{REQUIRED_FIELDS_CREATE}', fieldsDataCreate)
                    .replaceAll('#!{REQUIRED_FIELDS_UPDATE}', fieldsDataUpdate)
                    .replaceAll('#!{CHECK_REQUIRED}', trueCheckRequired);
            }
            const fieldContent = this.fields.map((_field) => _field.echo());
            let str = class_template_1.CLASS_TEMPLATE.replace('#!{DECORATORS}', this.echoDecorators())
                .replaceAll('#!{FROMID}', `${fromId}`)
                .replaceAll('#!{NAME}', `${this.name}`)
                .replaceAll('#!{FIELDS}', fieldContent.join('\r\n'))
                .replaceAll('#!{EXTRA}', this.extra)
                .replaceAll('#!{CONSTRUCTOR}', constructor)
                .replaceAll('#!{PRISMAMODEL_TYPE}', prismamodel_type)
                .replaceAll('#!{MODEL_GETTER}', model_getter);
            return str;
        };
        this.reExportPrefixed = (prefix) => {
            return `export class _${this.name} extends ${prefix}${this.name} {}`;
        };
    }
}
exports.ClassComponent = ClassComponent;
//# sourceMappingURL=class.component.js.map