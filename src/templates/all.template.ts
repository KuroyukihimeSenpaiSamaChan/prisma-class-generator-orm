export const ALL_TEMPLATE = `
  async static all(where?: _#!{NAME}Fields): Promise<_#!{NAME}[]> {
    const models = await _#!{NAME}.db.findMany({where: where})
    return models.reduce((acc, m) => {
      acc.push(new _#!{NAME}(m))
      return acc;
    }, [] as _#!{NAME}[])
  }
`

export const FIELDS_TYPE_TEMPLATE = `
export type _#!{NAME}Fields = {
  #!{FIELDS}
}

export type _#!{NAME}UniqueFields = {
  #!{FIELDS_UNIQUE}
}
`