export const ENUM_TEMPLATE = `
static async initList() {
  if(this.enumList === null) {
    return
  }
  
  this.enumList = await this.all()
}

private static enumList: _#!{NAME}[]
static get list(): _#!{NAME}[] {
  return this.enumList
}
`