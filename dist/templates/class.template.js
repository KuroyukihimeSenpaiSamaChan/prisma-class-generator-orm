"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLASS_TEMPLATE = void 0;
exports.CLASS_TEMPLATE = `#!{IMPORTS}
import { Prisma #!{IMPORTS_PRISMA} } from "@prisma/client";
import { RelationMany } from '../prisma-relation';
import { PrismaClass, ForeignKey } from '../prisma-class';
import { PrismaModel } from '../prisma-model';

export class _#!{NAME} implements PrismaClass{
  static prisma: Prisma.#!{NAME}Delegate<undefined>
  get prisma(): Prisma.#!{NAME}Delegate<undefined> {
    return _#!{NAME}.prisma
  }
  get prismaClient() { return PrismaModel.prismaClient }

#!{ENUM_LIST}

#!{GET_INCLUDES}

#!{FIELDS}

#!{CONSTRUCTOR}

#!{ALL}

#!{FROM}

#!{LOAD}

#!{SAVE}

#!{DELETE}

}
#!{EXTRA}
`;
//# sourceMappingURL=class.template.js.map