"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_INCLUDES_TEMPLATE = void 0;
exports.GET_INCLUDES_TEMPLATE = `
static getIncludes(deep: number = 0): Prisma.#!{NAME}Include {
  if(deep <= 0){
    return {
      #!{INCLUDE_FIELDS}
    }
  }

  return {
    #!{INCLUDE_DEEP}
  }
}
`;
//# sourceMappingURL=includes.template.js.map