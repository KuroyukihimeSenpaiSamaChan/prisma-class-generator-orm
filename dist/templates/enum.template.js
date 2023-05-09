"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENUM_TEMPLATE = void 0;
exports.ENUM_TEMPLATE = `
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
`;
//# sourceMappingURL=enum.template.js.map