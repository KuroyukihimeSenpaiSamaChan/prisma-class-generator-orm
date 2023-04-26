export const GET_INCLUDES_TEMPLATE = `
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
`