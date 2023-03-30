"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOAD_ALL = void 0;
exports.LOAD_ALL = `
async loadAll(depth: number = 1) {
  if(depth <= 0) return

  #!{FIELDS_LOADERS}
}
`;
//# sourceMappingURL=loadall.template.js.map