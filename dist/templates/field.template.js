"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIELD_TO_MANY_TEMPLATE = exports.FIELD_TO_ONE_TEMPLATE = exports.FIELD_ID_TEMPLATE = exports.FIELD_TEMPLATE = void 0;
exports.FIELD_TEMPLATE = `	#!{DECORATORS}
	#!{NAME}: #!{TYPE} #!{DEFAULT}
`;
exports.FIELD_ID_TEMPLATE = ` #!{DECORATORS}
	private _#!{NAME}: #!{TYPE} = -1
	get #!{NAME}(): #!{TYPE} {
		return this._#!{NAME}
	}
	get primaryKey(): #!{TYPE} {
		return this._#!{NAME}
	}
`;
exports.FIELD_TO_ONE_TEMPLATE = `
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
`;
exports.FIELD_TO_MANY_TEMPLATE = `
private _#!{NAME}: RelationMany<_#!{TYPE}>
public get #!{NAME}(): RelationMany<_#!{TYPE}> {
	return this._#!{NAME}
}
private set #!{NAME}(value: RelationMany<_#!{TYPE}>) {
	this._#!{NAME} = value
}
`;
//# sourceMappingURL=field.template.js.map