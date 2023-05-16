export const FIELD_TEMPLATE = `	#!{DECORATORS}
	private _#!{NAME}: #!{TYPE} #!{DEFAULT}
	set #!{NAME}(value: #!{TYPE}) {
		this._#!{NAME} = value
		this._isSaved = false
	}
`

export const FIELD_TEMPLATE_GETTER = `get #!{NAME}(): #!{TYPE}{
	return this._#!{NAME}
}`

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
get #!{NAME}(): _#!{TYPE} #!{NULLABLE_GETTER} {
	return this._#!{NAME}
}
set #!{NAME}(value: _#!{TYPE} #!{NULLABLE_GETTER}) {
	this._#!{NAME} = value
	if(value !== null)
		this._#!{FOREIGNKEY} = value.id
	this._isSaved = false
}
get #!{FOREIGNKEY}(): ForeignKey #!{NULLABLE_GETTER} {
	if(!this._#!{NAME}){
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
	this._isSaved = false
}
`