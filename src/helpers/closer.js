const EXIT_COMMAND = ".exit";

export class Closer {
  constructor(rl) {
    this.rl = rl;
  }
  close = (input) => {
    if (input === EXIT_COMMAND) this.rl.close();
  };
}
