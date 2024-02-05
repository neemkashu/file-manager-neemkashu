export const parseArgs = (line) => {
  line = line.trim();
  const tokens = String(line).split(/\s+/);

  if (tokens[0] === "") return [];

  const SEPARATOR = '"';

  const argsLine = line;

  let isTokenOpen = false;
  let token = [];
  const tokensQuoteMarked = [];

  for (let i = 0; i < argsLine.length; i++) {
    const char = argsLine[i];
    if (char === SEPARATOR && !isTokenOpen) {
      isTokenOpen = true;
      if (token.length > 0) {
        tokensQuoteMarked.push({
          token: token.join(""),
          isQuoted: false,
        });
      }
      token = [];
      continue;
    }
    if (char === SEPARATOR && isTokenOpen) {
      const tokenMarked = { token: token.join(""), isQuoted: true };
      tokensQuoteMarked.push(tokenMarked);
      token = [];
      isTokenOpen = false;
      continue;
    }
    token.push(char);
  }

  if (token.length > 0)
    tokensQuoteMarked.push({
      token: token.join(""),
      isQuoted: false,
    });

  if (isTokenOpen) throw new Error("Invalid args");

  const args = tokensQuoteMarked
    .map(({ token, isQuoted }) => {
      if (isQuoted) return token;
      const tokensNoSpaces = token.trim().split(/\s+/);
      if (tokensNoSpaces[0] === "") return [];
      return tokensNoSpaces;
    })
    .flat();

  return args.slice(1);
};

const tests = [
  {
    input: "mv   1.txt 2.txt",
    output: ["1.txt", "2.txt"],
  },
  {
    input: 'mv "1.txt"   2.txt',
    output: ["1.txt", "2.txt"],
  },
  {
    input: 'mv  "1.txt"   "2.txt"',
    output: ["1.txt", "2.txt"],
  },
  {
    input: 'mv "1 1.txt" "2.txt"',
    output: ["1 1.txt", "2.txt"],
  },
  {
    input: 'mv   "1 1.txt" 2.txt',
    output: ["1 1.txt", "2.txt"],
  },
  {
    input: 'mv "1 2 3.txt"  ',
    output: ["1 2 3.txt"],
  },
];

const runTests = () => {
  tests.forEach(({ input, output }) => {
    const result = parseArgs(input);
    console.log("input", input);
    console.log("output", output);
    console.log("result", result);
    console.log(result.join(" ") === output.join(" "));
  });
};
