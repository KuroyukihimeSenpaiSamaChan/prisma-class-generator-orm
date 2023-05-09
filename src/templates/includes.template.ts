export const GET_INCLUDES_TEMPLATE = `
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

    return {
      #!{INCLUDE_FILTER}
    }
  }
}
`