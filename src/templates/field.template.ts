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
private _#!{NAME}: _#!{TYPE} #!{NULLABLE}
get #!{NAME}(): _#!{TYPE} #!{NULLABLE} {
	return this._#!{NAME}
}
set #!{NAME}(value: _#!{TYPE}) {
	this._#!{NAME} = value
	this._#!{FOREIGNKEY} = value.id
}
get #!{FOREIGNKEY}(): ForeignKey {
	if(this._#!{NAME} === null){
		return this._#!{FOREIGNKEY}
	} else {
		return this._#!{NAME}.primaryKey
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