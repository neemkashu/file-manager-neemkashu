export class InputError extends Error {
  constructor(text) {
    super();
    this.message = "unknown argument";
  }
}
