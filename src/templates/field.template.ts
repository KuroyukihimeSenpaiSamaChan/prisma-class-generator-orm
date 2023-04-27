export const FIELD_TEMPLATE = `	#!{DECORATORS}
	#!{NAME}: #!{TYPE} #!{DEFAULT}
`

export const FIELD_ID_TEMPLATE = ` #!{DECORATORS}
	private _#!{NAME}: #!{TYPE} = -1
	get #!{NAME}(): #!{TYPE} {
		return this._#!{NAME}
	}
	get primaryKey(): #!{TYPE} {
		return this._#!{NAME}
	}
`

export const FIELD_TO_ONE_TEMPLATE = `
private _#!{NAME}: _#!{TYPE} | null
get #!{NAME}(): _#!{TYPE} | ForeignKey {
	return this._#!{NAME} ? this._#!{NAME} : this.#!{FOREIGNKEY}
}
set #!{NAME}(value: _#!{TYPE} | ForeignKey) {
	if (value instanceof _#!{TYPE}) {
		this._#!{NAME} = value
		this.#!{FOREIGNKEY} = value.id
	} else {
		this._#!{NAME} = null
		this.#!{FOREIGNKEY} = value
	}
}
`

export const FIELD_TO_MANY_TEMPLATE = `
private _#!{NAME}: RelationMany<_#!{TYPE}>
public get #!{NAME}(): RelationMany<_#!{TYPE}> {
	return this._#!{NAME}
}
private set #!{NAME}(value: RelationMany<_#!{TYPE}>) {
	this._#!{NAME} = value
}
`