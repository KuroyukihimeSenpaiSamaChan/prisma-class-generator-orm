export const ALL_TEMPLATE = `
  static async all(query?: Prisma.#!{NAME}FindFirstArgsBase): Promise<_#!{NAME}[]> {
    const models = await _#!{NAME}.prisma.findMany(query)
    
    return models.reduce((acc, m) => {
      acc.push(new _#!{NAME}(m))
      return acc;
    }, [] as _#!{NAME}[])
  }
`

export const FROM_TEMPLATE = `
static async from<F extends Prisma.#!{NAME}WhereUniqueInput>(
  where: F,
  opt?: Omit<Prisma.#!{NAME}FindUniqueArgsBase, "where">
): Promise<_#!{NAME} | null> {
  let prismaOptions = opt
  if (prismaOptions === undefined) {
    prismaOptions = {
      include: _#!{NAME}.getIncludes()
    }
  } else if (
    prismaOptions.include === undefined
    && prismaOptions.select === undefined
  ) {
    prismaOptions.include = _#!{NAME}.getIncludes()
  }

  const dbQuery = await _#!{NAME}.prisma.findFirst({
    where: where,
    ...opt
  })
  
  if(dbQuery === null) return null

  return new _#!{NAME}(dbQuery)
}
`