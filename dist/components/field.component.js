"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldComponent = void 0;
const field_template_1 = require("../templates/field.template");
const base_component_1 = require("./base.component");
const convertor_1 = require("../convertor");
class FieldComponent extends base_component_1.BaseComponent {
    constructor(obj) {
        super(obj);
        this.privateFromRelation = false;
        this.echo = () => {
            let name = this.name;
            if (!this.relation && !this.isId && !this.privateFromRelation) {
                name += '?';
            }
            let type = this.type;
            if (this.privateFromRelation) {
                name = `private ${name}`;
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
            else {
                if (this.useUndefinedDefault === true) {
                    defaultValue = `= undefined`;
                }
            }
            let template = '';
            let foreignKey = '';
            if (!this.relation) {
                template = field_template_1.FIELD_TEMPLATE;
            }
            else {
                if (!(0, convertor_1.isRelationMany)(this.relation)) {
                    if (this.relation.hasOne === this) {
                        template = field_template_1.FIELD_TO_ONE_TEMPLATE;
                        foreignKey = this.relation.fromField[0];
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
                .replaceAll('#!{FOREIGNKEY}', foreignKey);
        };
    }
}
exports.FieldComponent = FieldComponent;
//# sourceMappingURL=field.component.js.map