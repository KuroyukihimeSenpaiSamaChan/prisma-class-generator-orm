"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIELDS_TYPE_TEMPLATE = exports.ALL_TEMPLATE = void 0;
exports.ALL_TEMPLATE = `
  async static all(where?: _#!{NAME}Fields): Promise<_#!{NAME}[]> {
    const models = await _#!{NAME}.db.findMany({where: where})
    return models.reduce((acc, m) => {
      acc.push(new _#!{NAME}(m))
      return acc;
    }, [] as _#!{NAME}[])
  }
`;
exports.FIELDS_TYPE_TEMPLATE = `
export type _#!{NAME}Fields = {
  #!{FIELDS}
}

export type _#!{NAME}UniqueFields = {
  #!{FIELDS_UNIQUE}
}
`;
//# sourceMappingURL=all.template.js.map