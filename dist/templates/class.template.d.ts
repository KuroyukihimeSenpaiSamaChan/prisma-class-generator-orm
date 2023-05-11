export declare const CLASS_TEMPLATE = "#!{IMPORTS}\nimport { Prisma #!{IMPORTS_PRISMA} } from \"@prisma/client\";\nimport { RelationMany } from '../prisma-relation';\nimport { PrismaClass, ForeignKey } from '../prisma-class';\nimport { PrismaModel } from '../prisma-model';\n\n#!{CONSTRUCTOR_TYPE}\n\nexport class _#!{NAME} implements PrismaClass{\n  static prisma: Prisma.#!{NAME}Delegate<undefined>\n  get prisma(): Prisma.#!{NAME}Delegate<undefined> {\n    return _#!{NAME}.prisma\n  }\n  get prismaClient() { return PrismaModel.prismaClient }\n  \n  private _isSaved = false\n  get isSaved(): boolean {\n    return this._isSaved\n  }\n\n#!{ENUM_LIST}\n\n#!{GET_INCLUDES}\n\n#!{FIELDS}\n\n#!{CONSTRUCTOR}\n\n#!{ALL}\n\n#!{FROM}\n\n#!{LOAD}\n\n#!{SAVE}\n\n#!{DELETE}\n\n}\n#!{EXTRA}\n";
