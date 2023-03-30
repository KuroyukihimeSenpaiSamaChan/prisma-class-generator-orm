export const LOAD_ALL = `
async loadAll(depth: number = 1) {
  if(depth <= 0) return

  #!{FIELDS_LOADERS}
}
`