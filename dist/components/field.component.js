"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldComponent = void 0;
const field_template_1 = require("../templates/field.template");
const base_component_1 = require("./base.component");
const convertor_1 = require("../convertor");
class FieldComponent extends base_component_1.BaseComponent {
    name;
    nullable;
    useUndefinedDefault;
    isId;
    privateFromRelation = false;
    default;
    type;
    unique;
    relation;
    echo = () => {
        let name = this.name;
        let type = this.type;
        if (this.privateFromRelation) {
            type = 'ForeignKey';
        }
        let decorators = '';
        if (this.isId) {
            return field_template_1.FIELD_ID_TEMPLATE.replaceAll('#!{DECORATORS}', '// ID')
                .replaceAll('#!{NAME}', this.name)
                .replaceAll('#!{TYPE}', this.type);
        }
        else if (this.unique) {
            decorators = '// UNIQUE ';
        }
        if ((0, convertor_1.isRelationMany)(this.relation)) {
            decorators += 'ManyToMany';
        }
        let defaultValue = '';
        if (this.default) {
            defaultValue = `= ${this.default}`;
        }
        let template = '';
        let foreignKey = '';
        let toOneNullable = '';
        let toOneNullableGetter = '';
        if (!this.relation) {
            if (this.nullable)
                type += ' | null';
            template = field_template_1.FIELD_TEMPLATE;
            if (!this.privateFromRelation) {
                template += field_template_1.FIELD_TEMPLATE_GETTER;
            }
        }
        else {
            if (!(0, convertor_1.isRelationMany)(this.relation)) {
                if (this.relation.hasOne === this) {
                    template = field_template_1.FIELD_TO_ONE_TEMPLATE;
                    foreignKey = this.relation.fromField[0];
                    toOneNullable = this.nullable ? '| null = null' : '';
                    toOneNullableGetter = this.nullable ? '| null' : '';
                }
                else {
                    template = field_template_1.FIELD_TO_MANY_TEMPLATE;
                    type = this.type.substring(0, this.type.length - 2);
                }
            }
            else {
                template = field_template_1.FIELD_TO_MANY_TEMPLATE;
                type = this.type.substring(0, this.type.length - 2);
            }
        }
        return template.replaceAll('#!{NAME}', name)
            .replaceAll('#!{TYPE}', type)
            .replaceAll('#!{DECORATORS}', decorators)
            .replaceAll('#!{DEFAULT}', defaultValue)
            .replaceAll('#!{FOREIGNKEY}', foreignKey)
            .replaceAll('#!{NULLABLE}', toOneNullable)
            .replaceAll('#!{NULLABLE_GETTER}', toOneNullableGetter);
    };
    constructor(obj) {
        super(obj);
        this.name = obj.name;
        this.useUndefinedDefault = obj.useUndefinedDefault;
        this.isId = obj.isId;
    }
}
exports.FieldComponent = FieldComponent;
//# sourceMappingURL=field.component.js.map