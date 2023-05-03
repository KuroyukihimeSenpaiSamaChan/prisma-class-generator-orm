export declare const LOAD_TEMPLATE = "\nasync load(depth: number = 0) {\n  if (depth < 0) return\n\n  if (this.id !== -1) {\n    const dbThis = await _#!{NAME}.prisma.findUnique({\n      where: {\n        id: this.id,\n      },\n      select: _#!{NAME}.getIncludes(depth),\n    })\n    if (dbThis !== null) {\n      this.init({ ...this.toJSON(), ...dbThis })\n    }\n  }\n}\n";
export declare const SAVE_TEMPLATE = "\nasync save(): Promise<boolean> {\n  try {\n    await this.prismaClient.$transaction(async (tx): Promise<number> => {\n      const saveYield = this.saveToTransaction(tx)\n      await saveYield.next()\n      return (await saveYield.next()).value\n    })\n  } catch (err) {\n    console.log(err)\n    return false\n  }\n  return true\n}\n\nprivate _saving: boolean = false\nget saving(): boolean {return this._saving}\nasync *saveToTransaction(\n  tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],\n) {\n  this._saving = true\n\n  this.checkRequiredFields()\n\n  const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []\n\n  // Relations toOne\n  #!{TO_ONE}\n\n  // Relations toMany\n  #!{TO_MANY}\n\n  yield new Promise<number>((resolve) => resolve(0))\n\n  for (const saveYield of saveYieldsArray) {\n    await saveYield.next()\n  }\n  \n  #!{CONNECT_GEN}\n\n  if(this._#!{ID} === -1){\n    this._#!{ID} = (await tx.#!{P_NAME}.create({\n      data: {\n        ...this.nonRelationsToJSON(),\n        #!{ID}: undefined,\n        #!{CONNECT_SAVE}\n      },\n      select: { #!{ID}: true }\n    })).#!{ID}\n  } else {\n    await tx.#!{P_NAME}.update({\n      where: { #!{ID}: this._#!{ID} },\n      data: {\n        ...this.nonRelationsToJSON(),\n        #!{CONNECT_UPDATE}\n      }\n    })\n  }\n\n  this._saving = false\n  return new Promise<number>((resolve) => resolve(this._#!{ID}))\n}\n\ncheckRequiredFields(){\n  #!{CHECK_FIELDS}\n\n  #!{CHECK_TO_ONE}\n\n  #!{CHECK_TO_MANY}\n}\n";
export declare const DELETE_TEMPLATE = "\nstatic async deleteAll(query: Parameters<typeof _#!{CLASS}.prisma.deleteMany>[0]): Promise<false | number> {\n  let count: number\n  try {\n    count = (await _#!{CLASS}.prisma.deleteMany(query)).count\n  } catch (e) {\n    console.log(e)\n    return false\n  }\n  return count\n}\n\nasync delete(): Promise<boolean> {\n  if(this.primaryKey === -1)\n    return false\n\n  try {\n    await this.prisma.delete({\n      where: { #!{ID}: this._#!{ID} }\n    })\n    this._#!{ID} = -1\n  } catch (e) {\n    console.log(e)\n    return false\n  }\n  return true\n}\n";
