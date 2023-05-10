import { DMMF } from '@prisma/generator-helper'
import { ClassComponent } from './components/class.component'
import { FieldComponent } from './components/field.component'
import { PrismaClassGeneratorConfig } from './generator'
import {
	arrayify,
	uniquify
} from './util'

/** BigInt, Boolean, Bytes, DateTime, Decimal, Float, Int, JSON, String, $ModelName */
type DefaultPrismaFieldType =
	| 'BigInt'
	| 'Boolean'
	| 'Bytes'
	| 'DateTime'
	| 'Decimal'
	| 'Float'
	| 'Int'
	| 'Json'
	| 'String'

const primitiveMapType: Record<DefaultPrismaFieldType, string> = {
	Int: 'number',
	String: 'string',
	DateTime: 'Date',
	Boolean: 'boolean',
	Json: 'any',
	BigInt: 'BigInt',
	Float: 'number',
	Decimal: 'number',
	Bytes: 'Buffer',
} as const

export type PrimitiveMapTypeKeys = keyof typeof primitiveMapType
export type PrimitiveMapTypeValues =
	typeof primitiveMapType[PrimitiveMapTypeKeys]

export type FieldRelationNormal = {
	hasMany?: FieldComponent,
	hasOne?: FieldComponent,
	fromField?: string[],
	toId?: string[]
}

export type FieldRelationMany = {
	A?: FieldComponent,
	B?: FieldComponent,
	name: string
}

export const isRelationNormal = (obj?: FieldRelationNormal | FieldRelationMany | {}): obj is FieldRelationNormal => {
	return obj !== undefined && Object.keys(obj).includes("hasMany")
}

export const isRelationMany = (obj?: FieldRelationNormal | FieldRelationMany | {}): obj is FieldRelationMany => {
	return obj !== undefined && Object.keys(obj).includes("A")
}

export interface ConvertModelInput {
	model: DMMF.Model
	extractRelationFields?: boolean
	postfix?: string
	useGraphQL?: boolean
}

export class PrismaConvertor {
	static instance: PrismaConvertor

	private _config: PrismaClassGeneratorConfig
	private _dmmf: DMMF.Document

	_classesRelations: {
		[key: string]: FieldRelationNormal | FieldRelationMany
	}

	public get dmmf() {
		return this._dmmf
	}

	public set dmmf(value) {
		this._dmmf = value
	}

	public get config() {
		return this._config
	}

	public set config(value) {
		this._config = value
	}

	static getInstance() {
		if (PrismaConvertor.instance) {
			return PrismaConvertor.instance
		}
		PrismaConvertor.instance = new PrismaConvertor()
		return PrismaConvertor.instance
	}

	getPrimitiveMapTypeFromDMMF = (
		dmmfField: DMMF.Field,
	): PrimitiveMapTypeValues => {
		if (typeof dmmfField.type !== 'string') {
			return 'unknown'
		}
		return primitiveMapType[dmmfField.type]
	}

	getClass = (input: ConvertModelInput): ClassComponent => {
		/** options */
		const options = Object.assign(
			{
				extractRelationFields: null,
				useGraphQL: false,
			},
			input,
		)
		const {
			model,
			extractRelationFields = null,
			postfix
		} = options

		/** set class name */
		let className = model.name
		if (postfix) {
			className += postfix
		}

		const classComponent = new ClassComponent({ name: className })
		if ((this._config.enums as string[]).includes(className)) {
			classComponent.isEnum = true
		}

		/** relation & enums */
		const relationTypes = uniquify(
			model.fields
				.filter(
					(field) => field.relationName && model.name !== field.type,
				)
				.map((v) => v.type),
		)

		const enums = model.fields.filter((field) => field.kind === 'enum')
		const fields = {}
		classComponent.fields = model.fields
			.filter((field) => {
				if (extractRelationFields === true) {
					return field.relationName
				}
				if (extractRelationFields === false) {
					return !field.relationName
				}
				return true
			})
			.map((field) => this.convertField(field, fields))
		classComponent.relationTypes =
			extractRelationFields === false ? [] : relationTypes

		classComponent.enumTypes =
			extractRelationFields === true
				? []
				: enums.map((field) => field.type.toString())

		return classComponent
	}

