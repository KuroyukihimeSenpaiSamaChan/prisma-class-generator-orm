export const FIELD_TEMPLATE = `	#!{DECORATORS}
	#!{NAME}: #!{TYPE} #!{DEFAULT}
`
export const FIELD_GETTER_ONE_TEMPLATE = `
	private _#!{NAME}: #!{TYPE} | null = null
	async #!{NAME}(reload: boolean = false): Promise<#!{TYPE} | null> {
		if((this._#!{NAME} === null || reload) && this.#!{RELATION_FROM} !== undefined){
			const dbModel = await #!{TYPE}.db.findUnique({
				where: {
					#!{RELATION_TO}: +this.#!{RELATION_FROM}
				}
			})
			if(dbModel !== null){
				this._#!{NAME} = new #!{TYPE}(dbModel)
			}
		}	
		return this._#!{NAME}
  }
`

export const FIELD_GETTER_MANY_TEMPLATE = `
  private _#!{NAME}: #!{TYPE} | null = null
  async #!{NAME}(reload: boolean = false): Promise<#!{TYPE} | null> {
    if((this._#!{NAME} === null || reload) && this.#!{RELATION_FROM}!== undefined){
      const dbModels = await #!{TYPE_BASE}.db.findMany({
				where: {
					#!{RELATION_TO}: +this.#!{RELATION_FROM}
				}
      })
			if(dbModels.length){
				this._#!{NAME} = []
				for(const dbModel of dbModels)
					this._#!{NAME}.push(new #!{TYPE_BASE}(dbModel))
			}
    }
		return this._#!{NAME}
  }
`

export const FIELD_DEPTH_LOAD_SINGLE = `
	await this.#!{NAME}()
	if(this._#!{NAME} !== null)
		this._#!{NAME}.loadAll(depth - 1)
`

export const FIELD_DEPTH_LOAD_ARRAY = `
	await this.#!{NAME}()
	if(this._#!{NAME} !== null){
		for (const role of this._#!{NAME}) {
			await role.loadAll(depth - 1)
		}
	}
`