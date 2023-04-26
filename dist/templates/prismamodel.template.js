"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRISMAMODEL_TEMPLATE = void 0;
exports.PRISMAMODEL_TEMPLATE = `import { PrismaClient } from "@prisma/client";
!#{CLASSES_IMPORTS}

export abstract class PrismaModel {
  static prismaClient: PrismaClient
  
  static async init(){
    if(PrismaModel.prismaClient !== undefined) return
    // @ts-ignore
    BigInt.prototype.toJSON = ():string => {return this.toString()}

    PrismaModel.prismaClient = new PrismaClient();
    await PrismaModel.prismaClient.$connect();

    !#{CLASSES_INIT}
  }
}
`;
//# sourceMappingURL=prismamodel.template.js.map