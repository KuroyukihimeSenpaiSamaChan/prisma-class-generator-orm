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

    const query = {
      #!{INCLUDE_FILTER}
    }

    // @ts-ignore
    Object.keys(query).forEach(
      key => query[key as keyof typeof query] === undefined && delete query[key as keyof typeof query])

    return query
  }
}
`