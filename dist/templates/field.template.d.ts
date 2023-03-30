export declare const FIELD_TEMPLATE = "\t#!{DECORATORS}\n\t#!{NAME}: #!{TYPE} #!{DEFAULT}\n";
export declare const FIELD_GETTER_ONE_TEMPLATE = "\n  protected _#!{NAME}: #!{TYPE} | null = null\n\tasync #!{NAME}(): Promise<#!{TYPE} | null> {\n\t\tif(this._#!{NAME} === null){\n\t\t\tconst dbModel = await #!{TYPE}.model.findUnique({\n\t\t\t\twhere: {\n\t\t\t\t\t#!{RELATION_TO}: this.#!{RELATION_FROM}\n\t\t\t\t}\n\t\t\t})\n\t\t\tif(dbModel !== null){\n\t\t\t\tthis._#!{NAME} = new #!{TYPE}(dbModel)\n\t\t\t}\n\t\t}\t\n\t\treturn this._#!{NAME}\n  }\n";
export declare const FIELD_GETTER_MANY_TEMPLATE = "\n  protected _#!{NAME}: #!{TYPE} | null = null\n  async #!{NAME}(): Promise<#!{TYPE} | null> {\n    if(this._#!{NAME} === null){\n      const dbModels = await #!{TYPE_BASE}.model.findMany({\n\t\t\t\twhere: {\n\t\t\t\t\t#!{RELATION_TO}: this.#!{RELATION_FROM}\n\t\t\t\t}\n      })\n\t\t\tif(dbModels.length){\n\t\t\t\tthis._#!{NAME} = []\n\t\t\t\tfor(const dbModel of dbModels)\n\t\t\t\t\tthis._#!{NAME}.push(new #!{TYPE_BASE}(dbModel))\n\t\t\t}\n    }\n\t\treturn this._#!{NAME}\n  }\n";
export declare const FIELD_DEPTH_LOAD_SINGLE = "\n\tawait this.#!{NAME}()\n\tif(this._#!{NAME} !== null)\n\t\tthis._#!{NAME}.loadAll(depth - 1)\n";
export declare const FIELD_DEPTH_LOAD_ARRAY = "\n\tawait this.#!{NAME}()\n\tfor (const role of this._#!{NAME}) {\n\t\tawait role.loadAll(depth - 1)\n\t}\n";
