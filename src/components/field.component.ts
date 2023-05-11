import {
	FIELD_ID_TEMPLATE,
	FIELD_TEMPLATE, FIELD_TEMPLATE_GETTER, FIELD_TO_MANY_TEMPLATE, FIELD_TO_ONE_TEMPLATE
} from '../templates/field.template'
import { Echoable } from '../interfaces/echoable'
import { BaseComponent } from './base.component'
import { FieldRelationMany, FieldRelationNormal, isRelationMany } from '../convertor'

export class FieldComponent extends BaseComponent implements Echoable {
	name: string
	nullable: boolean
	useUndefinedDefault: boolean
	isId: boolean
	privateFromRelation: boolean = false
	default?: string
	type?: string
	unique?: boolean

	relation?: FieldRelationNormal | FieldRelationMany

	echo = () => {
		let name = this.name

		let type = this.type
		if (this.privateFromRelation) {
			type = 'ForeignKey'
		}

		let decorators = ''
		if (this.isId) {
			return FIELD_ID_TEMPLATE.replaceAll(
				'#!{DECORATORS}', '// ID'
			)
				.replaceAll('#!{NAME}', this.name)
				.replaceAll('#!{TYPE}', this.type)
		}
		else if (this.unique) {
			decorators = '// UNIQUE '
		}

		if (isRelationMany(this.relation)) {
			decorators += 'ManyToMany'
		}

		let defaultValue = ''
		if (this.default) {
			defaultValue = `= ${this.default}`
		}

		let template = ''
		let foreignKey = ''
		let toOneNullable = ''
		if (!this.relation) {
			if (this.nullable) type += ' | null'
			template = FIELD_TEMPLATE
			if (!this.privateFromRelation) {
				template += FIELD_TEMPLATE_GETTER
			}
		} else {
			if (!isRelationMany(this.relation)) {
				if (this.relation.hasOne === this) {
					template = FIELD_TO_ONE_TEMPLATE
					foreignKey = this.relation.fromField[0]
					toOneNullable = this.nullable ? '| null = null' : ''
				} else {
					template = FIELD_TO_MANY_TEMPLATE
					type = this.type.substring(0, this.type.length - 2)
				}
			} else {
				template = FIELD_TO_MANY_TEMPLATE
				type = this.type.substring(0, this.type.length - 2)
			}
		}

		return template.replaceAll('#!{NAME}', name)
			.replaceAll('#!{TYPE}', type)
			.replaceAll('#!{DECORATORS}', decorators)
			.replaceAll('#!{DEFAULT}', defaultValue)
			.replaceAll('#!{FOREIGNKEY}', foreignKey)
			.replaceAll('#!{NULLABLE}', toOneNullable)
	}

	constructor(obj: {
		name: string
		useUndefinedDefault: boolean
		isId: boolean
	}) {
		super(obj)
		this.name = obj.name
		this.useUndefinedDefault = obj.useUndefinedDefault
		this.isId = obj.isId
	}
}
