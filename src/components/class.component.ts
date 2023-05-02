import { Echoable } from '../interfaces/echoable'
import { FieldComponent } from './field.component'
import { BaseComponent } from './base.component'
import { CLASS_TEMPLATE } from '../templates/class.template'
import { ALL_TEMPLATE, FROM_TEMPLATE } from '../templates/all.template'
import { GET_INCLUDES_TEMPLATE } from '../templates/includes.template'
import { isRelationMany } from '../convertor'
import { DELETE_TEMPLATE, LOAD_TEMPLATE, SAVE_TEMPLATE } from '../templates/load-save.template'

export class ClassComponent extends BaseComponent implements Echoable {
	name: string

	fields?: FieldComponent[]
	relationTypes?: string[]
	enumTypes?: string[] = []
	extra?: string = ''

	echo = () => {
		let primaryKey = ''
		// Generate the constructor for non-nullable fields
		let constructor = ''
		{
			let parameters = {
				normal: '',
				toOne: '',
				toMany: '',
			}
			let initialiazers = {
				normal: '',
				update: '',
				toOne: '',
				toMany: ''
			}
			let toJSONRelations = ''
			let toJSON = ''
			for (const _field of this.fields) {
				toJSONRelations += `${_field.name}: this.${_field.name},`
				// If field is normal
				if (_field.relation === undefined) {
					toJSON += `${_field.name}: this.${_field.name}!,`
					if (_field.isId) {
						primaryKey = _field.name
						parameters.normal = `${_field.name}?: ${_field.type},` + parameters.normal;
						initialiazers.normal = `
						if(obj.${_field.name} !== undefined){
							this._${_field.name} = obj.${_field.name}
						}
						` + initialiazers.normal
					}
					else if (!_field.privateFromRelation) {
						let opt = { parameter: '', initializer: '' }
						if (_field.nullable) {
							opt.parameter = ' | null'
							opt.initializer = ` !== null ? obj.${_field.name} : undefined`
						} else if (_field.default) {
							opt.initializer = ` !== undefined ? obj.${_field.name} : ${_field.default}`
						}
						parameters.normal += `${_field.name}?: ${_field.type} ${opt.parameter},`
						initialiazers.normal += `this.${_field.name} =  obj.${_field.name} ${opt.initializer};`
						initialiazers.update += `if(obj.${_field.name} !== undefined){
							this.${_field.name} = obj.${_field.name}
						}
						`
					} else {
						parameters.normal += `${_field.name}?: ForeignKey,`
					}
				}
				// If it is a relation toOne
				else if (!isRelationMany(_field.relation) && _field.relation.hasOne === _field) {
					parameters.toOne += `${_field.name}?: _${_field.type} | ${_field.type} | ForeignKey,`
					initialiazers.toOne += `
					if(!obj.${_field.name}){
						if (obj.${_field.relation.fromField} === undefined){
							this.${_field.name} = null
						}else{
							this.${_field.name} = obj.${_field.relation.fromField}
						}
					} else if(obj.${_field.name} instanceof _${_field.type}) {
						this.${_field.name} = obj.${_field.name}
					} else if (typeof obj.${_field.name} === 'number') {
						this.${_field.name} = obj.${_field.name}
					} else {
						this.${_field.name} = new _${_field.type}(obj.${_field.name})
					}
					`
				}
				// If it is a relation toMany
				else {
					const typeSingle = _field.type.substring(0, _field.type.length - 2)
					parameters.toMany += `${_field.name}?: _${_field.type} | ${_field.type} | RelationMany<_${typeSingle}>,
					`
					initialiazers.toMany += `
					if (!obj.${_field.name} || obj.${_field.name}.length === 0) {
						this.${_field.name} = new RelationMany<_${typeSingle}>([])
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
					`
				}
			}
			constructor = `
			constructor(obj:{
				${parameters.normal}
				${parameters.toOne}
				${parameters.toMany}
			}){
				super()
				this.init(obj)
			}

			private init(obj: ConstructorParameters<typeof _${this.name}>[0]){
				${initialiazers.normal}
				${initialiazers.toOne}
				${initialiazers.toMany}
			}

			update(obj: {
				${parameters.normal}
			}){
				${initialiazers.update}
			}

			toJSON() { return {${toJSONRelations}} }
			nonRelationsToJSON() { return {${toJSON}} }
			`
		}

		// Generate the save method
		let loadMethod = ''
		{
			loadMethod = LOAD_TEMPLATE
		}

		// Generate the load method
		let saveMethod = ''
		let deleteMethod = ''
		{
			let checkRequireds = ''
			for (const _field of this.fields.filter((elem) => !elem.isId && !elem.nullable && elem.relation === undefined && !elem.privateFromRelation)) {
				checkRequireds += `if(this.${_field.name} === undefined){
					throw new Error("Missing field on _${this.name}.save(): ${_field.name}")
				}`
			}

			let checkToOne = ''
			let toOne = ''
			for (const _field of this.fields.filter(elem => elem.relation && !isRelationMany(elem.relation) && elem.relation.hasOne === elem)) {
				if (!_field.nullable) {
					checkToOne += `if(this.${_field.name} === undefined || this.${_field.name} === null){
						throw new Error("${_field.name} can't be null or undefined in _${this.name}.")
					}
					`
				}
				//this.${_field.name} !== undefined && this.${_field.name} !== null && 
				toOne += `if(typeof this.${_field.name} !== 'number'){
					const ${_field.name}Yield = this.${_field.name}!.saveToTransaction(tx)
					await ${_field.name}Yield.next()
					saveYieldsArray.push(${_field.name}Yield)
				}

				`
			}

			let checkToMany = ''
			let toMany = ''
			for (const _field of this.fields.filter(elem => elem.relation && (isRelationMany(elem.relation) || elem.relation.hasMany === elem))) {
				checkToMany += `if(this.${_field.name}.length() > 0 && this.primaryKey === -1){
					throw new Error("Can't save toMany fields on new _${this.name}. Save it first, then add the toMany fields")
				}
				`
				toMany += `const ${_field.name}Yield = this.${_field.name}!.saveToTransaction(tx)
				await ${_field.name}Yield.next()
				saveYieldsArray.push(${_field.name}Yield)
				
				`
			}

			let connectGenerate = ''
			let connectSave = ''
			for (const _field of this.fields.filter(elem => isRelationMany(elem.relation))) {
				let toRelation: FieldComponent
				if (!isRelationMany(_field.relation)) continue
				else {
					if (_field.relation.A === _field) {
						toRelation = _field.relation.B
					} else {
						toRelation = _field.relation.A
					}
				}
				connectGenerate += `const ${_field.name}Connections: Prisma.Enumerable<Prisma.${_field.type.slice(0, -2)}WhereUniqueInput> = []
				for(const relation of this.${_field.name}){
					${_field.name}Connections.push({
						id: relation.primaryKey,
					})
				}
				`

				connectSave += `${_field.name}: {
					connect: ${_field.name}Connections
				},`
			}

			saveMethod = SAVE_TEMPLATE.replaceAll(
				'#!{CHECK_FIELDS}', checkRequireds)
				.replaceAll('#!{CHECK_TO_ONE}', checkToOne)
				.replaceAll('#!{CHECK_TO_MANY}', checkToMany)
				.replaceAll('#!{TO_ONE}', toOne)
				.replaceAll('#!{TO_MANY}', toMany)
				.replaceAll('#!{ID}', primaryKey)
				.replaceAll('#!{P_NAME}', `${this.name.substring(0, 1).toLowerCase()}${this.name.substring(1)}`)
				.replaceAll('#!{CONNECT_GEN}', connectGenerate)
				.replaceAll('#!{CONNECT_SAVE}', connectSave)

			deleteMethod = DELETE_TEMPLATE.replaceAll(
				'#!{ID}', primaryKey)
				.replaceAll('#!{CLASS}', `${this.name}`)
		}

		// Generate the getClassIncludes
		const importTypes = new Set<string>();
		let relationFields = this.fields.filter((_field) => _field.relation)
		let includeFields = ''
		let includeDeep = ''
		for (const _field of relationFields) {
			includeFields += `${_field.name}: true,`
			let relationName = _field.type
			if (relationName.includes('[]')) {
				relationName = relationName.substring(0, relationName.length - 2)
			}
			importTypes.add(relationName)
			includeDeep += `${_field.name}: {include: _${relationName}.getIncludes(deep-1)},`
		}
		let getIncludes = includeFields !== '' ? GET_INCLUDES_TEMPLATE.replaceAll(
			'#!{INCLUDE_FIELDS}',
			includeFields
		).replaceAll('#!{INCLUDE_DEEP}', includeDeep) : ''

		const fieldContent = this.fields.map((_field) => _field.echo())

		let importPrisma = ''
		for (const _import of importTypes.values()) {
			importPrisma += `, ${_import}`
		}

		let str = CLASS_TEMPLATE.replaceAll(
			'#!{FROM}', FROM_TEMPLATE
		)
			.replaceAll('#!{ALL}', ALL_TEMPLATE)
			.replaceAll('#!{LOAD}', loadMethod)
			.replaceAll('#!{SAVE}', saveMethod)
			.replaceAll('#!{DELETE}', deleteMethod)
			.replaceAll('#!{GET_INCLUDES}', getIncludes)
			.replaceAll('#!{NAME}', `${this.name}`)
			.replaceAll('#!{FIELDS}', fieldContent.join('\r\n'))
			.replaceAll('#!{EXTRA}', this.extra)
			.replaceAll('#!{CONSTRUCTOR}', constructor)
			.replaceAll('#!{IMPORTS_PRISMA}', importPrisma)

		return str
	}
}