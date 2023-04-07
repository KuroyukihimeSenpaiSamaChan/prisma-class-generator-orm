export const CLASS_TEMPLATE = `#!{IMPORTS}
import { Prisma } from "@prisma/client";
// import { PrismaDecorators } from './PrismaDecorators'

#!{FIELDS_TYPE}

#!{DECORATORS}
export class _#!{NAME} {
  static db: #!{PRISMAMODEL_TYPE}
#!{FIELDS}
#!{CONSTRUCTOR}
#!{MODEL_GETTER}

#!{ALL}

#!{FROMID}

#!{LOAD_ALL}
}
#!{EXTRA}
`
