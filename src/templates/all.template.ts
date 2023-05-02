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
static async from(query?: Prisma.#!{NAME}FindFirstArgsBase): Promise<_#!{NAME} | null> {
  if (query === undefined) {
    query = {
      include: _#!{NAME}.getIncludes()
    }
  } else if (
    query.include === undefined
    && query.select === undefined
  ) {
    query.include = _#!{NAME}.getIncludes()
  }

  const dbQuery = await _#!{NAME}.prisma.findFirst({
    ...query
  })
  
  if(dbQuery === null) return null

  return new _#!{NAME}(dbQuery)
}
`