"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDMODEL_TEMPLATE = void 0;
exports.IDMODEL_TEMPLATE = `static async fromId(id: number): Promise<_#!{NAME} | null> {
  const dbModel = await _#!{NAME}.db.findUnique({
    where:{
      #!{FIELD_NAME}: +id
    }
  });
  if(dbModel === null) return null
  return new _#!{NAME}(dbModel);
}

async save(withId: boolean = false): Promise<{
  status: true,
  type: "updated" | "created"
  id: number
} | {
  status: false,
  err: any
}> {
  if(this.#!{FIELD_NAME} < 0 || withId){
    #!{CHECK_REQUIRED}
    
    const data = {
      #!{REQUIRED_FIELDS_CREATE}
    }

    try {
      const dbModel = await this.db.create({
        data: data
      })
      this.#!{FIELD_NAME} = dbModel.#!{FIELD_NAME}
      return {status: true, id: dbModel.#!{FIELD_NAME}, type: "created"}
    } catch (err) {
      return {status: false, err: err}
    }
  }

  try{
    const data = {
      #!{REQUIRED_FIELDS_UPDATE}
    }

    const dbModel = await this.db.update({
      where:{
        #!{FIELD_NAME}: +this.#!{FIELD_NAME}
      },
      data: data
    })

    return {status: true, id: dbModel.#!{FIELD_NAME}, type: "updated"}
  } catch (err){
    return {status: false, err: err}
  }


}
`;
//# sourceMappingURL=idmodel.template.js.map