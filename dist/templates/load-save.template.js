"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_TEMPLATE = exports.SAVE_TEMPLATE = exports.LOAD_TEMPLATE = void 0;
exports.LOAD_TEMPLATE = `
async load(depth?: number): Promise<void>
async load(filter?: Exclude<Parameters<typeof _#!{NAME}.getIncludes>[0], number>): Promise<void>
async load(
  param?: number | Exclude<Parameters<typeof _#!{NAME}.getIncludes>[0], number>
): Promise<void> {
  if(param === undefined){
    param = 0
  }

  if ((
    typeof param === 'number' && param < 0
  ) || (
    typeof param === 'object' && Object.keys(param).length === 0
  )) {
    return
  }

  if (this.id !== -1) {
    const dbThis = await _#!{NAME}.prisma.findUnique({
      where: {
        id: this.id,
      },
      select: _#!{NAME}.getIncludes(param),
    })
    if (dbThis !== null) {
      this.init({ ...this.toJSON(), ...dbThis })
    }
  }
}
`;
exports.SAVE_TEMPLATE = `
async save(): Promise<boolean> {
  try {
    await this.prismaClient.$transaction(async (tx): Promise<number> => {
      const saveYield = this.saveToTransaction(tx)
      await saveYield.next()
      return (await saveYield.next()).value
    })
  } catch (err) {
    console.log(err)
    return false
  }
  return true
}

private _saving: boolean = false
get saving(): boolean {return this._saving}
async *saveToTransaction(
  tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],
) {
  this._saving = true

  this.checkRequiredFields()

  const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

  // Relations toOne
  #!{TO_ONE}

  // Relations toMany
  #!{TO_MANY}

  yield new Promise<number>((resolve) => resolve(0))

  console.log(\`#!{P_NAME} going deep\`)

  for (const saveYield of saveYieldsArray) {
    await saveYield.next()
  }

  console.log(\`#!{P_NAME} coming back\`)
  
  #!{CONNECT_GEN}

  if(this._#!{ID} === -1){
    this._#!{ID} = (await tx.#!{P_NAME}.create({
      data: {
        ...this.nonRelationsToJSON(),
        #!{ID}: undefined,
        #!{CONNECT_SAVE}
      },
      select: { #!{ID}: true }
    })).#!{ID}
  } else {
    await tx.#!{P_NAME}.update({
      where: { #!{ID}: this._#!{ID} },
      data: {
        ...this.nonRelationsToJSON(),
        #!{CONNECT_UPDATE}
      }
    })
  }

  this._saving = false
  return new Promise<number>((resolve) => resolve(this._#!{ID}))
}

checkRequiredFields(){
  #!{CHECK_FIELDS}

  #!{CHECK_TO_ONE}

  #!{CHECK_TO_MANY}
}
`;
exports.DELETE_TEMPLATE = `
static async deleteAll(query: Parameters<typeof _#!{CLASS}.prisma.deleteMany>[0]): Promise<false | number> {
  let count: number
  try {
    count = (await _#!{CLASS}.prisma.deleteMany(query)).count
  } catch (e) {
    console.log(e)
    return false
  }
  return count
}

async delete(): Promise<boolean> {
  if(this.primaryKey === -1)
    return false

  try {
    await this.prisma.delete({
      where: { #!{ID}: this._#!{ID} }
    })
    this._#!{ID} = -1
  } catch (e) {
    console.log(e)
    return false
  }
  return true
}
`;
//# sourceMappingURL=load-save.template.js.map