export declare const LOAD_ALL = "\nasync loadAll(depth: number = 1) {\n  if(depth <= 0) return\n\n  #!{FIELDS_LOADERS}\n}\n";