	/**
	 * one prisma model could generate multiple classes!
	 *
	 * CASE 1: if you want separate model to normal class and relation class
	 */
	getClasses = (): ClassComponent[] => {
		const models = this.dmmf.datamodel.models

		this._classesRelations = {}

		/** separateRelationFields */
		if (this.config.separateRelationFields === true) {
			return [
				...models.map((model) =>
					this.getClass({
						model,
						extractRelationFields: true,
						postfix: 'Relations',
					}),
				),
				...models.map((model) =>
					this.getClass({
						model,
						extractRelationFields: false,
					}),
				),
			]
		}

		return models.map((model) => this.getClass({ model }))
	}

	convertField = (dmmfField: DMMF.Field, fields: { [key: string]: FieldComponent | boolean }): FieldComponent => {
		const field = new FieldComponent({
			name: dmmfField.name,
			useUndefinedDefault: this._config.useUndefinedDefault,
			isId: dmmfField.isId,
		})

		fields[field.name] = field

		// If the field is a relation
		if (dmmfField.relationName !== undefined) {
			// If the field is Many to Many
			if (dmmfField.relationName.startsWith("_MtM_")) {
				// If it is the first in the MtM relation
				if (
					!Object.keys(this._classesRelations).includes(
						dmmfField.relationName,
					)
				) {
					this._classesRelations[dmmfField.relationName] = {
						A: field,
						name: dmmfField.relationName
					}
				}
				// Or the second 
				else {
					this._classesRelations[dmmfField.relationName] = {
						...this._classesRelations[dmmfField.relationName],
						B: field
					}
				}
			}
			// If it's One to Many or Many to One
			else {
				if (
					!Object.keys(this._classesRelations).includes(
						dmmfField.relationName,
					)
				) {
					this._classesRelations[dmmfField.relationName] = {}
				}
				// If it's One to Many
				if (dmmfField.relationFromFields.length === 0) {
					this._classesRelations[dmmfField.relationName] = {
						...this._classesRelations[dmmfField.relationName],
						hasMany: field
					}
				}
				// Or Many to One
				else {
					this._classesRelations[dmmfField.relationName] = {
						...this._classesRelations[dmmfField.relationName],
						hasOne: field,
						fromField: dmmfField.relationFromFields,
						toId: dmmfField.relationToFields
					}
					const fieldPrivate = fields[dmmfField.relationFromFields[0]]
					if (fieldPrivate === undefined) {
						fields[dmmfField.relationFromFields[0]] = true
					} else if (typeof fieldPrivate === 'object') {
						fieldPrivate.privateFromRelation = true
					}
				}
			}

			field.relation = this._classesRelations[dmmfField.relationName]
		}

		field.unique = dmmfField.isUnique

		let type = this.getPrimitiveMapTypeFromDMMF(dmmfField)

		if (dmmfField.isRequired === false) {
			field.nullable = true
		}

		if (dmmfField.hasDefaultValue) {
			if (typeof dmmfField.default !== 'object') {
				field.default = dmmfField.default?.toString()
				if (dmmfField.kind === 'enum') {
					field.default = `${dmmfField.type}.${dmmfField.default}`
				} else if (dmmfField.type === 'BigInt') {
					field.default = `BigInt(${field.default})`
				} else if (dmmfField.type === 'String') {
					field.default = `'${field.default}'`
				}
			} else if (Array.isArray(dmmfField.default)) {
				if (dmmfField.type === 'String') {
					field.default = `[${dmmfField.default
						.map((d) => `'${d}'`)
						.toString()}]`
				} else {
					field.default = `[${dmmfField.default.toString()}]`
				}
			}
		}

		if (type) {
			field.type = type
		} else {
			field.type = dmmfField.type
		}

		if (dmmfField.isList) {
			field.type = arrayify(field.type)
		}

		return field
	}
}
