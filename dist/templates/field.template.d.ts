export declare const FIELD_TEMPLATE = "\t#!{DECORATORS}\n\tprivate _#!{NAME}: #!{TYPE} #!{DEFAULT}\n\tset #!{NAME}(value: #!{TYPE}) {\n\t\tthis._#!{NAME} = value\n\t\tthis._isSaved = false\n\t}\n";
export declare const FIELD_ID_TEMPLATE = " #!{DECORATORS}\n\tprivate _#!{NAME}: #!{TYPE} = -1\n\tget #!{NAME}(): #!{TYPE} {\n\t\treturn this._#!{NAME}\n\t}\n\tget primaryKey(): #!{TYPE} {\n\t\treturn this._#!{NAME}\n\t}\n";
export declare const FIELD_TO_ONE_TEMPLATE = "\nprivate _#!{NAME}: _#!{TYPE} #!{NULLABLE}\nget #!{NAME}(): _#!{TYPE} #!{NULLABLE} {\n\treturn this._#!{NAME}\n}\nset #!{NAME}(value: _#!{TYPE}) {\n\tthis._#!{NAME} = value\n\tthis._#!{FOREIGNKEY} = value.id\n\tthis._isSaved = false\n}\nget #!{FOREIGNKEY}(): ForeignKey {\n\tif(!this._#!{NAME}){\n\t\treturn this._#!{FOREIGNKEY}\n\t} else {\n\t\treturn this._#!{NAME}.primaryKey\n\t}\n}\n";
export declare const FIELD_TO_MANY_TEMPLATE = "\nprivate _#!{NAME}: RelationMany<_#!{TYPE}>\npublic get #!{NAME}(): RelationMany<_#!{TYPE}> {\n\treturn this._#!{NAME}\n}\nprivate set #!{NAME}(value: RelationMany<_#!{TYPE}>) {\n\tthis._#!{NAME} = value\n\tthis._isSaved = false\n}\n";
