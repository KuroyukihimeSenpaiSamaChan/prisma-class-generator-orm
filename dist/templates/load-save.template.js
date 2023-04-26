"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAVE_TEMPLATE = exports.LOAD_TEMPLATE = void 0;
exports.LOAD_TEMPLATE = `
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
`;
exports.SAVE_TEMPLATE = `
async save(): Promise<boolean> {
  try {
    await this.prismaClient.$transaction(async (tx): Promise<number> => {
      const saveYield = this.saveToTransaction(tx)
      console.log("First YIELD")
      await saveYield.next()
      console.log("Second YIELD")
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
  //#!{REQUIREDS}

  const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

  // toOne
  // if (this.media !== null && typeof this.media !== 'number') {
  //   const mediaYield = this.media.saveToTransaction(tx)
  //   await mediaYield.next()
  //   saveYieldsArray.push(mediaYield)
  // }
  #!{TO_ONE}

  // toMany
  // const galleryYield = this.gallery.saveToTransaction(tx)
  // galleryYield.next()
  // saveYieldsArray.push(galleryYield)
  #!{TO_MANY}

  yield new Promise<number>((resolve) => resolve(0))

  for (const saveYield of saveYieldsArray) {
    saveYield.next()
  }


  return new Promise<number>((resolve) => resolve(1))
}
`;
//# sourceMappingURL=load-save.template.js.map