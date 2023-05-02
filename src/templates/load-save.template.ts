export const LOAD_TEMPLATE = `
async load(depth: number = 0) {
  if (depth < 0) return

  if (this.id !== -1) {
    const dbThis = await _#!{NAME}.prisma.findUnique({
      where: {
        id: this.id,
      },
      select: _#!{NAME}.getIncludes(depth),
    })
    if (dbThis !== null) {
      this.init({ ...this.toJSON(), ...dbThis })
    }
  }
}
`

export const SAVE_TEMPLATE = `
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

async *saveToTransaction(
  tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],
) {
  this.checkRequiredFields()

  const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

  // Relations toOne
  #!{TO_ONE}

  // Relations toMany
  #!{TO_MANY}

  yield new Promise<number>((resolve) => resolve(0))

  for (const saveYield of saveYieldsArray) {
    await saveYield.next()
  }
  
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
      data: { ...this.nonRelationsToJSON()}
    })
  }

  return new Promise<number>((resolve) => resolve(this._#!{ID}))
}

checkRequiredFields(){
  #!{CHECK_FIELDS}

  #!{CHECK_TO_ONE}

  #!{CHECK_TO_MANY}
}
`

export const DELETE_TEMPLATE = `
static async deleteAll(query: Parameters<typeof _#!{CLASS}.prisma.deleteMany>[0]): Promise<boolean> {
  try {
    _#!{CLASS}.prisma.deleteMany(query)
  } catch (e) {
    console.log(e)
    return false
  }
  return true
}

async delete(): Promise<boolean> {
  if(this.primaryKey === -1)
    return false
    
  try {
    this.prisma.delete({
      where: { #!{ID}: this._#!{ID} }
    })
  } catch (e) {
    console.log(e)
    return false
  }
  return true
}
`