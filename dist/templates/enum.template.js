"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENUM_TEMPLATE = void 0;
exports.ENUM_TEMPLATE = `
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
`;
//# sourceMappingURL=enum.template.js.map