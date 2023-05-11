"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_INCLUDES_TEMPLATE = void 0;
exports.GET_INCLUDES_TEMPLATE = `
static getIncludes(
  param?: number | {
    #!{FILTER_TYPE}
  },
): Prisma.#!{NAME}Include {
  if(param === undefined){
    param = 0
  }

  if (typeof param === "number") {
    if (param <= 0) {
      return {
        #!{INCLUDE_FIELDS}
      }
    }
    return {
      #!{INCLUDE_DEEP}
    }
  } else {
    if (Object.keys(param).length === 0) {
      return {}
    }

    const query = {
      #!{INCLUDE_FILTER}
    }

    // @ts-ignore
    Object.keys(query).forEach(
      key => query[key as keyof typeof query] === undefined && delete query[key as keyof typeof query])

    return query
  }
}
`;
//# sourceMappingURL=includes.template.js.map