"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassComponent = void 0;
const base_component_1 = require("./base.component");
const class_template_1 = require("../templates/class.template");
const all_template_1 = require("../templates/all.template");
const includes_template_1 = require("../templates/includes.template");
const convertor_1 = require("../convertor");
const load_save_template_1 = require("../templates/load-save.template");
const enum_template_1 = require("../templates/enum.template");
class ClassComponent extends base_component_1.BaseComponent {
    constructor() {
        super(...arguments);
        this.isEnum = false;
        this.enumTypes = [];
        this.extra = '';
        this.echo = () => {
            let primaryKey = '';
            let constructor = '';
            {
                let parameters = {
                    normal: '',
                    update: '',
                    toOne: '',
                    toMany: '',
                };
                let initialiazers = {
                    normal: '',
                    update: '',
                    toOne: '',
                    toMany: ''
                };
                let toJSONRelations = '';
                let toJSON = '';
                for (const _field of this.fields) {
                    toJSONRelations += `${_field.name}: this.${_field.name},`;
                    let fieldName = `${_field.name}${_field.default !== undefined ? '?' : ''}`;
                    if (_field.relation === undefined) {
                        toJSON += `${_field.name}: this.${_field.name}!,`;
                        if (_field.isId) {
                            primaryKey = _field.name;
                            parameters.normal = `${_field.name}?: ${_field.type},` + parameters.normal;
                            initialiazers.normal = `
						if(obj.${_field.name} !== undefined){
							this._${_field.name} = obj.${_field.name}
						}
						` + initialiazers.normal;
                        }
                        else if (!_field.privateFromRelation) {
                            parameters.update += `${_field.name}?: ${_field.type},`;
                            let opt = { parameter: '', initializer: '' };
                            if (_field.nullable) {
                                opt.parameter = ' | null';
                            }
                            if (_field.default) {
                                opt.initializer = ` ??  ${_field.default}`;
                            }
                            parameters.normal += `${fieldName}: ${_field.type} ${opt.parameter},`;
                            initialiazers.normal += `this.${_field.name} = obj.${_field.name} ${opt.initializer};`;
                            initialiazers.update += `if(obj.${_field.name} !== undefined){
							this.${_field.name} = obj.${_field.name}
						}
						`;
                        }
                        else {
                            parameters.normal += `${fieldName}: ForeignKey,`;
                        }
                    }
                    else if (!(0, convertor_1.isRelationMany)(_field.relation) && _field.relation.hasOne === _field) {
                        parameters.toOne += `${_field.name}?: _${_field.type} | ${_field.type},`;
                        initialiazers.toOne += `
					if (obj.${_field.name} !== undefined) {
						if (obj.${_field.name} instanceof _${_field.type}) {
							this.${_field.name} = obj.${_field.name}
						} else {
							this.${_field.name} = new _${_field.type}(obj.${_field.name})
						}
					} else if (obj.${_field.relation.fromField} !== undefined) {
						this._${_field.relation.fromField} = obj.${_field.relation.fromField}
					} else throw new Error("Invalid constructor.")
					`;
                    }
                    else {
                        const typeSingle = _field.type.substring(0, _field.type.length - 2);
                        parameters.toMany += `${_field.name}?: _${_field.type} | ${_field.type} | RelationMany<_${typeSingle}>,
					`;
                        initialiazers.toMany += `
					if (!obj.${_field.name} || obj.${_field.name}.length === 0) {
						this.${_field.name} = new RelationMany<_${typeSingle}>()
					} else if (obj.${_field.name} instanceof RelationMany) {
						this.${_field.name} = obj.${_field.name}
					} else if (obj.${_field.name}[0] instanceof _${typeSingle}) {
						this.${_field.name} = new RelationMany<_${typeSingle}>(obj.${_field.name} as _${_field.type})
					} else {
						const ${_field.name}Array: _${_field.type} = []
						for (const value of obj.${_field.name} as ${_field.type}) {
							${_field.name}Array.push(new _${typeSingle}(value))
						}
						this.${_field.name} = new RelationMany<_${typeSingle}>(${_field.name}Array)
					}
					`;
                    }
                }
                constructor = `
			constructor(obj:{
				${parameters.normal}
				${parameters.toOne}
				${parameters.toMany}
			}){
				this.init(obj)
			}

			private init(obj: ConstructorParameters<typeof _${this.name}>[0]){
				${initialiazers.normal}
				${initialiazers.toOne}
				${initialiazers.toMany}
			}

			update(obj: {
				${parameters.update}
			}){
				${initialiazers.update}
			}

			toJSON() { return {${toJSONRelations}} }
			nonRelationsToJSON() { return {${toJSON}} }
			`;
            }
            let loadMethod = '';
            {
                loadMethod = load_save_template_1.LOAD_TEMPLATE;
            }
            let saveMethod = '';
            let deleteMethod = '';
            {
                let checkRequireds = '';
                for (const _field of this.fields.filter((elem) => !elem.isId && !elem.nullable && elem.relation === undefined && !elem.privateFromRelation)) {
                    checkRequireds += `if(this.${_field.name} === undefined){
					throw new Error("Missing field on _${this.name}.save(): ${_field.name}")
				}`;
                }
                let checkToOne = '';
                let toOne = '';
                for (const _field of this.fields.filter(elem => elem.relation && !(0, convertor_1.isRelationMany)(elem.relation) && elem.relation.hasOne === elem)) {
                    if (!_field.nullable) {
                        checkToOne += `if(this.${_field.name} === undefined || this.${_field.name} === null){
						throw new Error("${_field.name} can't be null or undefined in _${this.name}.")
					}
					`;
                    }
                    toOne += `if(typeof this.${_field.name} !== 'number' && !this.${_field.name}!.saving){
					const ${_field.name}Yield = this.${_field.name}!.saveToTransaction(tx)
					await ${_field.name}Yield.next()
					saveYieldsArray.push(${_field.name}Yield)
				}

				`;
                }
                let checkToMany = '';
                let toMany = '';
                for (const _field of this.fields.filter(elem => elem.relation && !(0, convertor_1.isRelationMany)(elem.relation) && elem.relation.hasMany === elem)) {
                    checkToMany += `if(this.${_field.name}.length() > 0 && this.primaryKey === -1){
					throw new Error("Can't save toMany fields on new _${this.name}. Save it first, then add the toMany fields")
				}
				`;
                    toMany += `const ${_field.name}Yield = this.${_field.name}!.saveToTransaction(tx)
				await ${_field.name}Yield.next()
				saveYieldsArray.push(${_field.name}Yield)
				
				`;
                }
                let connectGenerate = '';
                let connectSave = '';
                let connectUpdate = '';
                for (const _field of this.fields.filter(elem => (0, convertor_1.isRelationMany)(elem.relation))) {
                    let toRelation;
                    if (!(0, convertor_1.isRelationMany)(_field.relation))
                        continue;
                    else {
                        if (_field.relation.A === _field) {
                            toRelation = _field.relation.B;
                        }
                        else {
                            toRelation = _field.relation.A;
                        }
                    }
                    connectGenerate += `const ${_field.name}Connections: Prisma.Enumerable<Prisma.${_field.type.slice(0, -2)}WhereUniqueInput> = []
				for(const relation of this.${_field.name}){
					${_field.name}Connections.push({
						id: relation.primaryKey,
					})
				}
				`;
                    connectGenerate += `const ${_field.name}Disconnections: Prisma.Enumerable<Prisma.${_field.type.slice(0, -2)}WhereUniqueInput> = []
				for(const relation of this.${_field.name}.toRemoveRelations){
					${_field.name}Connections.push({
						id: relation.primaryKey,
					})
				}
				
				`;
                    connectSave += `${_field.name}: {
					connect: ${_field.name}Connections
				},`;
                    connectUpdate += `${_field.name}: {
					connect: ${_field.name}Connections,
					disconnect: ${_field.name}Disconnections
				},`;
                }
                saveMethod = load_save_template_1.SAVE_TEMPLATE.replaceAll('#!{CHECK_FIELDS}', checkRequireds)
                    .replaceAll('#!{CHECK_TO_ONE}', checkToOne)
                    .replaceAll('#!{CHECK_TO_MANY}', checkToMany)
                    .replaceAll('#!{TO_ONE}', toOne)
                    .replaceAll('#!{TO_MANY}', toMany)
                    .replaceAll('#!{ID}', primaryKey)
                    .replaceAll('#!{P_NAME}', `${this.name.substring(0, 1).toLowerCase()}${this.name.substring(1)}`)
                    .replaceAll('#!{CONNECT_GEN}', connectGenerate)
                    .replaceAll('#!{CONNECT_SAVE}', connectSave)
                    .replaceAll('#!{CONNECT_UPDATE}', connectUpdate);
                deleteMethod = load_save_template_1.DELETE_TEMPLATE.replaceAll('#!{ID}', primaryKey)
                    .replaceAll('#!{CLASS}', `${this.name}`);
            }
            const importTypes = new Set();
            let getIncludes = '';
            {
                let relationFields = this.fields.filter((_field) => _field.relation);
                let includeFields = '';
                let includeDeep = '';
                let filterType = '';
                let includeDeepFilter = '';
                for (const _field of relationFields) {
                    includeFields += `${_field.name}: true,`;
                    let relationName = _field.type;
                    if (relationName.includes('[]')) {
                        relationName = relationName.substring(0, relationName.length - 2);
                    }
                    filterType += `${_field.name}?: boolean | Exclude<Parameters<typeof _${relationName}.getIncludes>[0], number>,`;
                    includeDeep += `${_field.name}: {include: _${relationName}.getIncludes(param - 1)},`;
                    includeDeepFilter += `${_field.name}: Object.keys(param).includes('${_field.name}')
				? (typeof param.${_field.name} === 'boolean'
					? true : {
						include: _${relationName}.getIncludes(param.${_field.name}),
					}
				) : undefined,`;
                    importTypes.add(relationName);
                }
                getIncludes = includeFields === '' ? '' :
                    includes_template_1.GET_INCLUDES_TEMPLATE.replaceAll('#!{INCLUDE_FIELDS}', includeFields).replaceAll('#!{INCLUDE_DEEP}', includeDeep)
                        .replaceAll('#!{FILTER_TYPE}', filterType)
                        .replaceAll('#!{INCLUDE_FILTER}', includeDeepFilter);
            }
            let enumList = '';
            if (this.isEnum) {
                enumList = enum_template_1.ENUM_TEMPLATE;
            }
            const fieldContent = this.fields.map((_field) => _field.echo());
            let importPrisma = '';
            for (const _import of importTypes.values()) {
                importPrisma += `, ${_import}`;
            }
            let str = class_template_1.CLASS_TEMPLATE.replaceAll('#!{FROM}', all_template_1.FROM_TEMPLATE)
                .replaceAll('#!{ALL}', all_template_1.ALL_TEMPLATE)
                .replaceAll('#!{LOAD}', loadMethod)
                .replaceAll('#!{SAVE}', saveMethod)
                .replaceAll('#!{DELETE}', deleteMethod)
                .replaceAll('#!{GET_INCLUDES}', getIncludes)
                .replaceAll('#!{ENUM_LIST}', `${enumList}`)
                .replaceAll('#!{NAME}', `${this.name}`)
                .replaceAll('#!{FIELDS}', fieldContent.join('\r\n'))
                .replaceAll('#!{EXTRA}', this.extra)
                .replaceAll('#!{CONSTRUCTOR}', constructor)
                .replaceAll('#!{IMPORTS_PRISMA}', importPrisma);
            return str;
        };
    }
}
exports.ClassComponent = ClassComponent;
//# sourceMappingURL=class.component.js.map