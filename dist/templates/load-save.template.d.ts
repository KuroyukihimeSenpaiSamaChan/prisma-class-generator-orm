export declare const LOAD_TEMPLATE = "\nasync load(depth: number = 0) {\n  if (depth < 0) return\n\n  if (this.id !== -1) {\n    const dbThis = await _#!{NAME}.prisma.findUnique({\n      where: {\n        id: this.id,\n      },\n      select: _#!{NAME}.getIncludes(depth),\n    })\n    if (dbThis !== null) {\n      this.init({ ...this.toJSON(), ...dbThis })\n    }\n  }\n}\n";
export declare const SAVE_TEMPLATE = "\nasync save(): Promise<boolean> {\n  try {\n    await this.prismaClient.$transaction(async (tx): Promise<number> => {\n      const saveYield = this.saveToTransaction(tx)\n      console.log(\"First YIELD\")\n      await saveYield.next()\n      console.log(\"Second YIELD\")\n      return (await saveYield.next()).value\n    })\n  } catch (err) {\n    console.log(err)\n    return false\n  }\n  return true\n}\n\nasync *saveToTransaction(\n  tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],\n) {\n  this.checkRequiredFields()\n\n  const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []\n\n  // Relations toOne\n  #!{TO_ONE}\n\n  // Relations toMany\n  #!{TO_MANY}\n\n  yield new Promise<number>((resolve) => resolve(0))\n\n  for (const saveYield of saveYieldsArray) {\n    saveYield.next()\n  }\n  \n  this._#!{ID} = (await this.prisma.upsert({\n    where: { #!{ID}: this._#!{ID} },\n    create: { ...this.nonRelationsToJSON(), #!{ID}: undefined },\n    update: { ...this.nonRelationsToJSON()},\n    select: { #!{ID}: true }\n  })).#!{ID}\n\n  return new Promise<number>((resolve) => resolve(this._#!{ID}))\n}\n\ncheckRequiredFields(){\n  #!{CHECK_FIELDS}\n\n  #!{CHECK_TO_ONE}\n\n  #!{CHECK_TO_MANY}\n}\n";
