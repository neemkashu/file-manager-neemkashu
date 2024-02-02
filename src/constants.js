export const VALID_COMMANDS = {
  up: {
    argsAmount: 0,
  },
  cd: {
    argsAmount: 1,
  },
  ls: {
    argsAmount: 0,
  },
  cat: {
    argsAmount: 1,
  },
  add: {
    argsAmount: 1,
  },
  rn: {
    argsAmount: 2,
  },
  cp: {
    argsAmount: 2,
  },
  mv: {
    argsAmount: 2,
  },
  rm: {
    argsAmount: 1,
  },
  os: {
    argsAmount: 1,
  },
  hash: {
    argsAmount: 1,
  },
  compress: {
    argsAmount: 2,
  },
  decompress: {
    argsAmount: 2,
  },
  ".exit": {
    argsAmount: 0,
  },
};

export const NON_MANAGER_COMMANDS = [".exit"];
