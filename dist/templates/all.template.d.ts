export declare const ALL_TEMPLATE = "\n  static async all(query?: Prisma.#!{NAME}FindFirstArgsBase): Promise<_#!{NAME}[]> {\n    const models = await _#!{NAME}.prisma.findMany(query)\n    \n    return models.reduce((acc, m) => {\n      acc.push(new _#!{NAME}(m))\n      return acc;\n    }, [] as _#!{NAME}[])\n  }\n";
export declare const FROM_TEMPLATE = "\nstatic async from<F extends Prisma.#!{NAME}WhereUniqueInput>(\n  where: F,\n  opt?: Omit<Prisma.#!{NAME}FindUniqueArgsBase, \"where\">\n): Promise<_#!{NAME} | null> {\n  let prismaOptions = opt\n  if (prismaOptions === undefined) {\n    prismaOptions = {\n      include: _#!{NAME}.getIncludes()\n    }\n  } else if (\n    prismaOptions.include === undefined\n    && prismaOptions.select === undefined\n  ) {\n    prismaOptions.include = _#!{NAME}.getIncludes()\n  }\n\n  const dbQuery = await _#!{NAME}.prisma.findFirst({\n    where: where,\n    ...opt\n  })\n  \n  if(dbQuery === null) return null\n\n  return new _#!{NAME}(dbQuery)\n}\n";
