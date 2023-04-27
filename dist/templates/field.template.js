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