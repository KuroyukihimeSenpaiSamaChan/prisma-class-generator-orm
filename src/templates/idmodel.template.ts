export const IDMODEL_TEMPLATE = `static async fromId<T extends _#!{NAME}>(id: number): Promise<T | null> {
  const dbModel = await _#!{NAME}.model.findUnique({
    where:{
      #!{FIELD_NAME}: id
    }
  });
  if(dbModel === null) return null
  return <T>(new _#!{NAME}(dbModel));
}

async save(): Promise<{
  status: true,
  type: "updated" | "created"
  id: number
} | {
  status: false
}> {
  if(this.#!{FIELD_NAME} < 0){
    #!{CHECK_REQUIRED}
    
    const data = {
      #!{REQUIRED_FIELDS_CREATE}
    }

    try {
      const user = await this.model.create({
        data: data
      })
      this.#!{FIELD_NAME} = user.#!{FIELD_NAME}
      return {status: true, id: user.#!{FIELD_NAME}, type: "created"}
    } catch (_) {
      return {status: false}
    }
  }

  try{
    const data = {
      #!{REQUIRED_FIELDS_UPDATE}
    }

    const user = await this.model.update({
      where:{
        #!{FIELD_NAME}: this.#!{FIELD_NAME}
      },
      data: data
    })

    return {status: true, id: user.#!{FIELD_NAME}, type: "updated"}
  } catch (_){
    return {status: false}
  }


}
`
