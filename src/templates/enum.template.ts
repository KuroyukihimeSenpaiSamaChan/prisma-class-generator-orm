export const ENUM_TEMPLATE = `
static async initList() {
  if(this.enumList === null) {
    return
  }
  
  const models = await this.prisma.findMany()
  this.enumList = []
  for (const model of models) {
    this.enumList.push(new _#!{NAME}(model))
  }
}

private static enumList: _#!{NAME}[]
static get list(): _#!{NAME}[] {
  return this.enumList
}
`