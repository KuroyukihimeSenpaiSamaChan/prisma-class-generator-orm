export declare const ENUM_TEMPLATE = "\nstatic async initList() {\n  if(this.enumList === null) {\n    return\n  }\n  \n  const models = await this.prisma.findMany()\n  this.enumList = []\n  for (const model of models) {\n    this.enumList.push(new _#!{NAME}(model))\n  }\n}\n\nprivate static enumList: _#!{NAME}[]\nstatic get list(): _#!{NAME}[] {\n  return this.enumList\n}\n";