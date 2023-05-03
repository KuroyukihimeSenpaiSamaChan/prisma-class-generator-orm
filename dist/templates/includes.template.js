"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_INCLUDES_TEMPLATE = void 0;
exports.GET_INCLUDES_TEMPLATE = `
static getIncludes(
  depth: number = 0,
  filter?: {
    #!{FILTER_TYPE}
  }
): Prisma.#!{NAME}Include {

  if(filter === undefined){
    if(depth <= 0){
      return {
        #!{INCLUDE_FIELDS}
      }
    }
    return {
      #!{INCLUDE_DEEP}
    }
  }
  else {
    if(depth <= 0){
      return {
        #!{INCLUDE_FIELDS_FILTER}
      }
    }
    return {
      #!{INCLUDE_DEEP_FILTER}
    }
  }
}
`;
//# sourceMappingURL=includes.template.js.map